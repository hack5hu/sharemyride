import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { DobInput } from '../../molecules/DobInput';
import { Surface } from '../../atoms/Surface';
import { Typography } from '../../atoms/Typography';
import { Input } from '../../atoms/Input';
import { AvatarPicker } from '../../molecules/AvatarPicker';
import { GenderSelector } from '../../molecules/GenderSelector';
import { HeaderRow, InfoContainer, FormContainer } from './IdentityProfileCard.styles';
import { useTranslation } from '@/hooks/useTranslation';
// Date utilities removed as they are no longer needed by DatePicker

export interface IdentityProfileCardProps {
  values: any;
  setFieldValue: (field: string, value: any) => void;
  errors?: any;
  touched?: any;
  setFieldTouched?: (field: string, touched?: boolean) => void;
  submitCount?: number;
  maxDate?: Date;
  disabled?: boolean;
}

export const IdentityProfileCard: React.FC<IdentityProfileCardProps> = React.memo(({
  values,
  setFieldValue,
  errors,
  touched = {},
  setFieldTouched,
  submitCount = 0,
  disabled,
}) => {
  const { t } = useTranslation();
  const showError = submitCount > 0;

  return (
    <Surface elevation="lowest" rounded="md" padding="lg" >
      <HeaderRow style={{ opacity: disabled ? 0.6 : 1 }}>
        <AvatarPicker
          onImageSelected={(asset) => setFieldValue('profileImage', asset)}
          uri={values.profileImage?.uri}
          disabled={disabled}
          showAddText={true}
        />
        <InfoContainer>
          <Typography variant="title" size="lg" weight="bold">
            {t('profileSetup.identityProfile')}
          </Typography>
          <Typography
            variant="label"
            size="sm"
            weight="bold"
            color="on_surface_variant"
            style={{ textTransform: 'uppercase', letterSpacing: 1.5 }}
          >
            {t('profileSetup.publicPresence')}
          </Typography>
        </InfoContainer>
      </HeaderRow>

      <FormContainer>
        <Input
          label={t('profileSetup.fullNameLabel')}
          value={values.fullName}
          onChangeText={(text) => setFieldValue('fullName', text)}
          onBlur={() => setFieldTouched?.('fullName', true)}
          placeholder={t('profileSetup.fullNamePlaceholder')}
          error={(submitCount > 0 || touched.fullName) ? errors?.fullName : undefined}
          required
          editable={!disabled}
        />

        <DobInput
          label={t('profileSetup.dobLabel')}
          value={values.dob}
          onValueChange={(val) => setFieldValue('dob', val)}
          onBlur={() => setFieldTouched?.('dob', true)}
          error={(submitCount > 0 || touched.dob) ? errors?.dob : undefined}
          required
          disabled={disabled}
        />

        <GenderSelector
          label={t('profileSetup.genderLabel')}
          value={values.gender}
          onValueChange={(val) => {
            setFieldValue('gender', val);
            setFieldTouched?.('gender', true);
          }}
          error={(submitCount > 0 || touched.gender) ? errors?.gender : undefined}
          disabled={disabled}
        />
      </FormContainer>
    </Surface>
  );
});

