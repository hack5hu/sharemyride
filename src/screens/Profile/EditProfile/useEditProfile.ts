import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useState, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  ProfileUpdateData,
  UserService,
} from '@/serviceManager/UserService';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/store/useAuthStore';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';
import { Logger } from '@/utils/logger';

export interface EditProfileFormValues {
  fullName: string;
  phone: string;
  dob: string;
  gender: string;
  bio: string;
  avatarUri: string;
}

export const useEditProfile = () => {
  const { t } = useTranslation();
  const navigation = useAppNavigation();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user, fetchProfile } = useAuthStore();

  const formattedDob = useMemo(() => {
    if (!user?.dateOfBirth) return '';
    if (user.dateOfBirth.includes('/')) {
      return user.dateOfBirth;
    }
    const parts = user.dateOfBirth.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return '';
  }, [user?.dateOfBirth]);

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        fullName: Yup.string()
          .min(3, t('editProfile.fullNameMin'))
          .required(t('editProfile.fullNameRequired')),
        phone: Yup.string().required(t('editProfile.phoneRequired')),
        dob: Yup.string()
          .required(t('editProfile.dobRequired'))
          .test('is-18', t('profileSetup.under18Error'), value => {
            if (!value) return false;
            const parts = value.split('/');
            if (parts.length !== 3) return false;

            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);

            const dobDate = new Date(year, month, day);
            const today = new Date();
            const age = today.getFullYear() - dobDate.getFullYear();

            if (
              today.getMonth() < dobDate.getMonth() ||
              (today.getMonth() === dobDate.getMonth() &&
                today.getDate() < dobDate.getDate())
            ) {
              return age - 1 >= 18;
            }

            return age >= 18;
          }),
        gender: Yup.string().required(t('editProfile.genderRequired')),
        bio: Yup.string().max(200, t('editProfile.bioMax')),
      }),
    [t],
  );

  const formattedPhone = useMemo(() => {
    if (!user?.phoneNumber) return '';
    const phone = user.phoneNumber.replace(/^\+91/, '');
    return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
  }, [user?.phoneNumber]);

  const formik = useFormik<EditProfileFormValues>({
    initialValues: {
      fullName: user?.name || '',
      phone: formattedPhone,
      dob: formattedDob,
      gender: user?.gender?.toLowerCase() || 'male',
      bio: user?.bio || '',
      avatarUri: user?.profilePhotoUrl || '',
    },
    validationSchema,
    onSubmit: async values => {
      setLoading(true);
      try {
        const updatePayload: Partial<ProfileUpdateData> = {};

        if (values.fullName !== formik.initialValues.fullName) {
          updatePayload.fullName = values.fullName;
        }

        const initialDobStr = formik.initialValues.dob;
        const currentDobStr = values.dob;
        if (initialDobStr !== currentDobStr) {
          let formattedDate = currentDobStr;
          if (formattedDate && formattedDate.includes('/')) {
            const parts = formattedDate.split('/');
            if (parts.length === 3) {
              formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
            }
          }
          updatePayload.dob = formattedDate;
        }

        if (values.gender !== formik.initialValues.gender) {
          updatePayload.gender = values.gender;
        }

        if (values.bio !== formik.initialValues.bio) {
          updatePayload.bio = values.bio;
        }

        if (Object.keys(updatePayload).length === 0) {
          showNotification(
            NotificationType.SUCCESS,
            t('notification.defaultSuccessTitle') || 'Success',
            t('editProfile.successMessage'),
          );
          setTimeout(() => {
            navigation.goBack();
          }, 1000);
          return;
        }

        await UserService.updateProfile(updatePayload);

        await fetchProfile();
        setShowSuccess(true);
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      } catch (err: any) {
        Logger.error('Profile update error:', err);
        showNotification(
          NotificationType.ERROR,
          t('notification.defaultErrorTitle'),
          getErrorMessage(err, t('notification.defaultErrorMessage')),
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const handleCloseSuccess = () => setShowSuccess(false);

  return {
    formik,
    loading,
    showSuccess,
    handleCloseSuccess,
    navigation,
    t,
  };
};
