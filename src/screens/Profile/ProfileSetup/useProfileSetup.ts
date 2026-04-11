import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/store/useAuthStore';
import { Alert } from 'react-native';

export const useProfileSetup = () => {
  const { t } = useTranslation();
  const { setProfileCompleted } = useAuthStore();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Required'),
    dob: Yup.string().required(t('profileSetup.dobRequiredError')),
    gender: Yup.string().required('Required'),
    location: Yup.string(),
    newsletter: Yup.boolean(),
    interests: Yup.array().of(Yup.string()),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      dob: '',
      gender: 'female',
      location: '',
      newsletter: true,
      interests: ['interestMinimalism'],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log('Form submitted:', values);
        // Simulate API call for profile update
        // In a real app, you'd call an authService.updateProfile(values)
        
        // Mark profile as completed to trigger RootNavigator stack switch
        setProfileCompleted(true);
        Alert.alert('Success', 'Profile setup complete!');
      } catch (error) {
        Alert.alert('Error', 'Failed to save profile. Please try again.');
      }
    },
  });

  return {
    formik,
    t,
  };
};
