import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TravelPreferenceState } from './types';

export const useTravelPreferences = () => {
  const navigation = useNavigation();
  const [preferences, setPreferences] = useState<TravelPreferenceState>({
    nonSmoking: true,
    womenOnly: false,
    music: 'Bollywood',
    luggage: true,
    pets: false,
  });

  const togglePreference = useCallback((key: keyof Omit<TravelPreferenceState, 'music'>) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const setMusicPreference = useCallback((music: string) => {
    setPreferences(prev => ({
      ...prev,
      music,
    }));
  }, []);

  const handleSave = useCallback(() => {
    // In a real app, this would call the API service
    // For now, we'll navigate back
    navigation.goBack();
  }, [navigation, preferences]);

  return {
    preferences,
    togglePreference,
    setMusicPreference,
    handleSave,
    goBack: () => navigation.goBack(),
  };
};
