import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { decodePolyline, getBoundingBox } from '@/utils/polyline';

export const useRideRouteMap = (routePath: string, stops: any[]) => {
  const navigation = useNavigation();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const mapData = useMemo(() => {
    // If we have a polyline, decode it. Otherwise fall back to connecting stop coords.
    const decoded = routePath ? decodePolyline(routePath, 1e5) : [];
    const coordinates = decoded.length > 0
      ? decoded
      : stops.map(s => [s.lon, s.lat]);
    const bounds = getBoundingBox(coordinates);
    
    const stopMarkers = stops.map((stop, idx) => ({
      id: `stop-${stop.sequence}-${idx}`,
      type: 'Feature',
      properties: { 
        type: 'marker', 
        role: idx === 0 ? 'start' : (idx === stops.length - 1 ? 'end' : 'stop'),
        name: stop.name,
      },
      geometry: {
        type: 'Point',
        coordinates: [stop.lon, stop.lat],
      },
    }));

    const routeFeature = {
      type: 'Feature',
      properties: { type: 'route' },
      geometry: {
        type: 'LineString',
        coordinates: coordinates,
      },
    };

    return {
      geoJSON: {
        type: 'FeatureCollection',
        features: [routeFeature, ...stopMarkers],
      },
      bounds,
    };
  }, [routePath, stops]);

  return {
    handleBack,
    mapData,
  };
};
