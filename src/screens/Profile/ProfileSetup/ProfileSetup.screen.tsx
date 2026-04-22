import React, { useEffect, useMemo } from 'react';
import { BackHandler } from 'react-native';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { InfoBar } from '@/components/molecules/InfoBar';
import { IdentityProfileCard } from '@/components/organisms/IdentityProfileCard';
import { PreferencesSection } from '@/components/organisms/PreferencesSection';
import { ProfileSetupTemplate } from '@/components/templates/ProfileSetupTemplate';
import { useProfileSetup } from './useProfileSetup';
import { HeroSection } from './ProfileSetup.styles';
import { verticalScale } from '@/styles';

export const ProfileSetupScreen: React.FC = () => {
  const { formik, t, handleFieldChange } = useProfileSetup();

  useEffect(() => {
    const backAction = () => true;
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const hero = useMemo(() => (
    <HeroSection>
      <Typography variant="headline" size="lg" weight="bold">
        {t('profileSetup.heroTitle')}
      </Typography>
      <Typography variant="body" size="md" color="on_surface_variant">
        {t('profileSetup.heroSubtitle')}
      </Typography>
    </HeroSection>
  ), [t]);

  const identityCard = useMemo(() => (
    <IdentityProfileCard
      values={formik.values}
      setFieldValue={handleFieldChange}
      errors={formik.errors}
      submitCount={formik.submitCount}
    />
  ), [formik.values, handleFieldChange, formik.errors, formik.submitCount]);

  const preferences = useMemo(() => (
    <PreferencesSection
      values={formik.values}
      setFieldValue={handleFieldChange}
    />
  ), [formik.values, handleFieldChange]);

  const infoBar = useMemo(() => 
    formik.isValid && formik.values.fullName && formik.values.dob ? (
      <InfoBar
        variant="success"
        title={t('profileSetup.almostThere')}
        subtitle={t('profileSetup.identityVerified')}
        style={{ marginTop: verticalScale(8) }}
      />
    ) : null
  , [formik.isValid, formik.values.fullName, formik.values.dob, t]);

  const footer = useMemo(() => (
    <Button
      variant="primary"
      onPress={() => formik.handleSubmit()}
      loading={formik.isSubmitting}
    >
      {t('profileSetup.completeSetup')}
    </Button>
  ), [formik.isSubmitting, formik.handleSubmit, t]);

  return (
    <ProfileSetupTemplate
      hero={hero}
      identityCard={identityCard}
      preferences={preferences}
      infoBar={infoBar}
      footer={footer}
    />
  );
};
