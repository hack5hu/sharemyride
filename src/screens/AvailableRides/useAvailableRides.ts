import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useLocale } from '@/constants/localization';
import { RideData } from './types.d';

export const useAvailableRides = () => {
  const navigation = useNavigation();
  const { availableRides: t, rideFilters: ft } = useLocale();

  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const mockRides: RideData[] = useMemo(() => [
    {
      id: '1',
      driver: {
        name: 'Marcus Chen',
        rating: 4.9,
        rideCount: 128,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpldgjyZRk7lIQ5_i6hD2arQr34pQvswoZpXv1Ss6sDjZHhGCCwQA2_xu8cBYBLauapvQScih__WHlccYGxB5panFT4aD0sqY6q4eCwsqTGd8cRBt17NEQX9FCZBiIyXbXpG2Yv4OUFdacaWsO792ExHRSrgMDdjae5KlL-ZOrWOgPwyN80vXWfygb_qGjc_77NMjmTx4eTxTIBV59wc-tjjzxp9p5DtmC82rIcp71nESWjkdug3abN5-_AjO-mmlvB6yVe6rurF6J',
        isVerified: true,
      },
      price: 14.50,
      timeline: [
        { time: '08:00', location: 'Downtown Hub', subLocation: 'Gate 4, Main Entrance', type: 'pickup' },
        { time: '08:35', location: 'Central Park West', type: 'stop' },
        { time: '09:10', location: 'North Green Valley', subLocation: 'Tech Park Building C', type: 'destination' },
      ],
      features: ['noSmoking'],
      seatsLeft: 2,
      isFrequentCoRider: true,
    },
    {
      id: '2',
      driver: {
        name: 'Sarah Jenkins',
        rating: 4.8,
        rideCount: 42,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRWk874kvU9NLz3P5Q7OnxeGFJC8efdZKrGxiehn_1QdNYQv_RT_5fdotRhuUmDzo5W6LjG9O6m6zLgQ0-wYlib0A1jJWze3J4CNEfp_FQwSA1qy02yiIWOicvHGJjQRwsUfbcXmxbECEsKRzvrznotQUX_sy1_660jbXoINobD9HqQE8jucbTGEjfyU57r0y3uhvD7usThnCrkMu83qZQDC8mNmwUx8LqsZpz8UyKNXm97-Lyaj8NmNcVSnnFdF3eYTFlu4cUHDzJ',
        isVerified: false,
      },
      price: 12.00,
      timeline: [
        { time: '08:30', location: 'Downtown Hub', subLocation: 'Passenger Pickup Zone', type: 'pickup' },
        { time: '09:15', location: 'North Green Valley', subLocation: 'Valley Residential Gate', type: 'destination' },
      ],
      features: ['ladiesOnly', 'noSmoking'],
      seatsLeft: 3,
    },
    {
      id: '3',
      driver: {
        name: 'Robert Wilson',
        rating: 4.7,
        rideCount: 210,
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCPkcb02NTwf6lh8IFhrsXBXCy4MGYEVOvwgDq4qC_Zcg9gIUQgId-jx8PbQupHaSH4Lz7lyvSafyECCXGav6D56WL9Sr8PGrRnQuIDJdS9zouBnYZ1h7ITk7GC9MqbFL7foxye83a9Ct1jc0vdjavhfemFYC7QN7x_LRrrzUi2QpEeTABaLSG_CWuIlGv0RiqAaAwdJYTie_V-4los7rivy4RE8lwn0IZx1JMEvbluAkl3Hfh4KdmjRR-TbWq5_22CX4yQ6OAvMZr',
        isVerified: false,
      },
      price: 9.00,
      timeline: [
        { time: '09:00', location: 'Main Station', subLocation: 'Bus Terminal A', type: 'pickup' },
        { time: '09:45', location: 'Green Valley Square', subLocation: 'South Entrance', type: 'destination' },
      ],
      features: [],
      seatsLeft: 1,
    }
  ], []);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleRideSelect = useCallback((rideId: string) => {
    navigation.navigate('RideInformation' as any, { rideId });
  }, [navigation]);

  const handleOpenFilters = useCallback(() => {
    setIsFilterModalOpen(true);
  }, []);

  const handleCloseFilters = useCallback(() => {
    setIsFilterModalOpen(false);
  }, []);

  const toggleFilter = useCallback((filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedFilters([]);
  }, []);

  const handleViewDetails = useCallback((rideId: string) => {
    console.log('Viewing details:', rideId);
  }, []);

  return {
    mockRides,
    selectedFilters,
    isFilterModalOpen,
    toggleFilter,
    handleOpenFilters,
    handleCloseFilters,
    handleClearFilters,
    handleBack,
    handleRideSelect,
    handleViewDetails,
    t,
    ft,
  };
};
