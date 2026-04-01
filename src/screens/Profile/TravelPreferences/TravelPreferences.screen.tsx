import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from 'atoms/Typography';
import { Toggle } from 'atoms/Toggle';
import { Chip } from 'atoms/Chip';
import { Button } from 'atoms/Button';
import { IconButton } from 'atoms/IconButton';
import { PreferenceCard } from 'molecule/PreferenceCard';

import { useTranslation } from '@/hooks/useTranslation';
import { useTravelPreferences } from './useTravelPreferences';
import {
  Container,
  HeroSection,
  HeroImage,
  HeroContent,
  Section,
  SectionTitleWrapper,
  PreferenceItem,
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
    togglePreference, 
    setMusicPreference, 
    handleSave,
    goBack 
  } = useTravelPreferences();

  const musicOptions = ['Bollywood', 'Pop', 'Jazz', 'Podcast', 'Silence'];

  return (
    <Container>
      <SafeAreaView style={{ backgroundColor: theme.colors.surface }}>
        <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
          <IconButton icon="arrow-back" variant="surface" onPress={goBack} />
          <Typography variant="title" size="md" weight="bold" color="primary" style={{ marginLeft: 16 }}>
            {t('travelPreferences.headerTitle')}
          </Typography>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroSection>
          <HeroImage 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBrVamBTHQbNIgFh7Su6Rpq1fD2TpbBkgAv0cFAZPW0k8Cxp6gXWo79shNEVk7FL2nm0_gtRFKJ0q9yu_s8WScIqvI7cl4v08a3lcitqZw3n3BnUuVuuJQ1PUnALTPMXO1Vw2quNLcyMWySAOuIzIzFY1rUKAJjLS7C2wk_5thO64ywhOxfSUuyJDPcBoBUgTbbUJXVtPB9WrCocWo3VEkAbjPuYTiZT_0wF38tK7ReoQJybI8UfuJJ_UQ24QZoy6Qt3-gqIsDmQKo' }} 
            resizeMode="cover"
          />
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,107,71,0.4)' }} />
          <HeroContent>
            <Typography variant="display" size="sm" weight="bold" color="on_primary_container">
              {t('travelPreferences.heroTitle')}
            </Typography>

            <Typography variant="body" size="sm" color="on_primary_container" style={{ opacity: 0.9, marginTop: 4 }}>
              {t('travelPreferences.heroSubtitle')}
            </Typography>
          </HeroContent>
        </HeroSection>

        <Section>
          <PreferenceItem>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: theme.colors.surface_container, alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
              <Icon name="smoke-free" size={24} color={theme.colors.primary} />
            </View>
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

          <PreferenceItem style={{ borderWidth: 2, borderColor: theme.colors.primary_container + '33' }}>
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: theme.colors.secondary_container, alignItems: 'center', justifyContent: 'center', marginRight: 16 }}>
              <Icon name="female" size={24} color={theme.colors.primary} />
            </View>
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
            <Button 
              onPress={handleSave}
              variant="primary"
            >
              {t('travelPreferences.savePreferences')}
            </Button>
          </BottomAction>

        </Section>
      </ScrollView>
    </Container>
  );
};
