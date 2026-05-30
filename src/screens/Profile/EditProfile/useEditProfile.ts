import { useState, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/navigation/types';
import { ProfileUpdateData, profileService } from '@/serviceManager/profileService';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuthStore } from '@/store/useAuthStore';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';

export const useEditProfile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user, fetchProfile } = useAuthStore();

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = useMemo(() => Yup.object().shape({
    fullName: Yup.string()
      .min(3, t('editProfile.fullNameMin'))
      .required(t('editProfile.fullNameRequired')),
    email: Yup.string()
      .email(t('editProfile.emailInvalid'))
      .required(t('editProfile.emailRequired')),

    phone: Yup.string()
      .required(t('editProfile.phoneRequired')),
    dob: Yup.date()
      .required(t('editProfile.dobRequired')),
    gender: Yup.string()
      .required(t('editProfile.genderRequired')),
    bio: Yup.string()
      .max(200, t('editProfile.bioMax')),
  }), [t]);

  const formattedPhone = useMemo(() => {
    if (!user?.phoneNumber) return '';
    const phone = user.phoneNumber.replace(/^\+91/, '');
    return `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
  }, [user?.phoneNumber]);

  const formik = useFormik<ProfileUpdateData>({
    initialValues: {
      fullName: user?.name || '',
      email: 'alex.rivera@sharmyride.com',
      phone: formattedPhone,
      dob: user?.dateOfBirth ? new Date(user.dateOfBirth) : new Date(),
      gender: user?.gender?.toLowerCase() || 'male',
      bio: user?.bio || '',
      avatarUri: user?.profilePhotoUrl || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const updatePayload: any = {};
        
        if (values.fullName !== formik.initialValues.fullName) {
          updatePayload.fullName = values.fullName;
        }
        
        const initialDobStr = formik.initialValues.dob instanceof Date 
          ? formik.initialValues.dob.toISOString().split('T')[0] 
          : String(formik.initialValues.dob);
        const currentDobStr = values.dob instanceof Date 
          ? values.dob.toISOString().split('T')[0] 
          : String(values.dob);
        if (initialDobStr !== currentDobStr) {
          updatePayload.dob = currentDobStr;
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
            t('editProfile.successMessage')
          );
          setTimeout(() => {
            navigation.goBack();
          }, 1000);
          return;
        }

        await profileService.updateProfile(updatePayload);
        
        await fetchProfile();
        setShowSuccess(true);
        setTimeout(() => {
          navigation.goBack();
        }, 1500);
      } catch (err: any) {
        console.error('Profile update error:', err);
        showNotification(
          NotificationType.ERROR,
          t('notification.defaultErrorTitle'),
          getErrorMessage(err, t('notification.defaultErrorMessage'))
        );
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
    handleCloseSuccess,
    handleUpdateAvatar,
    navigation,
    t,
  };
};

