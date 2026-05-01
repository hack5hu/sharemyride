import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types.d';
import { useMyRidesStore } from '@/store/useMyRidesStore';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import rideService from '@/serviceManager/rideService';
import { useTranslation } from '@/hooks/useTranslation';

export const useMyRidesActions = (fetchInitialRides: () => void) => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { drafts, clearDrafts, removeDraft } = useMyRidesStore();
  const publishStore = useRidePublishStore();

  const restoreDraftToStore = useCallback((draftState: any) => {
    const s = draftState;
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
  }, [publishStore]);

  const onRidePress = useCallback((rideId: string) => {
    if (rideId.startsWith('draft-')) {
      const draft = drafts.find((d) => d.id === rideId);
      if (draft) {
        publishStore.clearPublishState();
        publishStore.setEditingDraftId(draft.id);
        restoreDraftToStore(draft.state);
        navigation.navigate('SummaryPublish');
      }
    } else {
      navigation.navigate('RideDetails', { rideId });
    }
  }, [navigation, drafts, publishStore, restoreDraftToStore]);

  const onRemoveDraft = useCallback((id: string) => {
    Alert.alert(t('myRides.deleteDraftAlertTitle'), t('myRides.deleteDraftAlertMsg'), [
      { text: t('myRides.deleteDraftCancel'), style: 'cancel' },
      { text: t('myRides.deleteDraftConfirm'), style: 'destructive', onPress: () => removeDraft(id) }
    ]);
  }, [removeDraft, t]);

  const onCancelRide = useCallback((id: string | number) => {
    Alert.alert(t('myRides.cancelRideAlertTitle'), t('myRides.cancelRideAlertMsg'), [
      { text: t('myRides.cancelRideKeep'), style: 'cancel' },
      { 
        text: t('myRides.cancelRideConfirm'), 
        style: 'destructive', 
        onPress: async () => {
          try {
            await rideService.cancelRide(id);
            fetchInitialRides();
          } catch (error) {
            Alert.alert('Error', 'Failed to cancel ride.');
          }
        } 
      }
    ]);
  }, [fetchInitialRides, t]);

  const onClearDrafts = useCallback(() => {
    Alert.alert(t('myRides.clearDraftsAlertTitle'), t('myRides.clearDraftsAlertMsg'), [
      { text: t('myRides.clearDraftsCancel'), style: 'cancel' },
      { text: t('myRides.clearDraftsConfirm'), style: 'destructive', onPress: () => clearDrafts() }
    ]);
  }, [clearDrafts, t]);

  return { onRidePress, onRemoveDraft, onCancelRide, onClearDrafts, drafts };
};
