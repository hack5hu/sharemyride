import { useState, useCallback, useMemo, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';
import { useMyRidesData, TAB_TO_FILTER } from './useMyRidesData';
import { useMyRidesActions } from './useMyRidesActions';
import { mapBackendRideToUI } from './utils/rideMapper';
import { MyRidesHookData, RideListItem } from './types.d';
import { useTranslation } from '@/hooks/useTranslation';
import rideService from '@/serviceManager/rideService';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';

export const useMyRides = (): MyRidesHookData => {
  const { t } = useTranslation();
  const route = useRoute<any>();
  const initialTab = route.params?.tab || 'upcoming';
  const [activeTab, setActiveTab] = useState<MyRidesTab>(initialTab);
  
  useEffect(() => {
    if (route.params?.tab) {
      setActiveTab(route.params.tab);
    }
  }, [route.params?.tab]);
  
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
    if (rides?.[3]?.data?.length > 0) {
      setActiveTab('requests');
    }
  });

  const [confirmModalConfig, setConfirmModalConfig] = useState<{
    isVisible: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    type?: 'info' | 'danger' | 'warning';
  }>({
    isVisible: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });

  const showConfirm = useCallback((config: any) => {
    setConfirmModalConfig({
      isVisible: true,
      title: config.title,
      message: config.message,
      confirmLabel: config.confirmLabel,
      cancelLabel: config.cancelLabel,
      onConfirm: () => {
        config.onConfirm();
        setConfirmModalConfig(prev => ({ ...prev, isVisible: false }));
      },
      type: config.type,
    });
  }, []);

  const hideConfirmModal = useCallback(() => {
    setConfirmModalConfig(prev => ({ ...prev, isVisible: false }));
  }, []);

  const {
    onRidePress,
    onRemoveDraft,
    onCancelRide,
    onClearDrafts,
    onChatPress,
    drafts
  } = useMyRidesActions(fetchInitialRides, showConfirm);

  const onTabChange = useCallback((tab: MyRidesTab) => {
    setActiveTab(tab);
  }, []);

  const mappedRequests = useMemo(() => 
    (rides?.[3]?.data || []).map(r => mapBackendRideToUI(r, 'requests' as any, t)), 
  [rides?.[3]?.data, t]);

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
        price: draft.state.fullJourneyPrice ? `₹${draft.state.fullJourneyPrice}` : (draft.state.price ? `₹${draft.state.price}` : '₹0'),
        type: 'draft' as const,
      };
    });
  }, [drafts]);

  const mappedUpcoming = useMemo(() => 
    (rides?.[1]?.data || []).map(r => mapBackendRideToUI(r, 'upcoming', t)), 
  [rides?.[1]?.data, t]);

  const mappedArchive = useMemo(() => 
    (rides?.[2]?.data || []).map(r => mapBackendRideToUI(r, 'archive', t)), 
  [rides?.[2]?.data, t]);

  const getTabData = useCallback((tab: MyRidesTab) => {
    if (tab === 'drafts') return formattedDrafts;
    if (tab === 'requests') return mappedRequests;
    
    const allRides = tab === 'upcoming' ? mappedUpcoming : mappedArchive;

    return [...allRides].sort((a, b) => {
      const timeA = a.rawDate?.getTime() || 0;
      const timeB = b.rawDate?.getTime() || 0;
      return tab === 'upcoming' ? timeA - timeB : timeB - timeA;
    });
  }, [mappedUpcoming, mappedArchive, mappedRequests, formattedDrafts]);

  const onAcceptBooking = useCallback(async (id: string) => {
    setIsActionLoading(true);
    try {
      await rideService.acceptBooking(id);
      showNotification(
        NotificationType.SUCCESS,
        t('notification.defaultSuccessTitle'),
        t('notification.bookingAccepted')
      );
      onRefresh();
    } catch (error: any) {
      console.error('Failed to accept booking:', error);
      showNotification(
        NotificationType.ERROR,
        t('notification.defaultErrorTitle'),
        getErrorMessage(error, t('notification.defaultErrorMessage'))
      );
    } finally {
      setIsActionLoading(false);
    }
  }, [onRefresh, t]);

  const onRejectBooking = useCallback(async (id: string) => {
    setIsActionLoading(true);
    try {
      await rideService.rejectBooking(id);
      showNotification(
        NotificationType.SUCCESS,
        t('notification.defaultSuccessTitle'),
        t('notification.bookingRejected')
      );
      onRefresh();
    } catch (error: any) {
      console.error('Failed to reject booking:', error);
      showNotification(
        NotificationType.ERROR,
        t('notification.defaultErrorTitle'),
        getErrorMessage(error, t('notification.defaultErrorMessage'))
      );
    } finally {
      setIsActionLoading(false);
    }
  }, [onRefresh, t]);

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
    onChatPress,
    onRefresh,
    onLoadMore,
    hasMore: TAB_TO_FILTER[activeTab] ? rides?.[TAB_TO_FILTER[activeTab]!]?.hasMore : false,
    getTabData,
    drafts,
    mappedRequests,
    hasRequests,
    onMenuPress: () => {},
    onProfilePress: () => {},
    onAcceptRide: onAcceptBooking,
    onRejectRide: onRejectBooking,
    confirmModalConfig,
    hideConfirmModal,
  };
};
