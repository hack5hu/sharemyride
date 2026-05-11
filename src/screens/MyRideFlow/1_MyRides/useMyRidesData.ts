import { useState, useCallback, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useMyRidesStore, RideCategory } from '@/store/useMyRidesStore';
import rideService from '@/serviceManager/rideService';
import { useAuthStore } from '@/store/useAuthStore';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';

export const TAB_TO_FILTER: Record<string, RideCategory | null> = {
  requests: 'REQUESTS',
  upcoming: 'UPCOMING',
  archive: 'ARCHIVE',
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
    // Caching check: if not refreshing and we already have data for this page (and it's full), skip
    const { rides: currentRides } = useMyRidesStore.getState();
    const currentCategoryData = currentRides[category];
    if (!isRefreshing && append && currentCategoryData.data.length >= (page + 1) * 10) {
      console.log(`[MyRidesData] Using cached data for ${category} page ${page}`);
      return;
    }

    if (page === 0 && !isRefreshing) setIsLoading(true);
    
    try {
      let rideList: any[] = [];
      let hasMore = false;

      if (category === 'REQUESTS') {
        const response = await rideService.getPendingBookings();
        rideList = parseRideResponse(response);
      } else if (category === 'ARCHIVE') {
        // Fetch both COMPLETED and CANCELLED for Archive
        const [compRes, cancRes] = await Promise.all([
          rideService.getMyRides('COMPLETED', page, 10),
          rideService.getMyRides('CANCELLED', page, 10)
        ]);
        
        const compList = parseRideResponse(compRes);
        const cancList = parseRideResponse(cancRes);
        
        // Merge and sort by date (descending)
        rideList = [...compList, ...cancList].sort((a, b) => {
          const dateA = new Date(a.startTime || a.createdAt || 0).getTime();
          const dateB = new Date(b.startTime || b.createdAt || 0).getTime();
          return dateB - dateA;
        });

        const compHasMore = compRes?.currentPage < compRes?.totalPages - 1;
        const cancHasMore = cancRes?.currentPage < cancRes?.totalPages - 1;
        hasMore = compHasMore || cancHasMore;
      } else {
        const response = await rideService.getMyRides(category as any, page, 10);
        rideList = parseRideResponse(response);
        if (response?.totalPages !== undefined && response?.currentPage !== undefined) {
          hasMore = response.currentPage < response.totalPages - 1;
        } else {
          hasMore = rideList.length >= 10;
        }
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
  }, [setRides, appendRides, isRefreshing]);

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
    const { rides: currentRides } = useMyRidesStore.getState();
    const categoryState = filter ? currentRides?.[filter] : null;
    
    if (filter && categoryState?.hasMore && !isLoading) {
      const nextPage = (categoryState?.page || 0) + 1;
      setPage(filter, nextPage);
      fetchCategoryRides(filter, nextPage, true);
    }
  }, [activeTab, isLoading, fetchCategoryRides, setPage]);

  return {
    isLoading,
    isRefreshing,
    onRefresh,
    onLoadMore,
    rides,
    fetchInitialRides
  };
};
