import { useState, useCallback, useMemo, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types.d';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader';
import { useMyRidesStore } from '@/store/useMyRidesStore';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import rideService from '@/serviceManager/rideService';

export const useMyRides = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isFocused = useIsFocused();
  const [activeTab, setActiveTab] = useState<MyRidesTab>('upcoming');
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    drafts, 
    upcoming, 
    past, 
    clearDrafts, 
    removeDraft, 
    setUpcoming, 
    setPast 
  } = useMyRidesStore();
  
  const publishStore = useRidePublishStore();

  const fetchRides = useCallback(async () => {
    setIsLoading(true);
    try {
      const allRides = await rideService.getMyRides();
      const now = new Date();
      
      const upcomingRides = allRides.filter((r: any) => new Date(r.startTime) >= now);
      const completedRides = allRides.filter((r: any) => new Date(r.startTime) < now);
      
      setUpcoming(upcomingRides);
      setPast(completedRides);
    } catch (error) {
      console.error('Failed to sync rides:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setUpcoming, setPast]);

  useEffect(() => {
    if (isFocused) {
      fetchRides();
    }
  }, [isFocused, fetchRides]);

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
        // Resume draft: load state into publish store
        publishStore.clearPublishState();
        
        // Mark as being edited
        publishStore.setEditingDraftId(draft.id);

        // Manually apply state fields
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
              fetchRides(); // Refresh list
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel ride. Please try again.');
            }
          } 
        }
      ]
    );
  }, [fetchRides]);

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

  const formattedUpcoming = useMemo(() => {
    return upcoming.map((ride: any) => ({
      id: ride.id || ride._id,
      title: `${ride.routeStops[0]?.name || 'Start'} to ${ride.routeStops[ride.routeStops.length - 1]?.name || 'End'}`,
      subtitle: `${new Date(ride.startTime).toLocaleDateString()} • ${new Date(ride.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      price: `₹${ride.routeStops.reduce((acc: number, s: any) => acc + (s.priceFromPreviousStop || 0), 0)}`,
      icon: 'directions-car',
      type: 'upcoming'
    }));
  }, [upcoming]);

  const formattedPast = useMemo(() => {
    return past.map((ride: any) => ({
      id: ride.id || ride._id,
      title: `${ride.routeStops[0]?.name || 'Start'} to ${ride.routeStops[ride.routeStops.length - 1]?.name || 'End'}`,
      subtitle: `${new Date(ride.startTime).toLocaleDateString()} • Completed`,
      price: `₹${ride.routeStops.reduce((acc: number, s: any) => acc + (s.priceFromPreviousStop || 0), 0)}`,
      icon: 'check-circle',
      type: 'completed'
    }));
  }, [past]);

  return {
    activeTab,
    isLoading,
    onTabChange,
    onAddPress,
    onRidePress,
    onRemoveDraft,
    onCancelRide,
    onClearDrafts,
    drafts: formattedDrafts,
    upcoming: formattedUpcoming,
    past: formattedPast,
    onMenuPress: () => {},
    onProfilePress: () => {},
    onAcceptRide: () => {},
  };
};
