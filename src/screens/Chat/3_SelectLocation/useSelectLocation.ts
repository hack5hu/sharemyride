import Geolocation from '@react-native-community/geolocation';
import { StackNavigationProp } from '@react-navigation/stack';
import debounce from 'lodash/debounce';
import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { AppState, type AppStateStatus, Platform, PermissionsAndroid } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { RootStackParamList } from '@/navigation/types.d';
import { AnalyticsService, AnalyticsEvent } from '@/serviceManager/AnalyticsService';
import { ChatService } from '@/serviceManager/ChatService';
import {
  LocationService,
  OlaPrediction,
} from '@/serviceManager/LocationService';
import { useAuthStore } from '@/store/useAuthStore';
import { type Location } from '@/store/useLocationStore';
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
  const zoomRef = useRef(15);
  const [isGpsModalVisible, setIsGpsModalVisible] = useState(false);
  const [isGpsBannerVisible, setIsGpsBannerVisible] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [currentUserLocation, setCurrentUserLocation] =
    useState<Location | null>(null);
  const [isDisclosureVisible, setIsDisclosureVisible] = useState(false);

  const mapRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const lastCenterRef = useRef<[number, number] | null>(null);

  // Debounced reverse geocoding to prevent excessive API calls while panning
  const debouncedReverseGeocode = useRef(
    debounce(async (latitude: number, longitude: number) => {
      try {
        const locationData = await LocationService.reverseGeocode(
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
      } catch (error) {
        console.warn('Reverse geocode error:', error);
      } finally {
        setIsReverseGeocoding(false);
      }
    }, 800),
  ).current;

  useEffect(() => {
    return () => {
      debouncedReverseGeocode.cancel?.();
    };
  }, [debouncedReverseGeocode]);

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
          LocationService
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
          if (error.code === 2) {
            if (showModalOnError) {
              setIsGpsModalVisible(true);
            } else {
              setIsGpsBannerVisible(true);
            }
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
      if (Platform.OS === 'android') {
        const hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (hasPermission) {
          checkGpsAndGetLocation(true);
        } else {
          setIsDisclosureVisible(true);
        }
      } else {
        checkGpsAndGetLocation(true);
      }
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
        LocationService
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
  }, [currentUserLocation, checkGpsAndGetLocation]);

  const handleZoom = useCallback(
    (increment: number) => {
      const newZoom = Math.min(Math.max(zoomRef.current + increment, 3), 20);
      zoomRef.current = newZoom;
      setZoom(newZoom);

      cameraRef.current?.setStop({
        zoom: newZoom,
        duration: 300,
      });
    },
    [],
  );

  const handleZoomIn = useCallback(() => handleZoom(1), [handleZoom]);
  const handleZoomOut = useCallback(() => handleZoom(-1), [handleZoom]);

  const handleRegionChangeComplete = useCallback(
    (event: any) => {
      const viewState = event?.nativeEvent || event;
      if (!viewState?.center) return;

      const [longitude, latitude] = viewState.center;
      if (
        longitude == null ||
        latitude == null ||
        isNaN(longitude) ||
        isNaN(latitude)
      )
        {return;}

      // Ignore exact 0,0 map initialization coordinates
      if (longitude === 0 && latitude === 0) return;

      const currentZoom = viewState.zoom;

      if (currentZoom !== undefined) {
        zoomRef.current = currentZoom;
        setZoom(currentZoom);
      }

      // Guard: Prevent redundant reverse geocode if center hasn't changed
      const lastCenter = lastCenterRef.current;
      if (
        lastCenter &&
        Math.abs(lastCenter[0] - longitude) < 0.0001 &&
        Math.abs(lastCenter[1] - latitude) < 0.0001
      ) {
        return;
      }
      lastCenterRef.current = [longitude, latitude];

      setRegion({ latitude, longitude });
      setIsReverseGeocoding(true);
      debouncedReverseGeocode(latitude, longitude);
    },
    [debouncedReverseGeocode],
  );

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
        const myUserId = useAuthStore.getState().user?.userId || useAuthStore.getState().user?.id;
        const receiverId = params?.userId;

        if (myUserId && receiverId && receiverId !== 'Unknown') {
          const loc = locationToConfirm;
          const locationString = `[LOCATION_DATA]:${loc.latitude},${loc.longitude}|${loc.name}|${loc.address || ''}`;

          ChatService.sendMessage({
            senderId: myUserId,
            receiverId,
            content: locationString,
            type: 'location',
            metadata: {
              userName: params?.name,
              userAvatar: params?.avatarUri,
              userRating: params?.rating,
              rideId: params?.rideId,
              rideInfo: params?.rideInfo,
              location: {
                latitude: loc.latitude,
                longitude: loc.longitude,
                locationName: loc.name,
                address: loc.address,
              },
            },
          });

          AnalyticsService.logEvent(AnalyticsEvent.CHAT_MESSAGE_SENT, {
            type: 'location',
            receiver_id: receiverId,
          });
        }

        navigation.goBack();
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

  const handleConfirmDisclosure = useCallback(async () => {
    setIsDisclosureVisible(false);
    await checkGpsAndGetLocation(true);
  }, [checkGpsAndGetLocation]);

  const handleCloseDisclosure = useCallback(() => {
    setIsDisclosureVisible(false);
    navigation.goBack();
  }, [navigation]);

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
    isDisclosureVisible,
    handleConfirmDisclosure,
    handleCloseDisclosure,
  };
};
