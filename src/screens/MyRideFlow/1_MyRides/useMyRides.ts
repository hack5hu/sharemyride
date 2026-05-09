import { useState, useCallback, useMemo, useEffect } from 'react';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';
import { useMyRidesData, TAB_TO_FILTER } from './useMyRidesData';
import { useMyRidesActions } from './useMyRidesActions';
import { mapBackendRideToUI } from './utils/rideMapper';
import { MyRidesHookData, RideListItem } from './types.d';
import { useTranslation } from '@/hooks/useTranslation';
import rideService from '@/serviceManager/rideService';

export const useMyRides = (): MyRidesHookData => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<MyRidesTab>('upcoming');
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  const {
    isLoading,
    isRefreshing,
    onRefresh,
    onLoadMore,
    rides,
    fetchInitialRides
  } = useMyRidesData(activeTab);

  // Auto-switch to requests tab if data exists on first load
  useState(() => {
    if (rides?.REQUESTS?.data?.length > 0) {
      setActiveTab('requests');
    }
  });

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

  const mappedRequests = useMemo(() => 
    (rides?.REQUESTS?.data || []).map(r => mapBackendRideToUI(r, 'requests' as any, t)), 
  [rides?.REQUESTS?.data, t]);

  const hasRequests = mappedRequests.length > 0;

  // If on requests tab and requests disappear, switch to upcoming
  useEffect(() => {
    if (activeTab === 'requests' && !hasRequests) {
      setActiveTab('upcoming');
    }
  }, [activeTab, hasRequests]);

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

  const mappedUpcoming = useMemo(() => 
    (rides?.UPCOMING?.data || []).map(r => mapBackendRideToUI(r, 'upcoming', t)), 
  [rides?.UPCOMING?.data, t]);

  const mappedCompleted = useMemo(() => 
    (rides?.COMPLETED?.data || []).map(r => mapBackendRideToUI(r, 'completed', t)), 
  [rides?.COMPLETED?.data, t]);

  const currentRides = useMemo(() => {
    const filter = TAB_TO_FILTER[activeTab];
    if (activeTab === 'drafts') return formattedDrafts;
    if (activeTab === 'requests') return mappedRequests;
    
    const now = new Date();
    const allRides = activeTab === 'upcoming' ? mappedUpcoming : mappedCompleted;

    // Sort upcoming rides by date ascending, completed by date descending
    return [...allRides].sort((a, b) => {
      const timeA = a.rawDate?.getTime() || 0;
      const timeB = b.rawDate?.getTime() || 0;
      return activeTab === 'upcoming' ? timeA - timeB : timeB - timeA;
    });
  }, [activeTab, mappedUpcoming, mappedCompleted, mappedRequests, formattedDrafts]);

  const onAcceptBooking = useCallback(async (id: string) => {
    setIsActionLoading(true);
    try {
      await rideService.acceptBooking(id);
      onRefresh();
    } catch (error) {
      console.error('Failed to accept booking:', error);
    } finally {
      setIsActionLoading(false);
    }
  }, [onRefresh]);

  const onRejectBooking = useCallback(async (id: string) => {
    setIsActionLoading(true);
    try {
      await rideService.rejectBooking(id);
      onRefresh();
    } catch (error) {
      console.error('Failed to reject booking:', error);
    } finally {
      setIsActionLoading(false);
    }
  }, [onRefresh]);

  return {
    activeTab,
    isLoading,
    isRefreshing,
    isActionLoading,
    onTabChange,
    onRidePress,
    onRemoveDraft,
    onCancelRide,
    onClearDrafts,
    onRefresh,
    onLoadMore,
    hasMore: TAB_TO_FILTER[activeTab] ? rides?.[TAB_TO_FILTER[activeTab]!]?.hasMore : false,
    currentRides,
    drafts,
    mappedRequests,
    hasRequests,
    onMenuPress: () => {},
    onProfilePress: () => {},
    onAcceptRide: onAcceptBooking,
    onRejectRide: onRejectBooking,
  };
};
