import { useState, useCallback, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useMyRidesStore, RideCategory } from '@/store/useMyRidesStore';
import rideService from '@/serviceManager/rideService';
import { useAuthStore } from '@/store/useAuthStore';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';
import { Logger } from '@/utils/logger';
import { useTranslation } from '@/hooks/useTranslation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';

export const TAB_TO_FILTER: Record<string, RideCategory | null> = {
  upcoming: 1,
  archive: 2,
  requests: 3,
  drafts: null,
};

export const useMyRidesData = (activeTab: MyRidesTab) => {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { t } = useTranslation();
  
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
    if (!isRefreshing && append && currentCategoryData?.data?.length >= (page + 1) * 10) {
      Logger.log(`[MyRidesData] Using cached data for ${category} page ${page}`);
      return;
    }

    if (page === 0 && !isRefreshing) setIsLoading(true);
    
    try {
      let rideList: any[] = [];
      let hasMore = false;

      const response = await rideService.getMyRides(category, page, 10);
      rideList = parseRideResponse(response);
      
      if (response?.totalPages !== undefined && response?.currentPage !== undefined) {
        hasMore = response.currentPage < response.totalPages - 1;
      } else {
        hasMore = rideList.length >= 10;
      }

      // Special sort for archive (filter 2)
      if (category === 2) {
        rideList = rideList.sort((a, b) => {
          const dateA = new Date(a.startTime || a.createdAt || 0).getTime();
          const dateB = new Date(b.startTime || b.createdAt || 0).getTime();
          return dateB - dateA;
        });
      }
      
      if (append) {
        appendRides(category, rideList, hasMore);
      } else {
        setRides(category, rideList, hasMore);
      }
    } catch (error) {
      Logger.error(`[MyRidesData] Failed to fetch ${category} rides:`, error);
      showNotification(
        NotificationType.ERROR,
        t('notification.defaultErrorTitle'),
        getErrorMessage(error, t('notification.defaultErrorMessage'))
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [setRides, appendRides, isRefreshing]);

  const fetchInitialRides = useCallback(() => {
    const filter = TAB_TO_FILTER[activeTab];
    
    // Always fetch requests to know if we should show the tab
    fetchCategoryRides(3, 0, false);
    
    if (filter !== null && filter !== undefined && filter !== 3) {
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
