import React, { useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
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
  const { formik, t } = useProfileSetup();

  // Prevent hardware back button on Android to enforce mandatory flow
  useEffect(() => {
    const backAction = () => {
      // Return true to prevent default back action
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ScreenShell>
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

            <Footer>
              <Button
                variant="primary"
                onPress={() => formik.handleSubmit()}
                style={{ marginTop: 16 }}
                loading={formik.isSubmitting}
              >
                {t('profileSetup.completeSetup')}
              </Button>
            </Footer>
          </ContentContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenShell>
  );
};
