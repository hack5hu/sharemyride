import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useState, useCallback } from 'react';
import { useFormik } from 'formik';
import { useFocusEffect } from '@react-navigation/native';
import { authService } from '@/serviceManager/authService';
import { Keyboard } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';
import { useTruecallerLogin } from './useTruecallerLogin';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useAppNavigation();
  const { t } = useTranslation();

  const {
    isTruecallerSupported,
    hasDismissedTruecaller,
    handleTruecallerLogin,
    handleInputFocus,
  } = useTruecallerLogin({ setLoading });

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
    }, [])
  );

  // Standard SMS-OTP path (also the fallback when Truecaller verification fails).
  const smsFallback = useCallback(
    async (phone: string) => {
      setLoading(true);
      try {
        const response = await authService.login(phone, true);
        if (response.data.status === 'success' || response.status === 200) {
          navigation.navigate('OTPVerification', { phoneNumber: phone, mode: 'sms' });
        } else {
          showNotification(
            NotificationType.ERROR,
            t('notification.defaultErrorTitle'),
            response.data.message || t('notification.defaultErrorMessage')
          );
          setLoading(false);
        }
      } catch (error: any) {
        showNotification(
          NotificationType.ERROR,
          t('notification.defaultErrorTitle'),
          getErrorMessage(error, t('notification.defaultErrorMessage'))
        );
        setLoading(false);
      }
    },
    [navigation, t]
  );

  const handleGetOtp = async (phone: string) => {
    await smsFallback(phone);
  };

  const formik = useFormik({
    initialValues: { phone: '' },
    validate: (v) => (/^\d{10}$/.test(v.phone) ? {} : { phone: '' }),
    onSubmit: (v) => {
      Keyboard.dismiss();
      handleGetOtp(v.phone);
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

    handleTruecallerLogin,
    handleInputFocus,
    isTruecallerSupported,
    hasDismissedTruecaller,
  };
};
