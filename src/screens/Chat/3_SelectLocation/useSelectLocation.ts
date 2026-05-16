import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types.d';
import { locationService, OlaPrediction } from '@/serviceManager/locationService';
import { Location } from '@/store/useLocationStore';
import debounce from 'lodash/debounce';

import { requestLocationPermission, checkLocationServices } from '@/utils/permissionUtils';

const DEFAULT_REGION = {
  latitude: 12.9716, // Bengaluru
  longitude: 77.5946,
};

export const useSelectLocation = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [region, setRegion] = useState(DEFAULT_REGION);


  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);
  const [isInitiallyCentered, setIsInitiallyCentered] = useState(false);
  const [zoom, setZoom] = useState(15);
  const [currentUserLocation, setCurrentUserLocation] = useState<Location | null>(null);
  
  const mapRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const handleUserLocationUpdate = useCallback(async (location: any) => {
    if (location?.coords) {
      const { latitude, longitude } = location.coords;
      if (latitude == null || longitude == null) return;

      // Keep track of the actual current GPS position
      const locData = await locationService.reverseGeocode(latitude, longitude);
      setCurrentUserLocation({
        id: 'current-gps',
        name: locData.name || 'Current Location',
        address: locData.address || 'Your current GPS position',
        latitude,
        longitude,
      });

      if (!isInitiallyCentered) {
        setIsInitiallyCentered(true);
        setRegion({ latitude, longitude });
        
        cameraRef.current?.setStop({
          center: [longitude, latitude],
          zoom: 15,
          duration: 1000,
        });
      }
    }
  }, [isInitiallyCentered]);

  const handleMyLocationPress = useCallback(async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    // Check GPS status / prompt user
    await checkLocationServices();
    
    // The MapLibre UserLocation component will update automatically, 
    // but we can force a centering if we have a known location.
    setIsInitiallyCentered(false); // Reset to allow auto-centering on next update
  }, [requestLocationPermission]);

  const handleZoom = useCallback((increment: number) => {
    const newZoom = Math.min(Math.max(zoom + increment, 3), 20);
    setZoom(newZoom);
    if (region.latitude == null || region.longitude == null) return;

    cameraRef.current?.setStop({
      center: [region.longitude, region.latitude],
      zoom: newZoom,
      duration: 300,
    });
  }, [region, zoom]);

  const handleZoomIn = useCallback(() => handleZoom(1), [handleZoom]);
  const handleZoomOut = useCallback(() => handleZoom(-1), [handleZoom]);

  const handleRegionChangeComplete = useCallback(async (event: any) => {
    const viewState = event?.nativeEvent || event;
    if (!viewState?.center) return;

    const [longitude, latitude] = viewState.center;
    if (longitude == null || latitude == null || isNaN(longitude) || isNaN(latitude)) return;

    const currentZoom = viewState.zoom;
    
    if (currentZoom !== undefined) {
      setZoom(currentZoom);
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
  }, []);

  const handleConfirmLocation = useCallback((overrideLocation?: any) => {
    // If overrideLocation is passed (e.g. from 'Send Current Location' button)
    // we use the actual GPS location if available, otherwise the map center.
    const locationToConfirm = overrideLocation ? (currentUserLocation || {
      latitude: selectedLocation?.latitude ?? region.latitude,
      longitude: selectedLocation?.longitude ?? region.longitude,
      name: overrideLocation.title || selectedLocation?.name || 'Current Location',
      address: selectedLocation?.address || '',
      id: 'current-loc'
    }) : selectedLocation;

    if (locationToConfirm && locationToConfirm.latitude != null && locationToConfirm.longitude != null) {
      console.log('Sending location message:', {
        location: locationToConfirm,
      });
      navigation.navigate('ChatDetails', { 
        selectedLocation: locationToConfirm,
        timestamp: Date.now(),
        chatId: '', 
        name: '' 
      });
    }
  }, [navigation, selectedLocation, currentUserLocation, region.latitude, region.longitude]);

  return {
    region,
    selectedLocation,
    isReverseGeocoding,
    handleRegionChangeComplete,
    handleConfirmLocation,
    handleZoomIn,
    handleZoomOut,
    handleUserLocationUpdate,
    handleMyLocationPress,
    zoom,
    mapRef,
    cameraRef,
  };
};
