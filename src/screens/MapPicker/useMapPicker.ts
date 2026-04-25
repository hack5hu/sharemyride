import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';
import { Location, useLocationStore } from '@/store/useLocationStore';
import { locationService, OlaPrediction } from '@/serviceManager/locationService';
import debounce from 'lodash/debounce';

const DEFAULT_REGION = {
  latitude: 12.9716, // Bengaluru
  longitude: 77.5946,
};

type MapPickerRouteProp = RouteProp<RootStackParamList, 'MapPicker'>;

const EMPTY_HISTORY: Location[] = [];

export const useMapPicker = () => {
  const navigation = useNavigation();
  const route = useRoute<MapPickerRouteProp>();
  
  const pickerType = route.params?.type || 'start';
  const returnTo = route.params?.returnTo || 'LocationSelection';
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
  const zoomRef = useRef(14);

  // Scoped history derived from the current context
  const addSearchHistory = useLocationStore((state) => state.addSearchHistory);
  const history = useLocationStore((state) => state.history[contextKey] || EMPTY_HISTORY);

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

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleBackPress = useCallback(() => {
    if (isMapVisible) {
      setIsMapVisible(false);
      setSelectedLocation(null);
    } else {
      navigation.goBack();
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

  const handleRegionChangeComplete = useCallback(async (event: any) => {
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
      id: `picked-${Date.now()}`,
      name: locationData.name || 'Selected Location',
      address: locationData.address || 'Custom coordinates',
      latitude: latitude,
      longitude: longitude,
    });
    
    setIsReverseGeocoding(false);
  }, [isMapVisible]);

  const handleConfirmLocation = useCallback(() => {
    if (selectedLocation) {
      addSearchHistory(selectedLocation, contextKey);
      (navigation.navigate as any)({
        name: returnTo,
        params: {
          updatedLocation: selectedLocation,
          type: pickerType,
        },
        merge: true,
      });
    } else {
      navigation.goBack();
    }
  }, [navigation, selectedLocation, pickerType, returnTo, addSearchHistory, contextKey]);

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
  };
};
