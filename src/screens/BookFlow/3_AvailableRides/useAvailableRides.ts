import { useState, useCallback, useMemo } from 'react';
import { useLocale } from '@/constants/localization';
import { RideData } from './types';
import { useBookRideStore } from '@/store/useBookRideStore';
import { calculateDistance } from '@/utils/location';
import { calculateSegmentPrice } from '@/utils/pricing';
import rideService from '@/serviceManager/rideService';
import { useAppNavigation } from '@/hooks/useAppNavigation';

export const useAvailableRides = () => {
  const { navigate, goBack } = useAppNavigation();
  const { availableRides: t, rideFilters: ft } = useLocale();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { 
    searchResults, 
    startLocation, 
    destinationLocation, 
    hasMore,
  } = useBookRideStore();

  const mapFiltersToPayload = useCallback((activeFilters: string[]) => {
    const payload: any = {};
    
    if (activeFilters.includes('nearPickup')) payload.proximityType = 'PICKUP';
    if (activeFilters.includes('nearDropoff')) payload.proximityType = 'DROP_OFF';
    
    if (activeFilters.includes('noSmoking')) payload.noSmoking = true;
    if (activeFilters.includes('ladiesOnly')) payload.ladiesOnly = true;
    if (activeFilters.includes('verifiedOnly')) payload.verifiedDrivers = true;
    if (activeFilters.includes('petFriendly')) payload.petFriendly = true;
    if (activeFilters.includes('luggageAllowed')) payload.luggageAllowed = true;

    const timeFilters = activeFilters.filter(f => f.startsWith('time_'));
    if (timeFilters.length > 0) {
      const slots = timeFilters.map(f => {
        const [_, s, e] = f.split('_').map(Number);
        return { s, e };
      }).sort((a, b) => a.s - b.s);

      const merged: string[] = [];
      let current = slots[0];

      for (let i = 1; i < slots.length; i++) {
        if (slots[i].s === current.e) {
          current.e = slots[i].e;
        } else {
          merged.push(`${current.s === 0 ? 12 : (current.s > 12 ? current.s - 12 : current.s)}-${current.e > 12 ? current.e - 12 : (current.e === 0 ? 12 : current.e)} ${current.e <= 12 ? 'AM' : 'PM'}`);
          current = slots[i];
        }
      }
      merged.push(`${current.s === 0 ? 12 : (current.s > 12 ? current.s - 12 : current.s)}-${current.e > 12 ? current.e - 12 : (current.e === 0 ? 12 : (current.e === 24 ? 12 : current.e))} ${current.e <= 12 ? 'AM' : (current.e === 24 ? 'AM' : 'PM')}`);
      payload.departureTimeSlot = merged.join(', ');
    }

    return payload;
  }, []);

  const handleLoadMore = useCallback(async () => {
    const store = useBookRideStore.getState();
    const { startLocation: curStart, destinationLocation: curDest, travelDate: curDate, currentPage, hasMore: curHasMore, seatCount } = store;

    if (isFetchingMore || !curHasMore || !curStart || !curDest || !curDate) return;

    try {
      setIsFetchingMore(true);
      const nextPage = currentPage + 1;
      
      const payload = {
        sourceLat: curStart.latitude,
        sourceLon: curStart.longitude,
        destLat: curDest.latitude,
        destLon: curDest.longitude,
        travelDate: curDate,
        requestedSeats: seatCount,
        radiusInMeters: 10000,
        page: nextPage,
        size: 10,
        ...mapFiltersToPayload(selectedFilters)
      };

      const response = await rideService.searchRides(payload);
      const newRides = response.rides || response.data || response;
      
      if (newRides && newRides.length > 0) {
        store.appendSearchResults(newRides);
        store.setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error('Failed to load more rides:', error);
    } finally {
      setIsFetchingMore(false);
    }
  }, [isFetchingMore, selectedFilters, mapFiltersToPayload]);

  const mappedRides: RideData[] = useMemo(() => {
    if (!searchResults || searchResults.length === 0) return [];
    
    return searchResults.map((ride, index) => {
      const hasStops = ride.stops && ride.stops.length > 0;
      const firstStop = hasStops ? ride.stops[0] : null;
      const lastStop = hasStops ? ride.stops[ride.stops.length - 1] : null;
      
      const totalPrice = hasStops 
        ? calculateSegmentPrice(ride.stops || [], ride.fullJourneyPrice)
        : (ride.price || 0);

      const features: string[] = [];
      if (ride.preferences?.nonSmoking) features.push('noSmoking');
      if (ride.preferences?.womenOnly) features.push('ladiesOnly');
      if (ride.preferences?.petFriendly) features.push('petFriendly');
      if (ride.preferences?.luggageAllowed) features.push('luggageAllowed');
      if (ride.preferences?.manualApproval) features.push('manualApproval');
      if (ride.preferences?.musicPreference) features.push(`music:${ride.preferences.musicPreference}`);

      const sLat = hasStops ? firstStop?.lat : (ride.sourceLat || 0);
      const sLon = hasStops ? firstStop?.lon : (ride.sourceLon || 0);
      const dLat = hasStops ? lastStop?.lat : (ride.destLat || 0);
      const dLon = hasStops ? lastStop?.lon : (ride.destLon || 0);

      const pickupDistance = startLocation 
        ? calculateDistance(startLocation.latitude, startLocation.longitude, sLat, sLon)
        : 9999;
      
      const dropoffDistance = destinationLocation
        ? calculateDistance(destinationLocation.latitude, destinationLocation.longitude, dLat, dLon)
        : 9999;

      const timeline = hasStops 
        ? ride.stops.map((stop: any, idx: number, arr: any[]) => ({
            time: stop.arrivalTime
              ? new Date(stop.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : 'TBD',
            location: stop.name || stop.address || 'Unknown Location',
            type: idx === 0 ? 'pickup' : (idx === arr.length - 1 ? 'destination' : 'stop'),
          }))
        : [
            {
              time: ride.startTime ? new Date(ride.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD',
              location: ride.sourceStopName || ride.sourceAddress || 'Pickup',
              type: 'pickup'
            },
            {
              time: ride.endTime ? new Date(ride.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD',
              location: ride.destinationStopName || ride.destinationAddress || 'Dropoff',
              type: 'destination'
            }
          ];

      const sTime = ride.startTime || firstStop?.arrivalTime;
      const eTime = ride.endTime || lastStop?.arrivalTime;

      return {
        id: ride.id || String(index),
        driver: {
          name: ride.driverName || 'Unknown Host',
          rating: ride.driverRating || 4.8,
          rideCount: ride.driverRideCount || 15,
          avatar: ride.driverPhotoUrl || 'https://ui-avatars.com/api/?name=' + (ride.driverName || 'U'),
          driverPhotoUrl: ride.driverPhotoUrl,
          isVerified: true,
        },
        price: totalPrice,
        timeline,
        features,
        seatsLeft: ride.availableSeats,
        isFrequentCoRider: !!ride.isFrequentCoRider,
        pickupDistance,
        dropoffDistance,
        totalDuration: (sTime && eTime)
          ? Math.round((new Date(eTime).getTime() - new Date(sTime).getTime()) / (1000 * 60))
          : 0,
        departureHour: sTime ? new Date(sTime).getHours() : undefined,
        sourceStopId: ride.sourceStopId,
        destinationStopId: ride.destinationStopId,
      } as any;
    });
  }, [searchResults, startLocation, destinationLocation]);

  const filteredRides = useMemo(() => {
    let result = [...mappedRides];

    if (selectedFilters.length > 0) {
      const timeFilters = selectedFilters.filter(f => f.startsWith('time_'));

      if (timeFilters.length > 0) {
        result = result.filter((ride) => {
          if (ride.departureHour === undefined) return false;
          return timeFilters.some((slot) => {
            const [_, start, end] = slot.split('_').map(Number);
            return ride.departureHour! >= start && ride.departureHour! < end;
          });
        });
      }
    }

    if (selectedFilters.includes('time')) {
      result.sort((a, b) => {
        const timeA = a.timeline[0]?.time || 'TBD';
        const timeB = b.timeline[0]?.time || 'TBD';
        return timeA.localeCompare(timeB);
      });
    }

    if (selectedFilters.includes('nearPickup')) {
      result.sort((a, b) => (a.pickupDistance || 0) - (b.pickupDistance || 0));
    }

    if (selectedFilters.includes('nearDropoff')) {
      result.sort((a, b) => (a.dropoffDistance || 0) - (b.dropoffDistance || 0));
    }

    return result;
  }, [mappedRides, selectedFilters]);

  const handleBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleRideSelect = useCallback((rideId: string) => {
    const rawRides = useBookRideStore.getState().searchResults;
    const ride = rawRides?.find(r => String(r.id) === String(rideId));
    navigate('RideInformation', { 
      rideId,
      sourceStopId: ride?.sourceStopId,
      destinationStopId: ride?.destinationStopId
    });
  }, [navigate]);

  const handleOpenFilters = useCallback(() => {
    setIsFilterModalOpen(true);
  }, []);

  const handleCloseFilters = useCallback(() => {
    setIsFilterModalOpen(false);
  }, []);

  const toggleFilter = useCallback((filter: string) => {
    setSelectedFilters(prev => {
      const isAlreadySelected = prev.includes(filter);
      
      if (isAlreadySelected) {
        return prev.filter(f => f !== filter);
      } else {
        if (filter === 'nearPickup') {
          return [...prev.filter(f => f !== 'nearDropoff'), 'nearPickup'];
        }
        if (filter === 'nearDropoff') {
          return [...prev.filter(f => f !== 'nearPickup'), 'nearDropoff'];
        }
        return [...prev, filter];
      }
    });
  }, []);

  const handleClearFilters = useCallback(async () => {
    setSelectedFilters([]);
    const store = useBookRideStore.getState();
    store.setFilters({});
    setIsFilterModalOpen(false);
    
    const { startLocation: curStart, destinationLocation: curDest, travelDate: curDate, seatCount, setSearchResults } = store;
    if (!curStart || !curDest || !curDate) return;
    
    setSearchResults([]);
    setIsLoading(true);
    try {
      const payload = {
        sourceLat: curStart.latitude,
        sourceLon: curStart.longitude,
        destLat: curDest.latitude,
        destLon: curDest.longitude,
        travelDate: curDate,
        requestedSeats: seatCount,
        radiusInMeters: 10000,
        page: 0,
        size: 10,
      };
      const response = await rideService.searchRides(payload);
      setSearchResults(response.rides || response.data || response);
    } catch (error) {
      console.error('Failed to clear filters and fetch:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleApplyFilters = useCallback(async (filters: string[]) => {
    const isSame = 
      filters.length === selectedFilters.length && 
      filters.every(f => selectedFilters.includes(f));
    
    if (isSame) {
      return;
    }

    setSelectedFilters(filters);
    const store = useBookRideStore.getState();
    const { startLocation: curStart, destinationLocation: curDest, travelDate: curDate, seatCount, setSearchResults } = store;
    if (!curStart || !curDest || !curDate) return;

    setSearchResults([]);
    setIsLoading(true);
    try {
      const filterPayload = mapFiltersToPayload(filters);
      const payload = {
        sourceLat: curStart.latitude,
        sourceLon: curStart.longitude,
        destLat: curDest.latitude,
        destLon: curDest.longitude,
        travelDate: curDate,
        requestedSeats: seatCount,
        radiusInMeters: 10000,
        page: 0,
        size: 10,
        ...filterPayload
      };

      const response = await rideService.searchRides(payload);
      setSearchResults(response.rides || response.data || response);
    } catch (error) {
      console.error('Failed to apply filters:', error);
    } finally {
      setIsLoading(false);
    }
  }, [mapFiltersToPayload, selectedFilters]);

  const handleViewDetails = useCallback((rideId: string) => {
    console.log('Viewing details:', rideId);
  }, []);

  return {
    mockRides: filteredRides,
    selectedFilters,
    isFilterModalOpen,
    isFetchingMore,
    toggleFilter,
    handleOpenFilters,
    handleCloseFilters,
    handleClearFilters,
    handleApplyFilters,
    handleBack,
    handleRideSelect,
    handleViewDetails,
    handleLoadMore,
    isLoading,
    hasMore,
    t,
    ft,
  };
};
