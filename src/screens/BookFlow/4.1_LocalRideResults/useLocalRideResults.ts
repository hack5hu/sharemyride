import { useState, useCallback, useMemo } from 'react';
import { useBookRideStore } from '@/store/useBookRideStore';
import { useLocale } from '@/constants/localization';
import { Logger } from '@/utils/logger';
import { useAppNavigation } from '@/hooks/useAppNavigation';

export const useLocalRideResults = () => {
  const { bookRideInfo: t } = useLocale();
  const { goBack } = useAppNavigation();
  const { startLocation, destinationLocation } = useBookRideStore();

  // Center of the map, initialized to startLocation or a default
  const [center, setCenter] = useState({
    latitude: startLocation?.latitude || 28.6139,
    longitude: startLocation?.longitude || 77.209,
  });

  const handleRegionChange = useCallback((feature: any) => {
    // feature usually contains the center coordinates for OlaMap (MapLibre)
    if (feature?.geometry?.coordinates) {
      const [lng, lat] = feature.geometry.coordinates;
      setCenter({ latitude: lat, longitude: lng });
    }
  }, []);

  const handleBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleRequestLocalPartner = useCallback(() => {
    Logger.log('Requesting local partner at:', center);
  }, [center]);

  // Prepare GeoJSON for the paths
  const pickupLine = useMemo(() => {
    if (!startLocation) return null;
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [startLocation.longitude, startLocation.latitude],
          [center.longitude, center.latitude],
        ],
      },
    } as any;
  }, [startLocation, center]);

  const dropoffLine = useMemo(() => {
    if (!destinationLocation) return null;
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: [
          [destinationLocation.longitude, destinationLocation.latitude],
          [center.longitude, center.latitude],
        ],
      },
    } as any;
  }, [destinationLocation, center]);

  return {
    startLocation,
    destinationLocation,
    center,
    pickupLine,
    dropoffLine,
    handleRegionChange,
    handleBack,
    handleRequestLocalPartner,
    t,
  };
};
