import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/store/useAuthStore';
import { userService } from '@/serviceManager/userService';
import { Alert } from 'react-native';

export const useProfileSetup = () => {
  const { t } = useTranslation();
  const { setProfileCompleted, fetchProfile } = useAuthStore();

  const validationSchema = useMemo(() => Yup.object().shape({
    fullName: Yup.string().required('Required'),
    dob: Yup.string().required(t('profileSetup.dobRequiredError')),
    gender: Yup.string(),
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
      gender: 'male',
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

        setProfileCompleted(true);
        await fetchProfile();
        Alert.alert('Success', 'Profile setup complete!');
      } catch (error: any) {
        Alert.alert(
          'Error',
          error.message || 'Failed to save profile. Please try again.',
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
