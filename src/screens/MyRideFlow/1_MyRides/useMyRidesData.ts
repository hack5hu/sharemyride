import { useState, useCallback, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useMyRidesStore, RideCategory } from '@/store/useMyRidesStore';
import rideService from '@/serviceManager/rideService';
import { useAuthStore } from '@/store/useAuthStore';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';

export const TAB_TO_FILTER: Record<string, RideCategory | null> = {
  upcoming: 'UPCOMING',
  completed: 'COMPLETED',
  drafts: null,
};

export const useMyRidesData = (activeTab: MyRidesTab) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { rides, setRides, appendRides, setPage } = useMyRidesStore();
  const { user } = useAuthStore();

  const parseRideResponse = (response: any): any[] => {
    if (Array.isArray(response)) return response;
    if (response?.data && Array.isArray(response.data)) return response.data;
    if (response?.content && Array.isArray(response.content)) return response.content;
    return [];
  };

  const fetchCategoryRides = useCallback(async (category: RideCategory, page: number = 0, append: boolean = false) => {
    if (page === 0) setIsLoading(true);
    
    try {
      const response = await rideService.getMyRides(category, page, 15);
      const rideList = parseRideResponse(response);
      const hasMore = rideList.length >= 15;

      if (append) {
        appendRides(category, rideList, hasMore);
      } else {
        setRides(category, rideList, hasMore);
      }
    } catch (error) {
      console.error(`[MyRidesData] Failed to fetch ${category} rides:`, error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [setRides, appendRides, user?.phoneNumber]);

  const fetchInitialRides = useCallback(() => {
    const filter = TAB_TO_FILTER[activeTab];
    if (filter) {
      fetchCategoryRides(filter, 0, false);
    }
  }, [activeTab, fetchCategoryRides]);

  useEffect(() => {
    if (isFocused) {
      fetchInitialRides();
    }
  }, [isFocused, fetchInitialRides]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchInitialRides();
  }, [fetchInitialRides]);

  const onLoadMore = useCallback(() => {
    const filter = TAB_TO_FILTER[activeTab];
    if (filter && rides[filter].hasMore && !isLoading) {
      const nextPage = rides[filter].page + 1;
      setPage(filter, nextPage);
      fetchCategoryRides(filter, nextPage, true);
    }
  }, [activeTab, rides, isLoading, fetchCategoryRides, setPage]);

  return {
    isLoading,
    isRefreshing,
    onRefresh,
    onLoadMore,
    rides,
    fetchInitialRides
  };
};
