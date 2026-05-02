import React from 'react';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useEditProfile } from './useEditProfile';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Typography } from '@/components/atoms/Typography';
import { IconButton } from '@/components/atoms/IconButton';
import { Avatar } from '@/components/atoms/Avatar';
import { Input } from '@/components/atoms/Input';
import { DatePickerInput } from '@/components/molecules/DatePickerInput';
import { GenderSelector } from '@/components/molecules/GenderSelector';
import { Toast } from '@/components/molecules/Toast';
import * as S from './EditProfile.styles';
import { Button } from '@/components/atoms/Button';

export const EditProfileScreen: React.FC = () => {
  const theme = useTheme();
  const {
    formik,
    loading,
    showSuccess,
    handleCloseSuccess,
    handleUpdateAvatar,
    navigation,
    t,
  } = useEditProfile();

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

            <S.AvatarSection>
              <S.AvatarWrapper>
                <Avatar
                  size="xl"
                  source={formik.values.avatarUri ? { uri: formik.values.avatarUri } : undefined}
                  border
                />
                <S.EditButton activeOpacity={0.8} onPress={handleUpdateAvatar}>
                  <Icon name="edit" size={18} color={theme.colors.on_primary} />
                </S.EditButton>
              </S.AvatarWrapper>

              <S.UpdatePhotoLabel>
                {t('editProfile.updatePhoto')}
              </S.UpdatePhotoLabel>
            </S.AvatarSection>

            <S.FormFields>
              <Input
                label={t('editProfile.fullNameLabel')}
                placeholder={t('editProfile.fullNamePlaceholder')}
                value={formik.values.fullName}
                onChangeText={formik.handleChange('fullName')}
                error={formik.touched.fullName ? formik.errors.fullName : undefined}
              />

              <Input
                label={t('editProfile.emailLabel')}
                placeholder={t('editProfile.emailPlaceholder')}
                value={formik.values.email}
                editable={false}
                keyboardType="email-address"
                autoCapitalize="none"
                error={formik.touched.email ? formik.errors.email : undefined}
              />

              <Input
                label={t('editProfile.phoneLabel')}
                placeholder={t('editProfile.phonePlaceholder')}
                value={formik.values.phone}
                editable={false}
                keyboardType="phone-pad"
                error={formik.touched.phone ? formik.errors.phone : undefined}
              />

              <S.Row>
                <S.Column>
                  <DatePickerInput
                    label={t('editProfile.dobLabel')}
                    value={formik.values.dob}
                    onDateChange={(date) => formik.setFieldValue('dob', date)}
                    error={formik.touched.dob ? formik.errors.dob as string : undefined}
                  />
                </S.Column>
              </S.Row>

              <GenderSelector
                label={t('editProfile.genderLabel')}
                value={formik.values.gender}
                onValueChange={(val) => formik.setFieldValue('gender', val)}
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
        <Button
          onPress={() => formik.handleSubmit()}
          disabled={loading}
        >
          {loading ? 'Saving...' : t('editProfile.saveChanges')}
        </Button>
      </S.SaveButtonGradient>
    </ScreenShell>
  );
};
