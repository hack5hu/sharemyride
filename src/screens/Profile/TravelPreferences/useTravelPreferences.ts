import { useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { TravelPreferenceState } from './types';

export const useTravelPreferences = () => {
  const navigation = useNavigation();
  const { preferences: storedPrefs, setPreferences: setStoredPrefs } = useRidePublishStore();

  const [preferences, setPreferences] = useState<TravelPreferenceState>({
    nonSmoking: storedPrefs?.nonSmoking ?? true,
    womenOnly: storedPrefs?.womenOnly ?? false,
    music: storedPrefs?.music ?? 'Bollywood',
    luggage: storedPrefs?.luggage ?? true,
    pets: storedPrefs?.pets ?? false,
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
    setStoredPrefs(preferences);
    console.log('Saving preferences:', preferences);
    navigation.goBack();
  }, [navigation, preferences, setStoredPrefs]);


  return {
    preferences,
    musicOptions,
    togglePreference,
    setMusicPreference,
    handleSave,
    goBack: () => navigation.goBack(),
  };
};

