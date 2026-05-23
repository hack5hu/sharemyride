import { useState, useCallback, useRef, useEffect } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';
import { Location, useLocationStore } from '@/store/useLocationStore';
import { locationService, OlaPrediction } from '@/serviceManager/locationService';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { useBookRideStore } from '@/store/useBookRideStore';
import debounce from 'lodash/debounce';

import { requestLocationPermission } from '@/utils/permissionUtils';

const DEFAULT_REGION = {
  latitude: 12.9716, // Bengaluru
  longitude: 77.5946,
};

type MapPickerRouteProp = RouteProp<RootStackParamList, 'MapPicker'>;

const EMPTY_HISTORY: Location[] = [];

export const useMapPicker = () => {
  const navigation = useAppNavigation();
  const route = useRoute<MapPickerRouteProp>();
  
  const pickerType = route.params?.type || 'start';
  const module = (route.params as any)?.module || 'publish';
  const contextKey = `${module}_${pickerType}`;

  const mapRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);
  const [isInitiallyCentered, setIsInitiallyCentered] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [userHeading, setUserHeading] = useState<number>(0);
  const [isMoving, setIsMoving] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const zoomRef = useRef(14);

  // Request location permission on mount
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const granted = await requestLocationPermission();
        setHasPermission(granted);
      } catch (error) {
        console.warn('Permission request error:', error);
      }
    };
    
    // Small delay to ensure Activity is attached on Android
    const timer = setTimeout(requestPermission, 500);
    return () => clearTimeout(timer);
  }, []);

  // Scoped history derived from the current context
  const addSearchHistory = useLocationStore((state) => state.addSearchHistory);
  const history = useLocationStore((state) => state.history[contextKey] || EMPTY_HISTORY);

  const handleUserLocationUpdate = useCallback((location: any) => {
    if (location?.coords) {
      setUserLocation([location.coords.longitude, location.coords.latitude]);
      if (location.coords.heading !== undefined) {
        setUserHeading(location.coords.heading);
      }
    }
  }, []);

  const handleLocateMe = useCallback(() => {
    if (userLocation) {
      cameraRef.current?.setStop({
        center: userLocation,
        zoom: 17,
        duration: 1000,
      });
    }
  }, [userLocation]);

  const handleZoom = useCallback((increment: number) => {
    const newZoom = Math.min(Math.max(zoomRef.current + increment, 3), 20);
    zoomRef.current = newZoom;
    
    cameraRef.current?.setStop({
      zoom: newZoom,
      duration: 300,
    });
  }, []);

  const handleZoomIn = useCallback(() => handleZoom(1), [handleZoom]);
  const handleZoomOut = useCallback(() => handleZoom(-1), [handleZoom]);

  // Debounced search logic
  const debouncedSearch = useRef(
    debounce(async (query: string) => {
      if (query.trim().length > 2) {
        const predictions = await locationService.autocomplete(query);
        const mappedResults: Location[] = predictions.map((p: OlaPrediction) => ({
          id: p.place_id,
          name: p.structured_formatting.main_text,
          address: p.description,
          latitude: p.geometry.location.lat,
          longitude: p.geometry.location.lng,
        }));
        setSearchResults(mappedResults);
      } else {
        setSearchResults([]);
      }
    }, 500)
  ).current;

  const [isMapMounted, setIsMapMounted] = useState(true);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleBackPress = useCallback(() => {
    if (isMapVisible) {
      setIsMapVisible(false);
      setSelectedLocation(null);
    } else {
      setIsMapMounted(false);
      setTimeout(() => {
        navigation.pop();
      }, 150);
    }
  }, [navigation, isMapVisible]);

  const handleSearchSelect = useCallback((location: Location) => {
    setSelectedLocation(location);
    setSearchQuery('');
    setSearchResults([]);
    setIsMapVisible(true);
    
    setRegion({
      latitude: location.latitude,
      longitude: location.longitude,
    });

    // v11: Use 'setStop' instead of 'setCamera'
    // center/zoom structure matches v11 CameraStop interface
    setTimeout(() => {
      const controller = cameraRef.current || mapRef.current;
      controller?.setStop({
        center: [location.longitude, location.latitude],
        zoom: 17, 
        duration: 1000,
      });
    }, 100);
  }, []);

  const handleRegionWillChange = useCallback(() => {
    setIsMoving(true);
  }, []);

  const handleRegionChangeComplete = useCallback(async (event: any) => {
    setIsMoving(false);
    // 1. Guard: Only geocode if map is visible to user
    if (!isMapVisible) return;

    const viewState = event?.nativeEvent || event;
    if (!viewState?.center) return;

    const [longitude, latitude] = viewState.center;
    const currentZoom = viewState.zoom;
    
    if (currentZoom !== undefined) {
      zoomRef.current = currentZoom;
    }
    
    setRegion({ latitude, longitude });
    setIsReverseGeocoding(true);

    const locationData = await locationService.reverseGeocode(latitude, longitude);
    
    setSelectedLocation({
      id: `picked-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      name: locationData.name || 'Selected Location',
      address: locationData.address || 'Custom coordinates',
      latitude: latitude,
      longitude: longitude,
    });
    
    setIsReverseGeocoding(false);
  }, [isMapVisible]);

  const handleConfirmLocation = useCallback(() => {
    if (!selectedLocation) {
      setIsMapMounted(false);
      setTimeout(() => navigation.pop(), 150);
      return;
    }

    addSearchHistory(selectedLocation, contextKey);

    // Write directly to the correct store — no navigation params needed.
    // The parent screen already reads from this store reactively.
    if (module === 'publish') {
      const store = useRidePublishStore.getState();
      if (pickerType === 'start') {
        store.setStartLocation(selectedLocation);
      } else {
        store.setDestinationLocation(selectedLocation);
      }
    } else if (module === 'book' || module === 'search') {
      const store = useBookRideStore.getState();
      if (pickerType === 'start') {
        store.setStartLocation(selectedLocation);
      } else {
        store.setDestinationLocation(selectedLocation);
      }
    }

    setIsMapMounted(false);
    setTimeout(() => navigation.pop(), 150);
  }, [navigation, selectedLocation, pickerType, module, addSearchHistory, contextKey]);

  return {
    pickerType,
    region,
    searchQuery,
    setSearchQuery,
    searchResults,
    history,
    selectedLocation,
    handleBackPress,
    handleSearchSelect,
    handleRegionChangeComplete,
    handleConfirmLocation,
    handleZoomIn,
    handleZoomOut,
    mapRef,
    cameraRef,
    isReverseGeocoding,
    isInitiallyCentered,
    setIsInitiallyCentered,
    isMapVisible,
    setIsMapVisible,
    currentZoom: zoomRef.current,
    handleLocateMe,
    handleUserLocationUpdate,
    userHeading,
    isMoving,
    handleRegionWillChange,
    hasPermission,
    isMapMounted,
  };
};
