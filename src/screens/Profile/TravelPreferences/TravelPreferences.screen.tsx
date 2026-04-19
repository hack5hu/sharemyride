import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Toggle } from '@/components/atoms/Toggle';
import { Chip } from '@/components/atoms/Chip';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { PreferenceCard } from '@/components/molecules/PreferenceCard';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { useTranslation } from '@/hooks/useTranslation';
import { useTravelPreferences } from './useTravelPreferences';
import {
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

          <PreferenceItem>
            <IconContainer color={theme.colors.tertiary_container}>
              <Icon name="verified-user" size={24} color={theme.colors.primary} />
            </IconContainer>
            <TextWrapper>
              <Typography variant="title" size="sm" weight="bold">
                {t('travelPreferences.manualApproval')}
              </Typography>
              <Typography variant="body" size="sm" color={theme.colors.on_surface_variant}>
                {t('travelPreferences.manualApprovalDescr')}
              </Typography>
            </TextWrapper>
            <Toggle value={preferences.manualApproval} onValueChange={() => togglePreference('manualApproval')} />
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
                selected={preferences.music.includes(option)}
                onPress={() => toggleMusicPreference(option)}
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

          <PreferenceItem style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IconContainer>
                <Icon name="timer" size={24} color={theme.colors.primary} />
              </IconContainer>
              <TextWrapper>
                <Typography variant="title" size="sm" weight="bold">
                  {t('travelPreferences.waitingTime')}
                </Typography>
                <Typography variant="body" size="sm" color={theme.colors.on_surface_variant}>
                  {t('travelPreferences.waitingTimeDescr')}
                </Typography>
              </TextWrapper>
            </View>
            <ChipGroup style={{ marginBottom: 0, marginTop: 4 }}>
              {[5, 10, 15, 20].map(mins => (
                <Chip 
                  key={mins} 
                  label={`${mins}m`} 
                  selected={preferences.waitingTime === mins}
                  onPress={() => updateWaitingTime(mins)}
                />
              ))}
            </ChipGroup>
          </PreferenceItem>

          <BottomAction>
            <Button 
              onPress={handleSave} 
              variant="primary"
              loading={isLoading}
              disabled={isLoading}
            >
              {t('travelPreferences.savePreferences')}
            </Button>
          </BottomAction>
        </Section>
      </ScrollContainer>
    </ScreenShell>
  );
};

