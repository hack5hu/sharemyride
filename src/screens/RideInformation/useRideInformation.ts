import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLocale } from '@/constants/localization';
import { RideData } from '@/screens/AvailableRides/types.d';

export const useRideInformation = (rideId: string) => {
  const navigation = useNavigation();
  const { rideInformation: t } = useLocale();

  // Mock data for the specific ride - in a real app, this would come from a store or API
  const ride: RideData = useMemo(() => ({
    id: rideId,
    driver: {
      name: 'Marcus Chen',
      rating: 4.9,
      rideCount: 124,
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcD29Ytf3xDOG_MrX1H3nJz96sD2Cy31EuCZ6mjI6gd0_0ESrNbcY5xR4iodJTSDDBm3q7XK3mI-r9kgj4ytepN46LQvKmvsRjGE6o3hSMS-yYbs3UibSYHL3BBen7eEyYookE7MrD-NZ6R0VF6f-n5hRe_smUQttjIS0DkWanj-Mg-tKPVXnb6orpP5J5qPQOqmFswOYyYqV3BKo4sUoRw_YStH_mNr3HgCa4JeC9S0cQEwCYzNHi-pC1y3BujFKuEXts01NUpfV3',
      isVerified: true,
    },
    price: 32.50,
    seatsLeft: 2,
    isFrequentCoRider: true,
    timeline: [
      {
        time: '08:30 AM',
        location: 'Greenwich Village, NY',
        type: 'pickup',
        description: 'Starting point',
      },
      {
        time: '09:15 AM',
        location: 'Jersey City Transit Hub',
        type: 'stop',
        description: '5 min stopover',
      },
      {
        time: '10:45 AM',
        location: 'Princeton Campus South',
        type: 'destination',
        description: 'Final destination',
      },
    ],
    features: ['noSmoking', 'ladiesOnly'],
  }), [rideId]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleBook = useCallback(() => {
    (navigation.navigate as any)('SeatSelection');
  }, [navigation]);

  return {
    t,
    handleBack,
    handleBook,
    ride,
  };
};
