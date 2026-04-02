import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Toggle } from '@/components/atoms/Toggle';
import { Chip } from '@/components/atoms/Chip';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { PreferenceCard } from '@/components/molecules/PreferenceCard';
import { useTranslation } from '@/hooks/useTranslation';
import { useTravelPreferences } from './useTravelPreferences';
import {
  ScreenWrapper,
  HeaderContainer,
  ScrollContainer,
  HeroSection,
  HeroImage,
  HeroTint,
  HeroContent,
  Section,
  SectionTitleWrapper,
  PreferenceItem,
  IconContainer,
  TextWrapper,
  ChipGroup,
  BentoGrid,
  BottomAction,
} from './TravelPreferences.styles';

export const TravelPreferencesScreen: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { 
    preferences, 
    musicOptions,
    togglePreference, 
    setMusicPreference, 
    handleSave,
    goBack 
  } = useTravelPreferences();

  return (
    <ScreenWrapper>
      <HeaderContainer>
        <IconButton icon="arrow-back" variant="surface" onPress={goBack} />
        <Typography variant="title" size="md" weight="bold" color="primary" style={{ marginLeft: 16 }}>
          {t('travelPreferences.headerTitle')}
        </Typography>
      </HeaderContainer>

      <ScrollContainer>
        <HeroSection>
          <HeroImage 
            source={{ uri: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2069' }} 
            resizeMode="cover"
          />
          <HeroTint />
          <HeroContent>
            <Typography variant="display" size="sm" weight="bold" color="on_primary">
              {t('travelPreferences.heroTitle')}
            </Typography>
            <Typography variant="body" size="sm" color="on_primary" style={{ opacity: 0.9, marginTop: 4 }}>
              {t('travelPreferences.heroSubtitle')}
            </Typography>
          </HeroContent>
        </HeroSection>

        <Section>
          <PreferenceItem>
            <IconContainer>
              <Icon name="smoke-free" size={24} color={theme.colors.primary} />
            </IconContainer>
            <TextWrapper>
              <Typography variant="title" size="sm" weight="bold">
                {t('travelPreferences.nonSmoking')}
              </Typography>
              <Typography variant="body" size="sm" color="on_surface_variant">
                {t('travelPreferences.nonSmokingDescr')}
              </Typography>
            </TextWrapper>
            <Toggle value={preferences.nonSmoking} onValueChange={() => togglePreference('nonSmoking')} />
          </PreferenceItem>

          <PreferenceItem>
            <IconContainer color={theme.colors.secondary_container}>
              <Icon name="female" size={24} color={theme.colors.primary} />
            </IconContainer>
            <TextWrapper>
              <Typography variant="title" size="sm" weight="bold">
                {t('travelPreferences.womenOnly')}
              </Typography>
              <Typography variant="body" size="sm" color="on_surface_variant">
                {t('travelPreferences.womenOnlyDescr')}
              </Typography>
            </TextWrapper>
            <Toggle value={preferences.womenOnly} onValueChange={() => togglePreference('womenOnly')} />
          </PreferenceItem>

          <SectionTitleWrapper style={{ marginTop: 24 }}>
            <Icon name="library-music" size={20} color={theme.colors.primary} />
            <Typography variant="label" size="sm" weight="bold" color="primary" style={{ letterSpacing: 1 }}>
              {t('travelPreferences.musicPreference').toUpperCase()}
            </Typography>
          </SectionTitleWrapper>

          <ChipGroup>
            {musicOptions.map(option => (
              <Chip 
                key={option} 
                label={t(`travelPreferences.${option.toLowerCase()}`)} 
                selected={preferences.music === option}
                onPress={() => setMusicPreference(option)}
              />
            ))}
          </ChipGroup>

          <BentoGrid>
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
          </BentoGrid>

          <BottomAction>
            <Button onPress={handleSave} variant="primary">
              {t('travelPreferences.savePreferences')}
            </Button>
          </BottomAction>
        </Section>
      </ScrollContainer>
    </ScreenWrapper>
  );
};

