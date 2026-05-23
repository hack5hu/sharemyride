import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { authService } from '@/serviceManager/authService';
import { Keyboard } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const toggleTerms = () => {
    Keyboard.dismiss();
    setIsTermsAccepted((prev) => !prev);
  };

  const handleGetOtp = async (phone: string) => {
    setLoading(true);
    try {
      const response = await authService.login(phone, true);
      
      if (response.data.status === 'success' || response.status === 200) {
        navigation.navigate('OTPVerification', { phoneNumber: phone });
      } else {
        showNotification(
          NotificationType.ERROR,
          t('notification.defaultErrorTitle'),
          response.data.message || t('notification.defaultErrorMessage')
        );
      }
    } catch (error: any) {
      showNotification(
        NotificationType.ERROR,
        t('notification.defaultErrorTitle'),
        getErrorMessage(error, t('notification.defaultErrorMessage'))
      );
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      phone: '',
    },
    validate: values => {
      const errors: { phone?: string } = {};
      if (!values.phone) {
        errors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = 'Please enter a valid 10-digit number';
      }
      return errors;
    },
    onSubmit: values => {
      Keyboard.dismiss();
      handleGetOtp(values.phone);
    },
  });


  return {
    loading,
    phone: formik.values.phone,
    error: formik.touched.phone ? formik.errors.phone : undefined,
    handleChange: formik.handleChange('phone'),
    handleBlur: formik.handleBlur('phone'),
    handleSubmit: formik.handleSubmit,
    isValid: formik.isValid && formik.dirty,
    isTermsAccepted,
    toggleTerms,
  };
};
