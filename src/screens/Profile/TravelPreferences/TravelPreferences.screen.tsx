import React from 'react';
import { useTheme } from 'styled-components/native';
import { useTranslation } from '@/hooks/useTranslation';
import { useTravelPreferences } from './useTravelPreferences';
import { TravelPreferencesTemplate } from '@/components/templates/TravelPreferencesTemplate';

export const TravelPreferencesScreen: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    preferences,
    musicOptions,
    togglePreference,
    toggleMusicPreference,
    updateWaitingTime,
    handleSave,
    isLoading,
    goBack,
  } = useTravelPreferences();

  return (
    <TravelPreferencesTemplate
      preferences={preferences}
      musicOptions={musicOptions}
      togglePreference={togglePreference}
      toggleMusicPreference={toggleMusicPreference}
      updateWaitingTime={updateWaitingTime}
      handleSave={handleSave}
      isLoading={isLoading}
      goBack={goBack}
      t={t}
      theme={theme}
    />
  );
};
