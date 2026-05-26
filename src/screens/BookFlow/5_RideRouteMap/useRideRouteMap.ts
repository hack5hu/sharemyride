import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { Linking } from 'react-native';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { CameraRef } from '@maplibre/maplibre-react-native';
import { decodePolyline, getBoundingBox } from '@/utils/polyline';

const findClosestCoordinateIndex = (pt: [number, number], coords: [number, number][]) => {
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
  destinationStopId?: number | string
) => {
  const { pop } = useAppNavigation();
  const cameraRef = useRef<CameraRef>(null);
  const mapRef = useRef<any>(null);
  const zoomRef = useRef(14);
  
  const [currentUserLocation, setCurrentUserLocation] = useState<[number, number] | null>(null);

  const initialPoint = useMemo(() => {
    if (destination) return { lat: destination.latitude, lon: destination.longitude };
    if (initialStopIndex !== undefined && stops && stops[initialStopIndex]) return stops[initialStopIndex];
    return (stops && stops.length > 0) ? stops[0] : { lat: 12.9716, lon: 77.5946 };
  }, [destination, initialStopIndex, stops]);

  const [zoom, setZoom] = useState(initialStopIndex !== undefined || destination ? 15 : 12);
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
      setCurrentUserLocation([location.coords.longitude, location.coords.latitude]);
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

  const handleOpenExternalMap = useCallback((type: 'google' | 'apple') => {
    let lat, lon;
    if (destination) {
      lat = destination.latitude;
      lon = destination.longitude;
    } else if (stops && stops.length > 0) {
      const end = stops[stops.length - 1];
      lat = end.lat;
      lon = end.lon;
    } else return;

    const url = type === 'apple' 
      ? `http://maps.apple.com/?daddr=${lat},${lon}&dirflg=d`
      : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&travelmode=driving`;

    Linking.openURL(url).catch(err => console.error("Couldn't load maps", err));
  }, [destination, stops]);

  const mapData = useMemo(() => {
    let coordinates: [number, number][] = [];
    let stopMarkers: any[] = [];

    if (destination) {
      const destCoord: [number, number] = [destination.longitude, destination.latitude];
      stopMarkers = [{
        id: 'shared-destination',
        type: 'Feature',
        properties: { type: 'marker', role: 'end', name: destination.name },
        geometry: { type: 'Point', coordinates: destCoord },
      }];
      coordinates = currentUserLocation ? [currentUserLocation, destCoord] : [destCoord];
    } else {
      const decoded = (routePath && routePath.length > 0) ? decodePolyline(routePath, 1e5) : [];
      coordinates = decoded.length > 0 ? decoded : (stops || []).map(s => [s.lon, s.lat]);
      
      stopMarkers = (stops || []).map((stop, idx) => {
        let role = 'stop';
        if (sourceStopId !== undefined && destinationStopId !== undefined) {
          /** Use loose equality (==) to handle string/number ID mismatches from API */
          if (String(stop.id) === String(sourceStopId)) role = 'start';
          else if (String(stop.id) === String(destinationStopId)) role = 'end';
        } else {
          role = idx === 0 ? 'start' : (idx === (stops || []).length - 1 ? 'end' : 'stop');
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

    const bounds = coordinates.length > 0 ? getBoundingBox(coordinates) : null;
    
    // Split polyline coordinates into highlighted and unselected features
    const routeFeatures: any[] = [];
    
    if (!destination && sourceStopId !== undefined && destinationStopId !== undefined && coordinates.length > 1) {
      const pickupStop = (stops || []).find(s => String(s.id) === String(sourceStopId));
      const dropoffStop = (stops || []).find(s => String(s.id) === String(destinationStopId));

      if (pickupStop && dropoffStop) {
        const pickupIdx = findClosestCoordinateIndex([pickupStop.lon, pickupStop.lat], coordinates);
        const dropoffIdx = findClosestCoordinateIndex([dropoffStop.lon, dropoffStop.lat], coordinates);

        const [startIdx, endIdx] = [pickupIdx, dropoffIdx].sort((a, b) => a - b);

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

    // Safety: filter out any route features that have fewer than 2 coordinates
    const validRouteFeatures = routeFeatures.filter(
      f => f.geometry.coordinates && f.geometry.coordinates.length >= 2
    );

    return {
      geoJSON: {
        type: 'FeatureCollection',
        features: [...validRouteFeatures, ...stopMarkers],
      },
      bounds,
    };
  }, [routePath, stops, destination, currentUserLocation, sourceStopId, destinationStopId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const controller = cameraRef.current || mapRef.current;
      if (initialStopIndex !== undefined || destination) {
        controller?.setStop({
          center: [initialPoint.lon, initialPoint.lat],
          zoom: 17,
          duration: 1000,
        });
      } else if (mapData.bounds) {
        const [minLon, minLat, maxLon, maxLat] = mapData.bounds;
        cameraRef.current?.fitBounds(
          [minLon, minLat, maxLon, maxLat],
          { padding: { top: 120, right: 60, bottom: 280, left: 60 }, duration: 2000 }
        );
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [initialStopIndex, mapData.bounds, initialPoint, destination]);

  return {
    handleBack,
    handleUserLocationUpdate,
    handleRegionDidChange,
    handleZoomIn,
    handleZoomOut,
    handleOpenExternalMap,
    mapData,
    currentUserLocation,
    cameraRef,
    mapRef,
    zoom,
    region,
    isMapMounted,
  };
};
