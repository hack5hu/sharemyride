import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { useLocationStore, Location } from '@/store/useLocationStore';
import {
  locationService,
  OlaPrediction,
} from '@/serviceManager/locationService';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import Toast from 'react-native-toast-message';
import { NotificationType } from '@/constants/enums';
import { useLocale } from '@/constants/localization';
import {
  snapToRoute,
  buildRouteLineGeoJSON,
  buildConnectorLine,
  SnapResult,
} from '@/utils/routeSnap';
import { getBoundingBox } from '@/utils/polyline';
import { LocationOption } from '@/components/organisms/MiddleStopSearchOverlay';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import { Logger } from '@/utils/logger';

const EMPTY_HISTORY: Location[] = [];

export interface MiddleStopMapLocation {
  id: string;
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
  distanceFromRoute?: number;
}

export const useMiddleStopMap = () => {
  const navigation = useAppNavigation();
  const { middleStopMap: t, middleStops: tStops } = useLocale();

  // Store data
  const { selectedRoute, startLocation, destinationLocation, middleStops } =
    useRidePublishStore();

  const contextKey = 'publish_middleStop';
  const addSearchHistory = useLocationStore(s => s.addSearchHistory);
  const history = useLocationStore(s => s.history[contextKey] || EMPTY_HISTORY);

  // UI state
  const [isSearching, setIsSearching] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MiddleStopMapLocation[]>(
    [],
  );
  const [selectedLocation, setSelectedLocation] =
    useState<MiddleStopMapLocation | null>(null);
  const [snapResult, setSnapResult] = useState<SnapResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mapRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const zoomRef = useRef(14);
  const [isMoving, setIsMoving] = useState(false);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);

  // Route coordinates from the selected route in the store
  const routeCoordinates = useMemo<[number, number][]>(
    () => selectedRoute?.coordinates ?? [],
    [selectedRoute],
  );

  // Map bounds to fit the route
  const routeBounds = useMemo(
    () => getBoundingBox(routeCoordinates),
    [routeCoordinates],
  );

  // Initial camera center from route bounds
  const initialCenter = useMemo<[number, number]>(() => {
    if (routeBounds[0] === 0 && routeBounds[2] === 0) {
      return [77.5946, 12.9716]; // Fallback: Bengaluru
    }
    return [
      (routeBounds[0] + routeBounds[2]) / 2,
      (routeBounds[1] + routeBounds[3]) / 2,
    ];
  }, [routeBounds]);

  // Route title string
  const routeTitle = useMemo(() => {
    const startName = startLocation?.name || startLocation?.address || '';
    const destName =
      destinationLocation?.name || destinationLocation?.address || '';
    return `${startName} → ${destName}`;
  }, [startLocation, destinationLocation]);

  // GeoJSON for the main route polyline
  const routeGeoJSON = useMemo(
    () =>
      routeCoordinates.length >= 2
        ? buildRouteLineGeoJSON(routeCoordinates)
        : null,
    [routeCoordinates],
  );

  // GeoJSON for the dashed connector line (selected → snapped)
  const connectorGeoJSON = useMemo(() => {
    if (!selectedLocation || !snapResult) return null;
    const from: [number, number] = [
      selectedLocation.longitude,
      selectedLocation.latitude,
    ];
    return buildConnectorLine(from, snapResult.snappedPoint);
  }, [selectedLocation, snapResult]);

  // Debounced search using OLA Autocomplete
  const debouncedSearch = useRef(
    debounce(async (query: string) => {
      if (query.trim().length <= 2) {
        setSearchResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const predictions = await locationService.autocomplete(query);
        const mapped: MiddleStopMapLocation[] = predictions.map(
          (p: OlaPrediction) => {
            const loc: MiddleStopMapLocation = {
              id: p.place_id,
              name: p.structured_formatting.main_text,
              address: p.description,
              latitude: p.geometry.location.lat,
              longitude: p.geometry.location.lng,
            };
            // Pre-compute distance from route for each result
            if (routeCoordinates.length >= 2) {
              const snap = snapToRoute(
                [loc.longitude, loc.latitude],
                routeCoordinates,
              );
              loc.distanceFromRoute = snap.distanceKm;
            }
            return loc;
          },
        );
        // Sort results: closest to route first
        mapped.sort(
          (a, b) => (a.distanceFromRoute ?? 99) - (b.distanceFromRoute ?? 99),
        );
        setSearchResults(mapped);
      } catch (error) {
        Logger.error('[MiddleStopMap] debouncedSearch error:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 500),
  ).current;

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  // Reverse geocode initial center when search overlay is closed and no location is selected yet
  useEffect(() => {
    if (!isSearching && !selectedLocation && initialCenter) {
      const initGeocode = async () => {
        const [longitude, latitude] = initialCenter;
        setIsReverseGeocoding(true);
        try {
          const locationData = await locationService.reverseGeocode(
            latitude,
            longitude,
          );
          const mapped: MiddleStopMapLocation = {
            id: `picked-${Date.now()}-${Math.random()
              .toString(36)
              .substr(2, 5)}`,
            name: locationData.name || 'Selected Location',
            address: locationData.address || 'Custom coordinates',
            latitude,
            longitude,
          };
          setSelectedLocation(mapped);

          if (routeCoordinates.length >= 2) {
            const result = snapToRoute([longitude, latitude], routeCoordinates);
            setSnapResult(result);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setIsReverseGeocoding(false);
        }
      };
      initGeocode();
    }
  }, [isSearching, selectedLocation, initialCenter, routeCoordinates]);

  const [isMapMounted, setIsMapMounted] = useState(true);

  const handleBackPress = useCallback(() => {
    if (isSearching && selectedLocation) {
      setIsSearching(false);
    } else {
      navigation.pop();
    }
  }, [isSearching, selectedLocation, navigation]);

  // Handle search input change
  const handleChangeSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Handle search press (show search overlay)
  const handleSearchPress = useCallback(() => {
    setIsSearching(true);
  }, []);

  // Handle location selection from search results
  const handleSelectLocation = useCallback(
    (loc: LocationOption) => {
      if (loc.latitude === undefined || loc.longitude === undefined) return;

      const mapped: MiddleStopMapLocation = {
        id: loc.id,
        name: loc.name,
        address: loc.address,
        latitude: loc.latitude,
        longitude: loc.longitude,
        distanceFromRoute: loc.distanceFromRoute,
      };

      setSelectedLocation(mapped);
      setIsSearching(false);
      setSearchQuery('');
      setSearchResults([]);

      // Compute snap
      if (routeCoordinates.length >= 2) {
        const result = snapToRoute(
          [loc.longitude, loc.latitude],
          routeCoordinates,
        );
        setSnapResult(result);

        if (!result.isWithinThreshold) {
          showNotification(
            NotificationType.WARNING,
            t.tooFarFromRoute,
            t.tooFarFromRouteMsg,
          );
        }
      }

      // Move camera to the selected location
      setTimeout(() => {
        cameraRef.current?.setStop({
          center: [loc.longitude, loc.latitude],
          zoom: 14,
          duration: 1000,
        });
      }, 100);
    },
    [routeCoordinates, t],
  );

  // Handle selecting from history
  const handleSelectHistory = useCallback(
    (loc: Location) => {
      const mapped: LocationOption = {
        id: loc.id,
        name: loc.name || '',
        address: loc.address,
        latitude: loc.latitude,
        longitude: loc.longitude,
      };
      handleSelectLocation(mapped);
    },
    [handleSelectLocation],
  );

  // Distance text for display
  const distanceText = useMemo(() => {
    if (!snapResult) return '';
    return t.distanceFromRoute.replace(
      '{{distance}}',
      String(snapResult.distanceKm),
    );
  }, [snapResult, t]);

  // Whether the confirm button is enabled
  const canConfirm = useMemo(
    () => !!selectedLocation && (snapResult?.isWithinThreshold ?? false),
    [selectedLocation, snapResult],
  );

  // Handle confirm — write directly to store and pop back to MiddleStops.
  // Running duplicate-check + distance-sort here so we never need to pass params.
  const handleConfirm = useCallback(async () => {
    if (!selectedLocation || !canConfirm || !startLocation) return;

    const locationForStore: Location = {
      id: selectedLocation.id,
      name: selectedLocation.name,
      address: selectedLocation.address || '',
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    };

    addSearchHistory(locationForStore, contextKey);

    // Duplicate check
    const currentStops = useRidePublishStore.getState().middleStops;
    const isStartDuplicate =
      startLocation.latitude === locationForStore.latitude &&
      startLocation.longitude === locationForStore.longitude;
    const isDestDuplicate =
      destinationLocation != null &&
      destinationLocation.latitude === locationForStore.latitude &&
      destinationLocation.longitude === locationForStore.longitude;
    const isAlreadyStop = currentStops.some(
      s =>
        s.id === locationForStore.id ||
        (s.latitude === locationForStore.latitude &&
          s.longitude === locationForStore.longitude) ||
        (s.name && s.name === locationForStore.name),
    );

    if (isStartDuplicate || isDestDuplicate || isAlreadyStop) {
      showNotification(
        NotificationType.WARNING,
        tStops.duplicateStopTitle,
        tStops.duplicateStopMsg,
      );
      return;
    }

    // Distance-sort: calculate distance from start then insert sorted
    let stopWithDistance: Location & { distanceFromStart?: number } =
      locationForStore;
    try {
      const results = await locationService.getDirections(
        startLocation.latitude,
        startLocation.longitude,
        locationForStore.latitude,
        locationForStore.longitude,
      );
      if (results && results.length > 0) {
        const mainRoute = results[0];
        const distanceMeters: number =
          mainRoute.distance ??
          (mainRoute.legs?.reduce(
            (acc: number, leg: any) => acc + (leg.distance || 0),
            0,
          ) ||
            0);
        stopWithDistance = {
          ...locationForStore,
          distanceFromStart: distanceMeters,
        };
      }
    } catch {
      // Fall back to unsorted insertion if distance lookup fails
    }

    const latest = useRidePublishStore.getState().middleStops;
    if (!latest.some(s => s.id === locationForStore.id)) {
      const sorted = [...latest, stopWithDistance].sort(
        (a, b) =>
          ((a as any).distanceFromStart ?? 0) -
          ((b as any).distanceFromStart ?? 0),
      );
      useRidePublishStore.getState().setMiddleStops(sorted);
    }

    navigation.pop();
  }, [
    selectedLocation,
    canConfirm,
    startLocation,
    destinationLocation,
    navigation,
    addSearchHistory,
    contextKey,
    t,
  ]);

  const handleZoom = useCallback((increment: number) => {
    const newZoom = Math.min(Math.max(zoomRef.current + increment, 4), 20);
    zoomRef.current = newZoom;
    cameraRef.current?.setStop({
      zoom: newZoom,
      duration: 300,
    });
  }, []);

  const handleZoomIn = useCallback(() => handleZoom(1), [handleZoom]);
  const handleZoomOut = useCallback(() => handleZoom(-1), [handleZoom]);

  const handleRegionWillChange = useCallback(() => {
    setIsMoving(true);
    Toast.hide();
  }, []);

  // Throttled snap & selectedLocation coordinate update during dragging to ensure 60fps UI performance
  const throttledRegionIsChanging = useRef(
    throttle(
      (longitude: number, latitude: number, coords: [number, number][]) => {
        if (coords.length >= 2) {
          const result = snapToRoute([longitude, latitude], coords);
          setSnapResult(result);
        }

        setSelectedLocation(prev => {
          if (!prev) return null;
          if (prev.latitude === latitude && prev.longitude === longitude)
            return prev;
          return {
            ...prev,
            latitude,
            longitude,
          };
        });
      },
      120,
    ),
  ).current;

  useEffect(() => {
    return () => {
      throttledRegionIsChanging.cancel?.();
    };
  }, [throttledRegionIsChanging]);

  const handleRegionIsChanging = useCallback(
    (event: any) => {
      if (isSearching) return;

      const viewState = event?.nativeEvent || event;
      if (!viewState?.center) return;

      const [longitude, latitude] = viewState.center;
      throttledRegionIsChanging(longitude, latitude, routeCoordinates);
    },
    [isSearching, routeCoordinates, throttledRegionIsChanging],
  );

  const handleRegionChangeComplete = useCallback(
    async (event: any) => {
      setIsMoving(false);
      throttledRegionIsChanging.cancel?.();

      const viewState = event?.nativeEvent || event;
      if (!viewState?.center) return;

      const [longitude, latitude] = viewState.center;
      const currentZoom = viewState.zoom;

      if (currentZoom !== undefined) {
        zoomRef.current = currentZoom;
      }

      if (isSearching) return;

      // 1. UPDATE SNAP RESULT IMMEDIATELY (Instant feedback!)
      if (routeCoordinates.length >= 2) {
        const result = snapToRoute([longitude, latitude], routeCoordinates);
        setSnapResult(result);
      }

      setIsReverseGeocoding(true);
      try {
        const locationData = await locationService.reverseGeocode(
          latitude,
          longitude,
        );

        const mapped: MiddleStopMapLocation = {
          id:
            selectedLocation?.id && selectedLocation.id.startsWith('picked-')
              ? selectedLocation.id
              : `picked-${Date.now()}-${Math.random()
                  .toString(36)
                  .substr(2, 5)}`,
          name: locationData.name || 'Selected Location',
          address: locationData.address || 'Custom coordinates',
          latitude,
          longitude,
        };

        setSelectedLocation(mapped);

        if (routeCoordinates.length >= 2) {
          const result = snapToRoute([longitude, latitude], routeCoordinates);
          setSnapResult(result);

          if (!result.isWithinThreshold) {
            showNotification(
              NotificationType.WARNING,
              t.tooFarFromRoute,
              t.tooFarFromRouteMsg,
            );
          } else {
            Toast.hide();
          }
        }
      } catch (error) {
        console.error('Failed to reverse geocode center:', error);
      } finally {
        setIsReverseGeocoding(false);
      }
    },
    [
      isSearching,
      routeCoordinates,
      t,
      selectedLocation,
      throttledRegionIsChanging,
    ],
  );

  // Handle map press to select coordinates directly (places / moves the marker)
  const handleMapPress = useCallback(
    async (feature: any) => {
      if (!feature || !feature.geometry || !feature.geometry.coordinates)
        return;
      const [longitude, latitude] = feature.geometry.coordinates;

      Toast.hide();

      // 1. UPDATE SNAP RESULT IMMEDIATELY (Instant feedback!)
      if (routeCoordinates.length >= 2) {
        const result = snapToRoute([longitude, latitude], routeCoordinates);
        setSnapResult(result);
      }

      setIsReverseGeocoding(true);
      try {
        const locationData = await locationService.reverseGeocode(
          latitude,
          longitude,
        );

        const mapped: MiddleStopMapLocation = {
          id: `picked-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
          name: locationData.name || 'Selected Location',
          address: locationData.address || 'Custom coordinates',
          latitude,
          longitude,
        };

        setSelectedLocation(mapped);
        setIsSearching(false);

        if (routeCoordinates.length >= 2) {
          const result = snapToRoute([longitude, latitude], routeCoordinates);
          setSnapResult(result);

          if (!result.isWithinThreshold) {
            showNotification(
              NotificationType.WARNING,
              t.tooFarFromRoute,
              t.tooFarFromRouteMsg,
            );
          } else {
            Toast.hide();
          }
        }

        // Smoothly pan camera to selected location
        cameraRef.current?.setStop({
          center: [longitude, latitude],
          duration: 500,
        });
      } catch (error) {
        console.error('Failed to reverse geocode coordinate:', error);
      } finally {
        setIsReverseGeocoding(false);
      }
    },
    [routeCoordinates, t],
  );

  // Middle stops count for the footer badge
  const stopsCount = middleStops.length;

  return {
    // State
    isSearching,
    isLoading,
    isReverseGeocoding,
    isMoving,
    searchQuery,
    searchResults,
    selectedLocation,
    snapResult,
    canConfirm,

    // Display data
    routeTitle,
    distanceText,
    stopsCount,
    history,
    initialCenter,

    // GeoJSON data for the map
    routeGeoJSON,
    connectorGeoJSON,
    routeBounds,
    routeCoordinates,

    // Refs
    mapRef,
    cameraRef,

    // Start / Destination for markers
    startLocation,
    destinationLocation,

    // Handlers
    handleBackPress,
    handleSearchPress,
    handleChangeSearch,
    handleSelectLocation,
    handleSelectHistory,
    handleConfirm,
    handleZoomIn,
    handleZoomOut,
    handleRegionWillChange,
    handleRegionIsChanging,
    handleRegionChangeComplete,
    handleMapPress,
    isMapMounted,
  };
};
