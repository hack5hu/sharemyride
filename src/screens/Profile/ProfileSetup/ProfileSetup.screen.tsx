import React from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { IconButton } from '@/components/atoms/IconButton';
import { InfoBar } from '@/components/molecules/InfoBar';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { IdentityProfileCard } from '@/components/organisms/IdentityProfileCard';
import { PreferencesSection } from '@/components/organisms/PreferencesSection';
import { useProfileSetup } from './useProfileSetup';
import {
  ContentContainer,
  HeroSection,
  Footer,
  VersionText,
} from './ProfileSetup.styles';

export const ProfileSetupScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { formik, t } = useProfileSetup();

  return (
    <ScreenShell
      title={t('profileSetup.headerTitle')}
      onBack={() => navigation.goBack()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <ContentContainer>
            <HeroSection>
              <Typography variant="headline" size="lg" weight="bold">
                {t('profileSetup.heroTitle')}
              </Typography>
              <Typography variant="body" size="md" color="on_surface_variant">
                {t('profileSetup.heroSubtitle')}
              </Typography>
            </HeroSection>

           

            <IdentityProfileCard
              values={formik.values}
              setFieldValue={formik.setFieldValue}
              errors={formik.errors}
            />

            <PreferencesSection
              values={formik.values}
              setFieldValue={formik.setFieldValue}
            />

            {formik.isValid && formik.values.fullName && formik.values.dob && (
              <InfoBar
                variant="success"
                title={t('profileSetup.almostThere')}
                subtitle={t('profileSetup.identityVerified')}
                style={{ marginTop: 8 }}
              />
            )}
            {formik.submitCount > 0 && !formik.isValid && (
              <InfoBar
                variant="error"
                title={t('profileSetup.dobRequiredError')}
              />
            )}

            <Footer>
              <Button
                variant="primary"
                onPress={() => formik.handleSubmit()}
                style={{ marginTop: 16 }}
              >
                {t('profileSetup.completeSetup')}
              </Button>
              <VersionText>
                {t('profileSetup.footerVersion')}
              </VersionText>
            </Footer>
          </ContentContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenShell>
  );
};
