import { useState, useCallback, useMemo } from 'react';
import { type LocalRideItemData } from '@/components/templates/LocalRideResultsTemplate/components/LocalRideCard/types.d';
import { useLocale } from '@/constants/localization';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useBookRideStore } from '@/store/useBookRideStore';
import { formatDisplayAddress } from '@/utils/address';
import {
  mapRawSearchResults,
  buildDriverRouteGeoJSON,
  buildConnectorGeoJSON,
  formatDistanceText,
  calculateMidpoint,
} from './utils/localRideMappers';

export const useLocalRideResults = () => {
  const { localRideResults: t } = useLocale();
  const { goBack, navigate } = useAppNavigation();
  const { startLocation, destinationLocation, searchResults } =
    useBookRideStore();

  const [selectedRideId, setSelectedRideId] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const rawRides = useMemo<LocalRideItemData[]>(
    () => mapRawSearchResults(searchResults, startLocation, destinationLocation),
    [searchResults, startLocation, destinationLocation],
  );

  const rides = useMemo(() => {
    let list = [...rawRides];
    if (selectedFilters.length === 0) return list;

    if (selectedFilters.includes('nearPickup')) {
      list.sort((a, b) => (a.pickupDistanceMeters ?? Infinity) - (b.pickupDistanceMeters ?? Infinity));
    }
    if (selectedFilters.includes('nearDropoff')) {
      list.sort((a, b) => (a.dropoffDistanceMeters ?? Infinity) - (b.dropoffDistanceMeters ?? Infinity));
    }
    if (selectedFilters.includes('topRated')) {
      list.sort((a, b) => b.driverRating - a.driverRating);
    }
    return list;
  }, [rawRides, selectedFilters]);

  const activeRide = useMemo(() => {
    if (rides.length === 0) return null;
    return rides.find(r => r.id === selectedRideId) || rides[0];
  }, [rides, selectedRideId]);

  const activeRideId = activeRide ? activeRide.id : null;

  const center = useMemo(() => {
    if (activeRide && activeRide.sourceCoords.latitude !== 0) {
      return activeRide.sourceCoords;
    }
    if (startLocation) {
      return { latitude: startLocation.latitude, longitude: startLocation.longitude };
    }
    return { latitude: 28.6139, longitude: 77.209 };
  }, [activeRide, startLocation]);

  const driverRouteGeoJSON = useMemo(
    () => buildDriverRouteGeoJSON(activeRide),
    [activeRide],
  );

  const pickupConnectorGeoJSON = useMemo(
    () => buildConnectorGeoJSON(startLocation, activeRide ? activeRide.sourceCoords : null),
    [startLocation, activeRide],
  );

  const dropoffConnectorGeoJSON = useMemo(
    () => buildConnectorGeoJSON(activeRide ? activeRide.destCoords : null, destinationLocation),
    [activeRide, destinationLocation],
  );

  const pickupDistanceText = useMemo(
    () => formatDistanceText(activeRide?.pickupDistanceMeters),
    [activeRide?.pickupDistanceMeters],
  );

  const dropoffDistanceText = useMemo(
    () => formatDistanceText(activeRide?.dropoffDistanceMeters),
    [activeRide?.dropoffDistanceMeters],
  );

  const pickupMidpoint = useMemo(
    () => calculateMidpoint(startLocation, activeRide ? activeRide.sourceCoords : null),
    [startLocation, activeRide],
  );

  const dropoffMidpoint = useMemo(
    () => calculateMidpoint(activeRide ? activeRide.destCoords : null, destinationLocation),
    [activeRide, destinationLocation],
  );

  const handleSelectRide = useCallback((rideId: string) => setSelectedRideId(rideId), []);

  const handleRidePress = useCallback(
    (rideId: string) => {
      const selected = rides.find(r => r.id === rideId);
      navigate('RideInformation', {
        rideId,
        sourceStopId: selected?.sourceStopId,
        destinationStopId: selected?.destinationStopId,
      });
    },
    [navigate, rides],
  );

  const handleBack = useCallback(() => goBack(), [goBack]);
  const handleOpenFilters = useCallback(() => setIsFilterModalOpen(true), []);
  const handleCloseFilters = useCallback(() => setIsFilterModalOpen(false), []);
  const handleClearFilters = useCallback(() => setSelectedFilters([]), []);
  const handleApplyFilters = useCallback((filters: string[]) => {
    setSelectedFilters(filters);
    setIsFilterModalOpen(false);
  }, []);

  const startAddress = useMemo(
    () => (startLocation?.address ? formatDisplayAddress(startLocation.address) : undefined),
    [startLocation],
  );

  const destinationAddress = useMemo(
    () => (destinationLocation?.address ? formatDisplayAddress(destinationLocation.address) : undefined),
    [destinationLocation],
  );

  return {
    rides,
    selectedRideId: activeRideId,
    activeRide,
    center,
    driverRouteGeoJSON,
    pickupConnectorGeoJSON,
    dropoffConnectorGeoJSON,
    pickupDistanceText,
    dropoffDistanceText,
    pickupMidpoint,
    dropoffMidpoint,
    startLocation,
    destinationLocation,
    startAddress,
    destinationAddress,
    isFilterModalOpen,
    selectedFilters,
    activeFiltersCount: selectedFilters.length,
    handleOpenFilters,
    handleCloseFilters,
    handleClearFilters,
    handleApplyFilters,
    handleSelectRide,
    handleRidePress,
    handleBack,
    t,
  };
};
