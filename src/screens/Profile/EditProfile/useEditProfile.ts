import { useState, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { profileService, ProfileUpdateData } from '@/serviceManager/profileService';
import { useTranslation } from '@/hooks/useTranslation';

export const useEditProfile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = useMemo(() => Yup.object().shape({
    fullName: Yup.string()
      .min(3, t('editProfile.fullNameMin'))
      .required(t('editProfile.fullNameRequired')),
    email: Yup.string()
      .email(t('editProfile.emailInvalid'))
      .required(t('editProfile.emailRequired')),

    phone: Yup.string()
      .matches(phoneRegExp, t('editProfile.phoneInvalid')).min(10, t('editProfile.phoneMin')).max(10, t('editProfile.phoneMax'))
      .required(t('editProfile.phoneRequired')),
    dob: Yup.date()
      .required(t('editProfile.dobRequired')),
    gender: Yup.string()
      .required(t('editProfile.genderRequired')),
    bio: Yup.string()
      .max(200, t('editProfile.bioMax')),
  }), [t]);

  const formik = useFormik<ProfileUpdateData>({
    initialValues: {
      fullName: 'Alex Rivera',
      email: 'alex.rivera@sharmyride.com',
      phone: '+1 (555) 123-4567',
      dob: new Date('1998-06-12'),
      gender: 'male',
      bio: 'Pro Pooler • Frequent traveler between Downtown and Silicon Valley. Lover of indie music and sustainable transit.',
      avatarUri: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        // await profileService.updateProfile(values);
        setShowSuccess(true);
        navigation.navigate('ProfileHub')
      } catch (err: any) {
        setError(err.message || 'An error occurred while updating profile');
        console.error('Profile update error:', err);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleUpdateAvatar = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets[0].uri) {
      formik.setFieldValue('avatarUri', result.assets[0].uri);
    }
  };



  const handleCloseSuccess = () => setShowSuccess(false);

  return {
    formik,
    loading,
    showSuccess,
    error,
    handleCloseSuccess,
    handleUpdateAvatar,
    navigation,
    t,
  };
};

