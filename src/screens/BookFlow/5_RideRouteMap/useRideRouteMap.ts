import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { Linking } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { CameraRef } from '@maplibre/maplibre-react-native';
import { decodePolyline, getBoundingBox } from '@/utils/polyline';
import { locationService } from '@/serviceManager/locationService';

const findClosestCoordinateIndex = (
  pt: [number, number],
  coords: [number, number][],
) => {
  let closestIndex = 0;
  let minDistance = Infinity;
  for (let i = 0; i < coords.length; i++) {
    const dx = coords[i][0] - pt[0];
    const dy = coords[i][1] - pt[1];
    const distance = dx * dx + dy * dy;
    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = i;
    }
  }
  return closestIndex;
};

export const useRideRouteMap = (
  routePath?: string,
  stops?: any[],
  destination?: any,
  initialStopIndex?: number,
  sourceStopId?: number | string,
  destinationStopId?: number | string,
  userSearchedPickup?: { latitude: number; longitude: number; name: string },
  userSearchedDropoff?: { latitude: number; longitude: number; name: string },
) => {
  const { pop } = useAppNavigation();
  const cameraRef = useRef<CameraRef>(null);
  const mapRef = useRef<any>(null);
  const zoomRef = useRef(14);

  const [currentUserLocation, setCurrentUserLocation] = useState<
    [number, number] | null
  >(null);
  const [pickupRouteCoords, setPickupRouteCoords] = useState<
    [number, number][]
  >([]);
  const [dropoffRouteCoords, setDropoffRouteCoords] = useState<
    [number, number][]
  >([]);

  const ridePickup = useMemo(() => {
    return (stops || []).find(s => String(s.id) === String(sourceStopId));
  }, [stops, sourceStopId]);

  const rideDropoff = useMemo(() => {
    return (stops || []).find(s => String(s.id) === String(destinationStopId));
  }, [stops, destinationStopId]);

  // Fetch connection routes
  useEffect(() => {
    let active = true;
    const fetchDirections = async () => {
      // 1. Fetch Pickup Connection Route (Searched Pickup -> Ride Pickup)
      if (userSearchedPickup && ridePickup) {
        try {
          const routes = await locationService.getDirections(
            userSearchedPickup.latitude,
            userSearchedPickup.longitude,
            ridePickup.lat,
            ridePickup.lon,
          );
          if (active && routes && routes.length > 0) {
            const polyline =
              routes[0].overview_polyline || routes[0].geometry || '';
            const coords = decodePolyline(polyline, 1e5);
            if (coords && coords.length > 0) {
              setPickupRouteCoords(coords);
            } else {
              setPickupRouteCoords([
                [userSearchedPickup.longitude, userSearchedPickup.latitude],
                [ridePickup.lon, ridePickup.lat],
              ]);
            }
          } else if (active) {
            setPickupRouteCoords([
              [userSearchedPickup.longitude, userSearchedPickup.latitude],
              [ridePickup.lon, ridePickup.lat],
            ]);
          }
        } catch (err) {
          console.error('Failed to fetch pickup connection directions:', err);
          if (active) {
            setPickupRouteCoords([
              [userSearchedPickup.longitude, userSearchedPickup.latitude],
              [ridePickup.lon, ridePickup.lat],
            ]);
          }
        }
      }

      // 2. Fetch Dropoff Connection Route (Ride Dropoff -> Searched Dropoff)
      if (userSearchedDropoff && rideDropoff) {
        try {
          const routes = await locationService.getDirections(
            rideDropoff.lat,
            rideDropoff.lon,
            userSearchedDropoff.latitude,
            userSearchedDropoff.longitude,
          );
          if (active && routes && routes.length > 0) {
            const polyline =
              routes[0].overview_polyline || routes[0].geometry || '';
            const coords = decodePolyline(polyline, 1e5);
            if (coords && coords.length > 0) {
              setDropoffRouteCoords(coords);
            } else {
              setDropoffRouteCoords([
                [rideDropoff.lon, rideDropoff.lat],
                [userSearchedDropoff.longitude, userSearchedDropoff.latitude],
              ]);
            }
          } else if (active) {
            setDropoffRouteCoords([
              [rideDropoff.lon, rideDropoff.lat],
              [userSearchedDropoff.longitude, userSearchedDropoff.latitude],
            ]);
          }
        } catch (err) {
          console.error('Failed to fetch dropoff connection directions:', err);
          if (active) {
            setDropoffRouteCoords([
              [rideDropoff.lon, rideDropoff.lat],
              [userSearchedDropoff.longitude, userSearchedDropoff.latitude],
            ]);
          }
        }
      }
    };

    fetchDirections();
    return () => {
      active = false;
    };
  }, [userSearchedPickup, userSearchedDropoff, ridePickup, rideDropoff]);

  const initialPoint = useMemo(() => {
    if (destination)
      return { lat: destination.latitude, lon: destination.longitude };
    if (initialStopIndex !== undefined && stops && stops[initialStopIndex])
      return stops[initialStopIndex];
    return stops && stops.length > 0
      ? stops[0]
      : { lat: 12.9716, lon: 77.5946 };
  }, [destination, initialStopIndex, stops]);

  const [zoom, setZoom] = useState(
    initialStopIndex !== undefined || destination ? 15 : 12,
  );
  const [region, setRegion] = useState({
    latitude: initialPoint?.lat || 12.9716,
    longitude: initialPoint?.lon || 77.5946,
  });

  const [isMapMounted, setIsMapMounted] = useState(true);

  const handleBack = useCallback(() => {
    pop();
  }, [pop]);

  const handleUserLocationUpdate = useCallback((location: any) => {
    if (location?.coords) {
      setCurrentUserLocation([
        location.coords.longitude,
        location.coords.latitude,
      ]);
    }
  }, []);

  const handleRegionDidChange = useCallback((event: any) => {
    const viewState = event?.nativeEvent || event;
    if (!viewState?.center) return;
    const [longitude, latitude] = viewState.center;
    const currentZoom = viewState.zoom;

    if (currentZoom !== undefined) {
      setZoom(currentZoom);
      zoomRef.current = currentZoom;
    }
    setRegion({ latitude, longitude });
  }, []);

  const handleZoom = useCallback((increment: number) => {
    const newZoom = Math.min(Math.max(zoomRef.current + increment, 3), 20);
    zoomRef.current = newZoom;
    cameraRef.current?.setStop({ zoom: newZoom, duration: 300 });
  }, []);

  const handleZoomIn = useCallback(() => handleZoom(1), [handleZoom]);
  const handleZoomOut = useCallback(() => handleZoom(-1), [handleZoom]);

  const handleOpenExternalMap = useCallback(
    (type: 'google' | 'apple') => {
      let originLat: number | undefined;
      let originLon: number | undefined;
      let destLat: number | undefined;
      let destLon: number | undefined;

      const clickedStop =
        initialStopIndex !== undefined && stops && stops[initialStopIndex]
          ? stops[initialStopIndex]
          : null;
      const isPickup =
        clickedStop && String(clickedStop.id) === String(sourceStopId);
      const isDropoff =
        clickedStop && String(clickedStop.id) === String(destinationStopId);

      if (isPickup && userSearchedPickup && ridePickup) {
        originLat = userSearchedPickup.latitude;
        originLon = userSearchedPickup.longitude;
        destLat = ridePickup.lat;
        destLon = ridePickup.lon;
      } else if (isDropoff && userSearchedDropoff && rideDropoff) {
        originLat = rideDropoff.lat;
        originLon = rideDropoff.lon;
        destLat = userSearchedDropoff.latitude;
        destLon = userSearchedDropoff.longitude;
      } else {
        destLat = initialPoint?.lat;
        destLon = initialPoint?.lon;
        if (currentUserLocation) {
          originLon = currentUserLocation[0];
          originLat = currentUserLocation[1];
        }
      }

      if (!destLat || !destLon) return;

      let url = '';
      if (type === 'apple') {
        if (originLat !== undefined && originLon !== undefined) {
          url = `http://maps.apple.com/?saddr=${originLat},${originLon}&daddr=${destLat},${destLon}&dirflg=d`;
        } else {
          url = `http://maps.apple.com/?daddr=${destLat},${destLon}&dirflg=d`;
        }
      } else {
        if (originLat !== undefined && originLon !== undefined) {
          url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLon}&destination=${destLat},${destLon}&travelmode=driving`;
        } else {
          url = `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLon}&travelmode=driving`;
        }
      }

      Linking.openURL(url).catch(err =>
        console.error("Couldn't load maps", err),
      );
    },
    [
      initialStopIndex,
      stops,
      sourceStopId,
      destinationStopId,
      userSearchedPickup,
      userSearchedDropoff,
      ridePickup,
      rideDropoff,
      initialPoint,
      currentUserLocation,
    ],
  );

  const mapData = useMemo(() => {
    let coordinates: [number, number][] = [];
    let stopMarkers: any[] = [];

    if (destination) {
      const destCoord: [number, number] = [
        destination.longitude,
        destination.latitude,
      ];
      stopMarkers = [
        {
          id: 'shared-destination',
          type: 'Feature',
          properties: { type: 'marker', role: 'end', name: destination.name },
          geometry: { type: 'Point', coordinates: destCoord },
        },
      ];
      coordinates = currentUserLocation
        ? [currentUserLocation, destCoord]
        : [destCoord];
    } else {
      const decoded =
        routePath && routePath.length > 0 ? decodePolyline(routePath, 1e5) : [];
      coordinates =
        decoded.length > 0 ? decoded : (stops || []).map(s => [s.lon, s.lat]);

      stopMarkers = (stops || []).map((stop, idx) => {
        let role = 'stop';
        if (sourceStopId !== undefined && destinationStopId !== undefined) {
          /** Use loose equality (==) to handle string/number ID mismatches from API */
          if (String(stop.id) === String(sourceStopId)) role = 'start';
          else if (String(stop.id) === String(destinationStopId)) role = 'end';
        } else {
          role =
            idx === 0
              ? 'start'
              : idx === (stops || []).length - 1
              ? 'end'
              : 'stop';
        }

        return {
          id: `stop-${stop.sequence}-${idx}`,
          type: 'Feature',
          properties: {
            type: 'marker',
            role,
            name: stop.name,
          },
          geometry: { type: 'Point', coordinates: [stop.lon, stop.lat] },
        };
      });
    }

    const showPickup =
      initialStopIndex === undefined ||
      (initialStopIndex !== undefined &&
        stops &&
        stops[initialStopIndex] &&
        String(stops[initialStopIndex].id) === String(sourceStopId));

    const showDropoff =
      initialStopIndex === undefined ||
      (initialStopIndex !== undefined &&
        stops &&
        stops[initialStopIndex] &&
        String(stops[initialStopIndex].id) === String(destinationStopId));

    const boundsCoords = [...coordinates];
    if (showPickup && userSearchedPickup) {
      boundsCoords.push([
        userSearchedPickup.longitude,
        userSearchedPickup.latitude,
      ]);
    }
    if (showDropoff && userSearchedDropoff) {
      boundsCoords.push([
        userSearchedDropoff.longitude,
        userSearchedDropoff.latitude,
      ]);
    }

    const bounds =
      boundsCoords.length > 0 ? getBoundingBox(boundsCoords) : null;

    // Split polyline coordinates into highlighted and unselected features
    const routeFeatures: any[] = [];

    if (
      !destination &&
      sourceStopId !== undefined &&
      destinationStopId !== undefined &&
      coordinates.length > 1
    ) {
      const pickupStop = (stops || []).find(
        s => String(s.id) === String(sourceStopId),
      );
      const dropoffStop = (stops || []).find(
        s => String(s.id) === String(destinationStopId),
      );

      if (pickupStop && dropoffStop) {
        const pickupIdx = findClosestCoordinateIndex(
          [pickupStop.lon, pickupStop.lat],
          coordinates,
        );
        const dropoffIdx = findClosestCoordinateIndex(
          [dropoffStop.lon, dropoffStop.lat],
          coordinates,
        );

        const [startIdx, endIdx] = [pickupIdx, dropoffIdx].sort(
          (a, b) => a - b,
        );

        const startCoords = coordinates.slice(0, startIdx + 1);
        const highlightedCoords = coordinates.slice(startIdx, endIdx + 1);
        const endCoords = coordinates.slice(endIdx);

        if (startCoords.length > 1) {
          routeFeatures.push({
            type: 'Feature',
            properties: { type: 'route', status: 'unselected' },
            geometry: { type: 'LineString', coordinates: startCoords },
          });
        }

        if (highlightedCoords.length > 1) {
          routeFeatures.push({
            type: 'Feature',
            properties: { type: 'route', status: 'highlighted' },
            geometry: { type: 'LineString', coordinates: highlightedCoords },
          });
        }

        if (endCoords.length > 1) {
          routeFeatures.push({
            type: 'Feature',
            properties: { type: 'route', status: 'unselected' },
            geometry: { type: 'LineString', coordinates: endCoords },
          });
        }
      } else {
        // Fallback: no matching pickup/dropoff stops found, highlight entire route
        routeFeatures.push({
          type: 'Feature',
          properties: { type: 'route', status: 'highlighted' },
          geometry: { type: 'LineString', coordinates: coordinates },
        });
      }
    } else if (coordinates.length > 1) {
      routeFeatures.push({
        type: 'Feature',
        properties: { type: 'route', status: 'highlighted' },
        geometry: { type: 'LineString', coordinates: coordinates },
      });
    }

    if (showPickup && pickupRouteCoords.length > 1) {
      routeFeatures.push({
        type: 'Feature',
        properties: { type: 'connection', status: 'pickup' },
        geometry: { type: 'LineString', coordinates: pickupRouteCoords },
      });
    }

    if (showDropoff && dropoffRouteCoords.length > 1) {
      routeFeatures.push({
        type: 'Feature',
        properties: { type: 'connection', status: 'dropoff' },
        geometry: { type: 'LineString', coordinates: dropoffRouteCoords },
      });
    }

    if (showPickup && userSearchedPickup) {
      stopMarkers.push({
        id: 'user-searched-pickup',
        type: 'Feature',
        properties: {
          type: 'marker',
          role: 'user-pickup',
          name: userSearchedPickup.name,
        },
        geometry: {
          type: 'Point',
          coordinates: [
            userSearchedPickup.longitude,
            userSearchedPickup.latitude,
          ],
        },
      });
    }

    if (showDropoff && userSearchedDropoff) {
      stopMarkers.push({
        id: 'user-searched-dropoff',
        type: 'Feature',
        properties: {
          type: 'marker',
          role: 'user-dropoff',
          name: userSearchedDropoff.name,
        },
        geometry: {
          type: 'Point',
          coordinates: [
            userSearchedDropoff.longitude,
            userSearchedDropoff.latitude,
          ],
        },
      });
    }

    // Safety: filter out any route features that have fewer than 2 coordinates
    const validRouteFeatures = routeFeatures.filter(
      f => f.geometry.coordinates && f.geometry.coordinates.length >= 2,
    );

    return {
      geoJSON: {
        type: 'FeatureCollection',
        features: [...validRouteFeatures, ...stopMarkers],
      },
      bounds,
    };
  }, [
    routePath,
    stops,
    destination,
    currentUserLocation,
    sourceStopId,
    destinationStopId,
    userSearchedPickup,
    userSearchedDropoff,
    pickupRouteCoords,
    dropoffRouteCoords,
    initialStopIndex,
  ]);

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const handleMapLoaded = useCallback(() => setIsMapLoaded(true), []);

  const focusBounds = useMemo(() => {
    if (initialStopIndex !== undefined && stops && stops[initialStopIndex]) {
      const stop = stops[initialStopIndex];
      const stopCoord: [number, number] = [stop.lon, stop.lat];

      const isPickup = String(stop.id) === String(sourceStopId);
      const isDropoff = String(stop.id) === String(destinationStopId);

      if (isPickup && userSearchedPickup) {
        return getBoundingBox([
          stopCoord,
          [userSearchedPickup.longitude, userSearchedPickup.latitude],
        ]);
      } else if (isDropoff && userSearchedDropoff) {
        return getBoundingBox([
          stopCoord,
          [userSearchedDropoff.longitude, userSearchedDropoff.latitude],
        ]);
      }
    }
    return null;
  }, [
    initialStopIndex,
    stops,
    sourceStopId,
    destinationStopId,
    userSearchedPickup,
    userSearchedDropoff,
  ]);

  useEffect(() => {
    if (!isMapLoaded) return;
    const timer = setTimeout(() => {
      const controller = cameraRef.current || mapRef.current;
      if (focusBounds) {
        const [minLon, minLat, maxLon, maxLat] = focusBounds;
        cameraRef.current?.fitBounds([minLon, minLat, maxLon, maxLat], {
          padding: { top: 120, right: 60, bottom: 280, left: 60 },
          duration: 1000,
        });
      } else if (initialStopIndex !== undefined || destination) {
        controller?.setStop({
          center: [initialPoint.lon, initialPoint.lat],
          zoom: 17,
          duration: 1000,
        });
      } else if (mapData.bounds) {
        const [minLon, minLat, maxLon, maxLat] = mapData.bounds;
        cameraRef.current?.fitBounds([minLon, minLat, maxLon, maxLat], {
          padding: { top: 120, right: 60, bottom: 280, left: 60 },
          duration: 1000,
        });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [
    initialStopIndex,
    mapData.bounds,
    focusBounds,
    initialPoint,
    destination,
    isMapLoaded,
  ]);

  return {
    handleBack,
    handleUserLocationUpdate,
    handleRegionDidChange,
    handleZoomIn,
    handleZoomOut,
    handleOpenExternalMap,
    handleMapLoaded,
    mapData,
    currentUserLocation,
    cameraRef,
    mapRef,
    zoom,
    region,
    isMapMounted,
  };
};
