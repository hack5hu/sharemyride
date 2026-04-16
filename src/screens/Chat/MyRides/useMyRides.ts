import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types.d';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader';
import { useMyRidesStore, DraftRide } from '@/store/useMyRidesStore';
import { useRidePublishStore } from '@/store/useRidePublishStore';

export const useMyRides = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState<MyRidesTab>('upcoming');
  const { drafts, upcoming, past, clearDrafts, removeDraft } = useMyRidesStore();
  const publishStore = useRidePublishStore();

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
        // Manually apply state fields
        const s = draft.state;
        if (s.startLocation) publishStore.setStartLocation(s.startLocation);
        if (s.destinationLocation) publishStore.setDestinationLocation(s.destinationLocation);
        if (s.middleStops) publishStore.setMiddleStops(s.middleStops);
        if (s.departureDate) publishStore.setDepartureDate(s.departureDate);
        if (s.departureTime) publishStore.setDepartureTime(s.departureTime);
        if (s.seatCount) publishStore.setSeatCount(s.seatCount);
        if (s.vehicleDetails) publishStore.setVehicleDetails(s.vehicleDetails);
        if (s.preferences) publishStore.setPreferences(s.preferences);
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

  const onClearDrafts = useCallback(() => {
    clearDrafts();
  }, [clearDrafts]);

  const formattedDrafts = useMemo(() => {
    return drafts.map((draft) => {
      const start = draft.state.startLocation?.name || 'Unknown';
      const end = draft.state.destinationLocation?.name || 'Unknown';
      const date = draft.state.departureDate ? new Date(draft.state.departureDate).toLocaleDateString() : 'No date';
      
      return {
        id: draft.id,
        title: `${start} to ${end}`,
        subtitle: `Draft • ${date}`,
        savedAt: draft.savedAt,
      };
    });
  }, [drafts]);

  return {
    activeTab,
    onTabChange,
    onAddPress,
    onRidePress,
    onClearDrafts,
    drafts: formattedDrafts,
    upcoming,
    past,
    onMenuPress: () => {},
    onProfilePress: () => {},
    onAcceptRide: () => {},
  };
};
