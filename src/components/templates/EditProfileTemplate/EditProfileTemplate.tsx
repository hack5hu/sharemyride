import React from 'react';
import { Platform } from 'react-native';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Input } from '@/components/atoms/Input';
import { DobInput } from '@/components/molecules/DobInput';
import { GenderSelector } from '@/components/molecules/GenderSelector';
import { Toast } from '@/components/molecules/Toast';
import { Button } from '@/components/atoms/Button';
import { EditProfileTemplateProps } from './types.d';
import * as S from './EditProfileTemplate.styles';

export const EditProfileTemplate: React.FC<EditProfileTemplateProps> = ({
  formik,
  loading,
  showSuccess,
  handleCloseSuccess,
  navigation,
  t,
}) => {
  return (
    <ScreenShell
      title={t('editProfile.headerTitle')}
      onBack={() => navigation.goBack()}
    >
      <S.MainWrapper
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
      >
        <S.ScrollContent
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <S.Content>
            {showSuccess && (
              <Toast
                message={t('editProfile.successMessage')}
                type="success"
                isVisible={showSuccess}
                onHide={handleCloseSuccess}
              />
            )}

            <S.FormFields>
              <Input
                label={t('editProfile.fullNameLabel')}
                placeholder={t('editProfile.fullNamePlaceholder')}
                value={formik.values.fullName}
                onChangeText={formik.handleChange('fullName')}
                error={
                  formik.touched.fullName ? formik.errors.fullName : undefined
                }
              />

              <Input
                label={t('editProfile.phoneLabel')}
                placeholder={t('editProfile.phonePlaceholder')}
                value={formik.values.phone}
                editable={false}
                keyboardType="phone-pad"
                error={formik.touched.phone ? formik.errors.phone : undefined}
              />

              <DobInput
                label={t('editProfile.dobLabel')}
                value={formik.values.dob}
                onValueChange={val => formik.setFieldValue('dob', val)}
                onBlur={() => formik.setFieldTouched('dob', true)}
                error={
                  formik.touched.dob ? (formik.errors.dob as string) : undefined
                }
              />

              <GenderSelector
                label={t('editProfile.genderLabel')}
                value={formik.values.gender}
                onValueChange={val => formik.setFieldValue('gender', val)}
              />

              <Input
                label={t('editProfile.bioLabel')}
                placeholder={t('editProfile.bioPlaceholder')}
                value={formik.values.bio}
                onChangeText={formik.handleChange('bio')}
                multiline
                numberOfLines={4}
                error={formik.touched.bio ? formik.errors.bio : undefined}
              />
            </S.FormFields>
          </S.Content>
        </S.ScrollContent>
      </S.MainWrapper>
      <S.SaveButtonGradient>
        <Button onPress={() => formik.handleSubmit()} disabled={loading}>
          {loading ? 'Saving...' : t('editProfile.saveChanges')}
        </Button>
      </S.SaveButtonGradient>
    </ScreenShell>
  );
};
