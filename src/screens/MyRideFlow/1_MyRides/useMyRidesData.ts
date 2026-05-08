import { useState, useCallback, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useMyRidesStore, RideCategory } from '@/store/useMyRidesStore';
import rideService from '@/serviceManager/rideService';
import { useAuthStore } from '@/store/useAuthStore';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';

export const TAB_TO_FILTER: Record<string, RideCategory | null> = {
  requests: 'REQUESTS',
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
    if (response?.rides && Array.isArray(response.rides)) return response.rides;
    if (response?.data && Array.isArray(response.data)) return response.data;
    if (response?.content && Array.isArray(response.content)) return response.content;
    return [];
  };

  const fetchCategoryRides = useCallback(async (category: RideCategory, page: number = 0, append: boolean = false) => {
    if (page === 0) setIsLoading(true);
    
    try {
      let response;
      if (category === 'REQUESTS') {
        response = await rideService.getPendingBookings();
      } else {
        response = await rideService.getMyRides(category as any, page, 10);
      }
      
      const rideList = parseRideResponse(response);
      
      let hasMore = false;
      if (category !== 'REQUESTS' && response?.totalPages !== undefined && response?.currentPage !== undefined) {
        hasMore = response.currentPage < response.totalPages - 1;
      } else if (category !== 'REQUESTS') {
        hasMore = rideList.length >= 10;
      }

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
    
    // Always fetch requests to know if we should show the tab/bento
    fetchCategoryRides('REQUESTS', 0, false);
    
    if (filter && filter !== 'REQUESTS') {
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
    const categoryState = filter ? rides?.[filter] : null;
    
    if (filter && categoryState?.hasMore && !isLoading) {
      const nextPage = (categoryState?.page || 0) + 1;
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
