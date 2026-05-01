import { useState, useCallback, useMemo } from 'react';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';
import { useMyRidesData, TAB_TO_FILTER } from './useMyRidesData';
import { useMyRidesActions } from './useMyRidesActions';
import { mapBackendRideToUI } from './utils/rideMapper';
import { MyRidesHookData, RideListItem } from './types.d';
import { useTranslation } from '@/hooks/useTranslation';

export const useMyRides = (): MyRidesHookData => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<MyRidesTab>('upcoming');
  
  const {
    isLoading,
    isRefreshing,
    onRefresh,
    onLoadMore,
    rides,
    fetchInitialRides
  } = useMyRidesData(activeTab);

  const {
    onRidePress,
    onRemoveDraft,
    onCancelRide,
    onClearDrafts,
    drafts
  } = useMyRidesActions(fetchInitialRides);

  const onTabChange = useCallback((tab: MyRidesTab) => {
    setActiveTab(tab);
  }, []);

  const formattedDrafts = useMemo((): RideListItem[] => {
    return drafts.map((draft) => {
      const start = draft.state.startLocation?.name || 'Unknown';
      const end = draft.state.destinationLocation?.name || 'Unknown';
      const dateStr = draft.state.departureDate 
        ? new Date(draft.state.departureDate).toLocaleDateString() 
        : 'No date';
      return {
        id: draft.id,
        title: `${start} to ${end}`,
        subtitle: `Draft • ${dateStr}`,
        price: '₹0',
        type: 'draft' as const,
      };
    });
  }, [drafts]);

  // Optimize mapping by memoizing category results
  const mappedUpcoming = useMemo(() => 
    rides.UPCOMING.data.map(r => mapBackendRideToUI(r, 'upcoming', t)), 
  [rides.UPCOMING.data, t]);

  const mappedCompleted = useMemo(() => 
    rides.COMPLETED.data.map(r => mapBackendRideToUI(r, 'completed', t)), 
  [rides.COMPLETED.data, t]);

  const currentRides = useMemo(() => {
    const filter = TAB_TO_FILTER[activeTab];
    if (!filter) return formattedDrafts;
    
    const now = new Date();
    const allRides = [...mappedUpcoming, ...mappedCompleted];

    // Remove duplicates by ID
    const uniqueRides = Array.from(new Map(allRides.map(item => [item.id, item])).values());

    // 1. Dynamic filtering based on actual date
    const filtered = uniqueRides.filter(ride => {
      if (activeTab === 'upcoming') return (ride.rawDate || new Date()) > now;
      if (activeTab === 'completed') return (ride.rawDate || new Date()) <= now;
      return true;
    });

    // 2. Sorting
    return filtered.sort((a, b) => {
      const timeA = a.rawDate?.getTime() || 0;
      const timeB = b.rawDate?.getTime() || 0;
      return activeTab === 'upcoming' ? timeA - timeB : timeB - timeA;
    });
  }, [activeTab, mappedUpcoming, mappedCompleted, formattedDrafts]);

  return {
    activeTab,
    isLoading,
    isRefreshing,
    onTabChange,
    onRidePress,
    onRemoveDraft,
    onCancelRide,
    onClearDrafts,
    onRefresh,
    onLoadMore,
    hasMore: TAB_TO_FILTER[activeTab] ? rides[TAB_TO_FILTER[activeTab]!].hasMore : false,
    currentRides,
    drafts,
    onMenuPress: () => {},
    onProfilePress: () => {},
    onAcceptRide: () => {},
  };
};
