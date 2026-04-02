import { useState, useCallback, useMemo } from 'react';
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

  const musicOptions = useMemo(() => ['Bollywood', 'Pop', 'Jazz', 'Podcast', 'Silence'], []);


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
    console.log('Saving preferences:', preferences);
    navigation.goBack();
  }, [navigation, preferences]);


  return {
    preferences,
    musicOptions,
    togglePreference,
    setMusicPreference,
    handleSave,
    goBack: () => navigation.goBack(),
  };
};

