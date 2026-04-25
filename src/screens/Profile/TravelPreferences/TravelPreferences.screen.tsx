import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Toggle } from '@/components/atoms/Toggle';
import { Chip } from '@/components/atoms/Chip';
import { Button } from '@/components/atoms/Button';
import { PreferenceCard } from '@/components/molecules/PreferenceCard';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { useTranslation } from '@/hooks/useTranslation';
import { useTravelPreferences } from './useTravelPreferences';
import * as S from './TravelPreferences.styles';

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
    goBack 
  } = useTravelPreferences();

  return (
    <ScreenShell
      title={t('travelPreferences.headerTitle')}
      onBack={goBack}
    >
      <S.ScrollContainer>
        <S.HeroSection>
          <S.HeroImage 
            source={{ uri: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2069' }} 
            resizeMode="cover"
          />
          <S.HeroTint />
          <S.HeroContent>
            <Typography variant="display" size="sm" weight="bold" color="on_primary">
              {t('travelPreferences.heroTitle')}
            </Typography>
            <S.HeroSubtitle>
              {t('travelPreferences.heroSubtitle')}
            </S.HeroSubtitle>
          </S.HeroContent>
        </S.HeroSection>

        <S.Section>
          <S.PreferenceItem>
            <S.IconContainer>
              <Icon name="smoke-free" size={24} color={theme.colors.primary} />
            </S.IconContainer>
            <S.TextWrapper>
              <Typography variant="title" size="sm" weight="bold">
                {t('travelPreferences.nonSmoking')}
              </Typography>
              <Typography variant="body" size="sm" color="on_surface_variant">
                {t('travelPreferences.nonSmokingDescr')}
              </Typography>
            </S.TextWrapper>
            <Toggle value={preferences.nonSmoking} onValueChange={() => togglePreference('nonSmoking')} />
          </S.PreferenceItem>

          <S.PreferenceItem>
            <S.IconContainer color={theme.colors.secondary_container}>
              <Icon name="female" size={24} color={theme.colors.primary} />
            </S.IconContainer>
            <S.TextWrapper>
              <Typography variant="title" size="sm" weight="bold">
                {t('travelPreferences.womenOnly')}
              </Typography>
              <Typography variant="body" size="sm" color="on_surface_variant">
                {t('travelPreferences.womenOnlyDescr')}
              </Typography>
            </S.TextWrapper>
            <Toggle value={preferences.womenOnly} onValueChange={() => togglePreference('womenOnly')} />
          </S.PreferenceItem>

          <S.PreferenceItem>
            <S.IconContainer color={theme.colors.tertiary_container}>
              <Icon name="verified-user" size={24} color={theme.colors.primary} />
            </S.IconContainer>
            <S.TextWrapper>
              <Typography variant="title" size="sm" weight="bold">
                {t('travelPreferences.manualApproval')}
              </Typography>
              <Typography variant="body" size="sm" color={theme.colors.on_surface_variant}>
                {t('travelPreferences.manualApprovalDescr')}
              </Typography>
            </S.TextWrapper>
            <Toggle value={preferences.manualApproval} onValueChange={() => togglePreference('manualApproval')} />
          </S.PreferenceItem>

          <S.MusicSectionHeader>
            <Icon name="library-music" size={20} color={theme.colors.primary} />
            <S.SectionTitleText>
              {t('travelPreferences.musicPreference').toUpperCase()}
            </S.SectionTitleText>
          </S.MusicSectionHeader>

          <S.ChipGroup>
            {musicOptions.map(option => (
              <Chip 
                key={option} 
                label={t(`travelPreferences.${option.toLowerCase()}`)} 
                selected={preferences.music.includes(option)}
                onPress={() => toggleMusicPreference(option)}
              />
            ))}
          </S.ChipGroup>

          <S.BentoGrid>
            <PreferenceCard 
              icon="luggage" 
              title={t('travelPreferences.luggageAllowed')} 
              enabled={preferences.luggage}
              onPress={() => togglePreference('luggage')}
            />
            <PreferenceCard 
              icon="pets" 
              title={t('travelPreferences.petFriendly')} 
              enabled={preferences.pets}
              onPress={() => togglePreference('pets')}
            />
          </S.BentoGrid>

          <S.TimerItem>
            <S.TimerHeader>
              <S.IconContainer>
                <Icon name="timer" size={24} color={theme.colors.primary} />
              </S.IconContainer>
              <S.TextWrapper>
                <Typography variant="title" size="sm" weight="bold">
                  {t('travelPreferences.waitingTime')}
                </Typography>
                <Typography variant="body" size="sm" color={theme.colors.on_surface_variant}>
                  {t('travelPreferences.waitingTimeDescr')}
                </Typography>
              </S.TextWrapper>
            </S.TimerHeader>
            <S.TimerChipGroup>
              {[5, 10, 15, 20].map(mins => (
                <Chip 
                  key={mins} 
                  label={`${mins}m`} 
                  selected={preferences.waitingTime === mins}
                  onPress={() => updateWaitingTime(mins)}
                />
              ))}
            </S.TimerChipGroup>
          </S.TimerItem>

          <S.BottomAction>
            <Button 
              onPress={handleSave} 
              variant="primary"
              loading={isLoading}
              disabled={isLoading}
            >
              {t('travelPreferences.savePreferences')}
            </Button>
          </S.BottomAction>
        </S.Section>
      </S.ScrollContainer>
    </ScreenShell>
  );
};
