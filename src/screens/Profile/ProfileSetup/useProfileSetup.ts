import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/store/useAuthStore';
import { userService } from '@/serviceManager/userService';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';

export const useProfileSetup = () => {
  const { t } = useTranslation();
  const { setProfileCompleted, fetchProfile } = useAuthStore();

  const validationSchema = useMemo(() => Yup.object().shape({
    fullName: Yup.string().required(t('profileSetup.requiredFieldsError')),
    dob: Yup.string()
      .required(t('profileSetup.dobRequiredError'))
      .test('is-18', t('profileSetup.under18Error'), (value) => {
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
          (today.getMonth() === dobDate.getMonth() && today.getDate() < dobDate.getDate())
        ) {
          return age - 1 >= 18;
        }
        
        return age >= 18;
      }),
    gender: Yup.string().required(t('profileSetup.requiredFieldsError')),
    profileImage: Yup.object()
      .shape({
        uri: Yup.string(),
      })
      .nullable(),
  }), [t]);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      dob: '',
      gender: '',
      profileImage: null as any,
      newsletter: false,
    },
    validationSchema,
    onSubmit: async values => {
      try {
        await userService.updateProfile({
          fullName: values.fullName,
          dob: values.dob,
          gender: values.gender,
          profileImage: values.profileImage,
        });

        // Fetch updated profile first, then force profileCompleted = true
        // so the navigator swaps to the main app stack (BookRideInfo).
        await fetchProfile();
        setProfileCompleted(true);

        showNotification(
          NotificationType.SUCCESS,
          t('notification.defaultSuccessTitle'),
          t('notification.defaultSuccessMessage')
        );
      } catch (error: unknown) {
        showNotification(
          NotificationType.ERROR,
          t('notification.defaultErrorTitle'),
          getErrorMessage(error, t('notification.defaultErrorMessage'))
        );
      }
    },
  });

  const handleFieldChange = useCallback((field: string, value: any) => {
    formik.setFieldValue(field, value);
  }, [formik]);

  const isFormComplete = useMemo(() => 
    formik.values.fullName.trim().length > 0 && formik.values.dob.length === 10,
    [formik.values.fullName, formik.values.dob]
  );

  return {
    formik,
    t,
    isFormComplete,
    handleFieldChange,
  };
};
