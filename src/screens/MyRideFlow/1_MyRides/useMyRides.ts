import { useState, useCallback, useMemo, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types.d';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader';
import { useMyRidesStore, RideCategory } from '@/store/useMyRidesStore';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import rideService from '@/serviceManager/rideService';

const TAB_TO_FILTER: Record<string, RideCategory | null> = {
  upcoming: 'UPCOMING',
  completed: 'COMPLETED',
  ongoing: 'ONGOING',
  drafts: null,
};

export const useMyRides = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState<MyRidesTab>('upcoming');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { 
    drafts, 
    rides,
    clearDrafts, 
    removeDraft, 
    setRides,
    appendRides,
    setPage,
  } = useMyRidesStore();
  
  const publishStore = useRidePublishStore();

  const fetchCategoryRides = useCallback(async (category: RideCategory, page: number = 0, append: boolean = false) => {
    if (page === 0) setIsLoading(true);
    try {
      const response = await rideService.getMyRides(category, page, 15);
      const data = response.data || response; // Handle both direct data and wrapped in .data
      const hasMore = data.length >= 15;

      if (append) {
        appendRides(category, data, hasMore);
      } else {
        setRides(category, data, hasMore);
      }
    } catch (error) {
      console.error(`Failed to fetch ${category} rides:`, error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [setRides, appendRides]);

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
    if (filter) {
      const categoryState = rides[filter];
      if (categoryState.hasMore && !isLoading) {
        const nextPage = categoryState.page + 1;
        setPage(filter, nextPage);
        fetchCategoryRides(filter, nextPage, true);
      }
    }
  }, [activeTab, rides, isLoading, fetchCategoryRides, setPage]);

  const onTabChange = useCallback((tab: MyRidesTab) => {
    setActiveTab(tab);
  }, []);

  const onAddPress = useCallback(() => {
    publishStore.clearPublishState();
    navigation.navigate('LocationSelection', { flow: 'publish' });
  }, [navigation, publishStore]);

  const onRidePress = useCallback((rideId: string) => {
    if (rideId.startsWith('draft-')) {
      const draft = drafts.find((d) => d.id === rideId);
      if (draft) {
        publishStore.clearPublishState();
        publishStore.setEditingDraftId(draft.id);
        const s = draft.state;
        if (s.startLocation) publishStore.setStartLocation(s.startLocation);
        if (s.destinationLocation) publishStore.setDestinationLocation(s.destinationLocation);
        if (s.middleStops) publishStore.setMiddleStops(s.middleStops);
        if (s.departureDate) publishStore.setDepartureDate(s.departureDate);
        if (s.departureTime) publishStore.setDepartureTime(s.departureTime);
        if (s.seatCount) publishStore.setSeatCount(s.seatCount);
        if (s.selectedSeatIds) publishStore.setSelectedSeatIds(s.selectedSeatIds);
        if (s.publishVehicleType) publishStore.setPublishVehicleType(s.publishVehicleType);
        if (s.vehicleDetails) publishStore.setVehicleDetails(s.vehicleDetails);
        if (s.preferences) publishStore.setPreferences(s.preferences);
        if (s.routeDetails) publishStore.setRouteDetails(s.routeDetails);
        if (s.selectedRoute) publishStore.setSelectedRoute(s.selectedRoute);
        if (s.price !== undefined) {
          publishStore.setPricing({
            price: s.price,
            premiumEnabled: s.premiumEnabled,
            premiumPercentage: s.premiumPercentage,
            segmentPrices: s.segmentPrices || {},
          });
        }
        if (s.requestType) publishStore.setRequestType(s.requestType);
        navigation.navigate('SummaryPublish');
      }
    } else {
      navigation.navigate('RideDetails', { rideId });
    }
  }, [navigation, drafts, publishStore]);

  const onRemoveDraft = useCallback((id: string) => {
    Alert.alert(
      'Delete Draft',
      'Are you sure you want to remove this draft?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => removeDraft(id) }
      ]
    );
  }, [removeDraft]);

  const onCancelRide = useCallback((id: string | number) => {
    Alert.alert(
      'Cancel Ride',
      'Are you sure you want to cancel this published ride? This cannot be undone.',
      [
        { text: 'Keep Ride', style: 'cancel' },
        { 
          text: 'Cancel Ride', 
          style: 'destructive', 
          onPress: async () => {
            try {
              await rideService.cancelRide(id);
              fetchInitialRides();
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel ride. Please try again.');
            }
          } 
        }
      ]
    );
  }, [fetchInitialRides]);

  const onClearDrafts = useCallback(() => {
    Alert.alert(
      'Clear All Drafts',
      'This will remove all your saved ride drafts.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: () => clearDrafts() }
      ]
    );
  }, [clearDrafts]);

  const formatRide = (ride: any, type: 'upcoming' | 'completed' | 'ongoing') => ({
    id: ride.id || ride._id,
    title: `${ride.routeStops?.[0]?.name || 'Start'} to ${ride.routeStops?.[ride.routeStops.length - 1]?.name || 'End'}`,
    subtitle: `${new Date(ride.startTime).toLocaleDateString()} • ${new Date(ride.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    price: `₹${ride.routeStops?.reduce((acc: number, s: any) => acc + (s.priceFromPreviousStop || 0), 0) || 0}`,
    icon: type === 'completed' ? 'check-circle' : type === 'ongoing' ? 'play-circle-outline' : 'directions-car',
    type
  });

  const formattedDrafts = useMemo(() => {
    return drafts.map((draft) => {
      const start = draft.state.startLocation?.name || 'Unknown';
      const end = draft.state.destinationLocation?.name || 'Unknown';
      const dateStr = draft.state.departureDate ? new Date(draft.state.departureDate).toLocaleDateString() : 'No date';
      return {
        id: draft.id,
        title: `${start} to ${end}`,
        subtitle: `Draft • ${dateStr}`,
        savedAt: draft.savedAt,
      };
    });
  }, [drafts]);

  const currentRides = useMemo(() => {
    const filter = TAB_TO_FILTER[activeTab];
    if (!filter) return formattedDrafts;
    
    return rides[filter].data.map(r => formatRide(r, activeTab as any));
  }, [activeTab, rides, formattedDrafts]);

  return {
    activeTab,
    isLoading,
    isRefreshing,
    onTabChange,
    onAddPress,
    onRidePress,
    onRemoveDraft,
    onCancelRide,
    onClearDrafts,
    onRefresh,
    onLoadMore,
    hasMore: TAB_TO_FILTER[activeTab] ? rides[TAB_TO_FILTER[activeTab]!].hasMore : false,
    currentRides,
    drafts: formattedDrafts,
    onMenuPress: () => {},
    onProfilePress: () => {},
    onAcceptRide: () => {},
  };
};
