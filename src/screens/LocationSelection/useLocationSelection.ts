import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'LocationSelection'>;

export const useLocationSelection = () => {
  const navigation = useNavigation<NavigationProp>();
  const [startLocationName, setStartLocationName] = useState<string>('');
  const [destinationLocationName, setDestinationLocationName] = useState<string>('');

  const handlePressStart = useCallback(() => {
    // Navigate to a real picker or map screen for the start point
    // e.g. navigation.navigate('LocationPicker', { type: 'start' })
    console.log('Navigate to Start Location Picker');
  }, []);

  const handlePressDestination = useCallback(() => {
    // Navigate to a real picker or map screen for destination
    // e.g. navigation.navigate('LocationPicker', { type: 'destination' })
    console.log('Navigate to Destination Picker');
  }, []);

  const handleContinue = useCallback(() => {
    console.log('Continue with locations:', { startLocationName, destinationLocationName });
    // Navigate to next step
  }, [startLocationName, destinationLocationName]);

  // Optionally set these manually for demonstration or integration later
  const canContinue = !!startLocationName && !!destinationLocationName;

  return {
    startLocationName,
    destinationLocationName,
    handlePressStart,
    handlePressDestination,
    handleContinue,
    canContinue,
  };
};
