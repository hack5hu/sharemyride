import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types.d';
import {
  locationService,
  OlaPrediction,
} from '@/serviceManager/locationService';
import { Location } from '@/store/useLocationStore';
import debounce from 'lodash/debounce';
import { AppState, AppStateStatus } from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import {
  requestLocationPermission,
  checkLocationServices,
} from '@/utils/permissionUtils';

const DEFAULT_REGION = {
  latitude: 12.9716, // Bengaluru
  longitude: 77.5946,
};

export const useSelectLocation = () => {
  const navigation = useAppNavigation();
  const [region, setRegion] = useState(DEFAULT_REGION);

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);
  const [isInitiallyCentered, setIsInitiallyCentered] = useState(false);
  const [zoom, setZoom] = useState(15);
  const [isGpsModalVisible, setIsGpsModalVisible] = useState(false);
  const [isGpsBannerVisible, setIsGpsBannerVisible] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [currentUserLocation, setCurrentUserLocation] =
    useState<Location | null>(null);

  const mapRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);

  const checkGpsAndGetLocation = useCallback(
    async (showModalOnError = true) => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) return;

      setIsLocating(true);

      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          if (latitude == null || longitude == null) return;
          setIsGpsBannerVisible(false);
          setIsLocating(false);

          // 1. Center map immediately
          setRegion({ latitude, longitude });
          if (cameraRef.current) {
            setIsInitiallyCentered(true);
            cameraRef.current.setStop({
              center: [longitude, latitude],
              zoom: 15,
              duration: 1000,
            });
          }

          // 2. Set temporary user location immediately
          setCurrentUserLocation({
            id: 'current-gps',
            name: 'Current Location',
            address: 'Locating...',
            latitude,
            longitude,
          });

          // 3. Reverse geocode in the background
          locationService
            .reverseGeocode(latitude, longitude)
            .then(locData => {
              setCurrentUserLocation({
                id: 'current-gps',
                name: locData.name || 'Current Location',
                address: locData.address || 'Your current GPS position',
                latitude,
                longitude,
              });
            })
            .catch(err => {
              console.warn('Background checkGps reverseGeocode error:', err);
            });
        },
        error => {
          setIsLocating(false);
          console.warn('[useSelectLocation] Geolocation error:', error);
          if (error.code === 2 && showModalOnError) {
            setIsGpsModalVisible(true);
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 10000,
        },
      );
    },
    [],
  );

  const handleOpenGpsSettings = useCallback(async () => {
    setIsGpsModalVisible(false);
    setIsGpsBannerVisible(false);
    await checkLocationServices();
  }, []);

  const handleCloseGpsModal = useCallback(() => {
    setIsGpsModalVisible(false);
    setIsGpsBannerVisible(true);
  }, []);

  const handleCloseGpsBanner = useCallback(() => {
    setIsGpsBannerVisible(false);
  }, []);

  const getFastCachedLocation = useCallback(async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    return new Promise<void>(resolve => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          if (latitude != null && longitude != null) {
            setRegion({ latitude, longitude });
            if (cameraRef.current) {
              cameraRef.current.setStop({
                center: [longitude, latitude],
                zoom: 15,
                duration: 0,
              });
            }
          }
          resolve();
        },
        error => {
          console.log('[useSelectLocation] Fast cache check error:', error);
          resolve();
        },
        {
          enableHighAccuracy: false,
          timeout: 800,
          maximumAge: 5 * 60 * 1000, // 5 minutes cache
        },
      );
    });
  }, []);

  useEffect(() => {
    const initLocation = async () => {
      await getFastCachedLocation();
      checkGpsAndGetLocation(true);
    };
    initLocation();
  }, [getFastCachedLocation, checkGpsAndGetLocation]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        checkGpsAndGetLocation(false);
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }, [checkGpsAndGetLocation]);

  useEffect(() => {
    if (cameraRef.current && region && !isInitiallyCentered) {
      setIsInitiallyCentered(true);
      cameraRef.current.setStop({
        center: [region.longitude, region.latitude],
        zoom: 15,
        duration: 1000,
      });
    }
  }, [region, isInitiallyCentered]);

  const handleUserLocationUpdate = useCallback(
    (location: any) => {
      if (location?.coords) {
        const { latitude, longitude } = location.coords;
        if (latitude == null || longitude == null) return;

        // 1. Center map immediately if not centered
        if (!isInitiallyCentered && cameraRef.current) {
          setIsInitiallyCentered(true);
          setRegion({ latitude, longitude });

          cameraRef.current.setStop({
            center: [longitude, latitude],
            zoom: 15,
            duration: 1000,
          });
        }

        // 2. Set temporary user location immediately
        setCurrentUserLocation({
          id: 'current-gps',
          name: 'Current Location',
          address: 'Locating...',
          latitude,
          longitude,
        });

        // 3. Reverse geocode in the background
        locationService
          .reverseGeocode(latitude, longitude)
          .then(locData => {
            setCurrentUserLocation({
              id: 'current-gps',
              name: locData.name || 'Current Location',
              address: locData.address || 'Your current GPS position',
              latitude,
              longitude,
            });
          })
          .catch(err => {
            console.warn(
              'Background handleUserLocationUpdate reverseGeocode error:',
              err,
            );
          });
      }
    },
    [isInitiallyCentered],
  );

  const handleMyLocationPress = useCallback(async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    if (currentUserLocation && cameraRef.current) {
      cameraRef.current.setStop({
        center: [currentUserLocation.longitude, currentUserLocation.latitude],
        zoom: 15,
        duration: 1000,
      });
    } else {
      await checkGpsAndGetLocation(true);
    }
  }, [requestLocationPermission, currentUserLocation, checkGpsAndGetLocation]);

  const handleZoom = useCallback(
    (increment: number) => {
      const newZoom = Math.min(Math.max(zoom + increment, 3), 20);
      setZoom(newZoom);
      if (region.latitude == null || region.longitude == null) return;

      cameraRef.current?.setStop({
        center: [region.longitude, region.latitude],
        zoom: newZoom,
        duration: 300,
      });
    },
    [region, zoom],
  );

  const handleZoomIn = useCallback(() => handleZoom(1), [handleZoom]);
  const handleZoomOut = useCallback(() => handleZoom(-1), [handleZoom]);

  const handleRegionChangeComplete = useCallback(async (event: any) => {
    const viewState = event?.nativeEvent || event;
    if (!viewState?.center) return;

    const [longitude, latitude] = viewState.center;
    if (
      longitude == null ||
      latitude == null ||
      isNaN(longitude) ||
      isNaN(latitude)
    )
      return;

    // Ignore exact 0,0 map initialization coordinates
    if (longitude === 0 && latitude === 0) return;

    const currentZoom = viewState.zoom;

    if (currentZoom !== undefined) {
      setZoom(currentZoom);
    }

    setRegion({ latitude, longitude });
    setIsReverseGeocoding(true);

    const locationData = await locationService.reverseGeocode(
      latitude,
      longitude,
    );

    setSelectedLocation({
      id: `picked-${Date.now()}`,
      name: locationData.name || 'Selected Location',
      address: locationData.address || 'Custom coordinates',
      latitude: latitude,
      longitude: longitude,
    });

    setIsReverseGeocoding(false);
  }, []);

  const handleConfirmLocation = useCallback(
    (overrideLocation?: any) => {
      // If overrideLocation is passed (e.g. from 'Send Current Location' button)
      // we use the actual GPS location if available, otherwise the map center.
      const locationToConfirm = overrideLocation
        ? currentUserLocation || {
            latitude: selectedLocation?.latitude ?? region.latitude,
            longitude: selectedLocation?.longitude ?? region.longitude,
            name:
              overrideLocation.title ||
              selectedLocation?.name ||
              'Current Location',
            address: selectedLocation?.address || '',
            id: 'current-loc',
          }
        : selectedLocation;

      const route = navigation
        .getState()
        .routes.find(r => r.name === 'SelectLocation');
      const params = route?.params as any;

      if (
        locationToConfirm &&
        locationToConfirm.latitude != null &&
        locationToConfirm.longitude != null
      ) {
        navigation.navigate('ChatDetails', {
          ...params,
          selectedLocation: locationToConfirm,
          timestamp: Date.now(),
        });
      }
    },
    [
      navigation,
      selectedLocation,
      currentUserLocation,
      region.latitude,
      region.longitude,
    ],
  );

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
    isGpsModalVisible,
    setIsGpsModalVisible,
    handleOpenGpsSettings,
    isGpsBannerVisible,
    setIsGpsBannerVisible,
    handleCloseGpsModal,
    handleCloseGpsBanner,
    isLocating,
  };
};
