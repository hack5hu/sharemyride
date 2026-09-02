import React from 'react';
import { useTheme } from 'styled-components/native';
import { TravelPreferencesTemplate } from '@/components/templates/TravelPreferencesTemplate';
import { useTranslation } from '@/hooks/useTranslation';
import { useTravelPreferences } from './useTravelPreferences';

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
