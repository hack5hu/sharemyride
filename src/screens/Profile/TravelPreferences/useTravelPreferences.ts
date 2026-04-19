import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTravelPrefStore } from '@/store/useTravelPrefStore';
import { TravelPreferenceState } from './types';
import { Alert } from 'react-native';

export const useTravelPreferences = () => {
  const navigation = useNavigation();
  const { 
    preferences: storedPrefs, 
    isLoading, 
    syncPreferences, 
    savePreferences 
  } = useTravelPrefStore();

  // Helper to convert comma-separated string to array
  const parseMusic = (musicStr?: string) => {
    if (!musicStr) return ['Pop'];
    return musicStr.split(',').map(s => s.trim()).filter(Boolean);
  };

  const [preferences, setPreferences] = useState<TravelPreferenceState>({
    nonSmoking: storedPrefs?.nonSmoking ?? true,
    womenOnly: storedPrefs?.womenOnly ?? false,
    music: parseMusic(storedPrefs?.musicPreference),
    luggage: storedPrefs?.luggageAllowed ?? true,
    pets: storedPrefs?.petFriendly ?? false,
    manualApproval: storedPrefs?.manualApproval ?? true,
    waitingTime: storedPrefs?.waitingTime ?? 10,
  });

  useEffect(() => {
    syncPreferences();
  }, [syncPreferences]);

  useEffect(() => {
    if (storedPrefs) {
      setPreferences({
        nonSmoking: storedPrefs.nonSmoking,
        womenOnly: storedPrefs.womenOnly,
        music: parseMusic(storedPrefs.musicPreference),
        luggage: storedPrefs.luggageAllowed,
        pets: storedPrefs.petFriendly,
        manualApproval: storedPrefs.manualApproval,
        waitingTime: storedPrefs.waitingTime,
      });
    }
  }, [storedPrefs]);

  const musicOptions = useMemo(() => ['Bollywood', 'Pop', 'Jazz', 'Podcast', 'Silence'], []);

  const togglePreference = useCallback((key: keyof Omit<TravelPreferenceState, 'music' | 'waitingTime'>) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  }, []);

  const toggleMusicPreference = useCallback((genre: string) => {
    setPreferences(prev => {
      const current = prev.music;
      const exists = current.includes(genre);
      let next;
      
      if (exists) {
        // Don't allow empty selection if you want, or just remove
        next = current.filter(g => g !== genre);
      } else {
        next = [...current, genre];
      }
      
      return { ...prev, music: next };
    });
  }, []);

  const updateWaitingTime = useCallback((minutes: number) => {
    setPreferences(prev => ({
      ...prev,
      waitingTime: minutes,
    }));
  }, []);

  const handleSave = useCallback(async () => {
    try {
      await savePreferences({
        nonSmoking: preferences.nonSmoking,
        womenOnly: preferences.womenOnly,
        manualApproval: preferences.manualApproval,
        musicPreference: preferences.music.join(','), // Convert back to string for API
        luggageAllowed: preferences.luggage,
        petFriendly: preferences.pets,
        maxBackSeats: storedPrefs?.maxBackSeats ?? 2,
        waitingTime: preferences.waitingTime,
      });
      Alert.alert('Success', 'Travel preferences updated successfully.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save preferences. Please try again.');
    }
  }, [navigation, preferences, savePreferences, storedPrefs?.maxBackSeats]);

  return {
    preferences,
    musicOptions,
    isLoading,
    togglePreference,
    toggleMusicPreference,
    updateWaitingTime,
    handleSave,
    goBack: () => navigation.goBack(),
  };
};
