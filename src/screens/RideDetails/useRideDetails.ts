import React, { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLocale } from '@/constants/localization';

export const useRideDetails = () => {
  const navigation = useNavigation();
  const { rideDetails } = useLocale();

  const mockData = useMemo(() => ({
    routeJourney: {
      stops: [
        {
          type: 'pickup' as const,
          label: rideDetails.pickupLabel,
          address: '245 Market St, San Francisco, CA 94105',
        },
        {
          type: 'stop' as const,
          label: rideDetails.stopLabel.replace('{count}', '1'),
          address: 'Mission Dolores Park, SF',
        },
        {
          type: 'destination' as const,
          label: rideDetails.destinationLabel,
          address: 'SFO Terminal 3, San Francisco',
        },
      ],
    },
    etaInfo: {
      arrivalTime: '14:20',
      minutesAway: 12,
    },
    fareCard: {
      amount: '18.50',
    },
    driverSection: {
      name: 'Marcus Chen',
      rating: 4.9,
      carInfo: 'White Tesla Model 3',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp3u7dJKfurAzDhein3avQco6mvRFB5KQ2lpS6ZoAFxHB6o1A9B8UmVFl40FVHERt4YRWDfU0qLtZGMm1AB8VNbvafrJd4_po4WNjznvjbOu-pwsXq29cYxKFCGgtXtsJCzbPtLkpHkLNI8lSIaI23WBZzch3MifR-Fr3GWjcB8CVSg153t1uTKqNPLUVtu5FFZKmEWyQuWhF0QDLyDMbIZs1EvGANyLSSlx2S7wu00oEYMv9_Qz0Kvnr53r9hR5bsiBnf8yXMMMEi',
    },
    ridersList: {
      spotsLeft: 2,
      riders: [
        {
          name: 'Sarah J.',
          info: rideDetails.coRider,
          avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArnA1B-tjz8VjcOfL1i0TPN-_OkdRUca7C_uHpyXTg75Ic_e-5WySL-yPRZJErjj_ZkmJpPgWB27-K4PFRCq2R_7gqa_xMZZIsW3pW1VmHUB8GYYzZumvhLnOaKNwsScbdLKv1Id_tyjMxLCWMqmzQVLrlYV42dhS2MQXTJ84XP0-XiS9qprCrboOVpEBe_jMWwi3rAAEXVyONwhPXGVhLdETLgqLekIvM-HBdd5GJwC_qRZmBu0Mwc432eosKj8AJI6hNE0xD2Slq',
        },
        {
          name: 'David K.',
          info: rideDetails.joiningAt.replace('{stop}', 'Stop 1'),
        }
      ],
    },
  }), [rideDetails]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleCancel = useCallback(() => {
    navigation.navigate('CancelRide' as never);
  }, [navigation]);

  const handleChat = useCallback(() => {
    // Navigate to Chat
    console.log('Chat with driver pressed');
  }, []);

  return {
    mockData,
    handleBack,
    handleCancel,
    handleChat,
  };
};
