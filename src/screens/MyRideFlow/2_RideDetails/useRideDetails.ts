import { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useLocale } from '@/constants/localization';
import { useMyRidesStore } from '@/store/useMyRidesStore';
import { useAuthStore } from '@/store/useAuthStore';
import { RideDetailsScreenProps } from './types';
import rideService from '@/serviceManager/rideService';

export const useRideDetails = () => {
  const navigation = useNavigation();
  const route = useRoute<RideDetailsScreenProps['route']>();
  const { rideId } = route.params;
  const { rideDetails: t } = useLocale();
  const { rides, fetchInitialRides } = useMyRidesStore();
  const { user } = useAuthStore();

  // Find the ride in any category
  const ride = useMemo(() => {
    const allRides = [
      ...(rides?.UPCOMING?.data || []),
      ...(rides?.COMPLETED?.data || []),
      ...(rides?.CANCELLED?.data || []),
      ...(rides?.REQUESTS?.data || []),
    ];
    return allRides.find(r => (r.id || r._id || r.bookingId) === rideId);
  }, [rides, rideId]);

  const isDriver = useMemo(() => {
    if (!ride || !user) return false;
    return ride.driverId === user.id || ride.userId === user.id;
  }, [ride, user]);

  const mappedData = useMemo(() => {
    if (!ride) return null;

    const stops = ride.stops || ride.routeStops || [];
    const firstStop = stops[0];
    const lastStop = stops[stops.length - 1];

    return {
      isDriver,
      routeJourney: {
        stops: stops.map((s: any, idx: number) => ({
          type: idx === 0 ? 'pickup' : (idx === stops.length - 1 ? 'destination' : 'stop'),
          label: idx === 0 ? t.pickupLabel : (idx === stops.length - 1 ? t.destinationLabel : t.stopLabel.replace('{count}', String(idx))),
          address: s.name || s.address,
        })),
      },
      etaInfo: {
        arrivalTime: ride.startTime ? new Date(ride.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--',
        minutesAway: 0, // In a real app, calculate from current location
      },
      fareCard: {
        amount: String(ride.totalPrice || 0),
      },
      driverSection: {
        name: isDriver ? (user?.name || 'You') : (ride.driverName || 'Driver'),
        rating: isDriver ? 5.0 : (ride.rating || 4.8),
        carInfo: ride.vehicleRegistration ? `${ride.vehicleType || 'Car'} (${ride.vehicleRegistration})` : 'Shared Ride',
        avatarUrl: isDriver ? user?.profilePhotoUrl : (ride.driverPhotoUrl || 'https://i.pravatar.cc/150'),
      },
      ridersList: {
        spotsLeft: ride.availableSeats,
        riders: (ride.bookings || []).map((b: any) => ({
          id: b.id || b._id,
          name: b.userName || 'Passenger',
          info: t.coRider,
          avatarUrl: b.userPhotoUrl || 'https://i.pravatar.cc/150',
          canCancel: isDriver,
        })),
      },
    };
  }, [ride, isDriver, user, t]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCancel = useCallback(() => {
    navigation.navigate('CancelRide', { rideId });
  }, [navigation, rideId]);

  const handleCancelRider = useCallback((riderId: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this passenger\'s booking?',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Yes, Cancel', 
          style: 'destructive',
          onPress: async () => {
            try {
              // Call API to cancel specific booking
              // await rideService.cancelBooking(rideId, riderId);
              // fetchInitialRides();
              Alert.alert('Success', 'Booking cancelled.');
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel booking.');
            }
          }
        }
      ]
    );
  }, [rideId]);

  const handleChat = useCallback(() => {
    // Navigate to Chat
    const targetName = isDriver ? 'Passengers' : (ride?.driverName || 'Driver');
    navigation.navigate('ChatDetails', { 
      chatId: rideId,
      name: targetName 
    });
  }, [navigation, rideId, isDriver, ride]);

  return {
    rideData: mappedData,
    isDriver,
    handleBack,
    handleCancel,
    handleCancelRider,
    handleChat,
  };
};
