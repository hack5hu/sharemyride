import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useState, useCallback, useEffect } from 'react';
import { useFormik } from 'formik';
import { useFocusEffect } from '@react-navigation/native';
import { authService } from '@/serviceManager/authService';
import { Alert, Keyboard } from 'react-native';
import { useTranslation } from '@/hooks/useTranslation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';
import { useTruecaller, TRUECALLER_ANDROID_CUSTOMIZATIONS } from '@ajitpatel28/react-native-truecaller';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const navigation = useAppNavigation();
  const { t } = useTranslation();

  const {
    initializeTruecallerSDK,
    openTruecallerForVerification,
    isSdkUsable,
    userProfile,
    error: truecallerError,
  } = useTruecaller({
    androidClientId: 'xo3glydxwgapbf0zumg28mys6qud3tkzfnfzbxcqiay',
    iosAppKey: 'xo3glydxwgapbf0zumg28mys6qud3tkzfnfzbxcqiay',
    iosAppLink: 'https://sharemyride.com/truecaller',
    androidButtonColor: '#2C765CFF', // Matching RidePoolTheme default
    androidButtonTextColor: '#FFFFFF',
    androidButtonShape: TRUECALLER_ANDROID_CUSTOMIZATIONS.BUTTON_SHAPES.ROUNDED,
    androidButtonText: TRUECALLER_ANDROID_CUSTOMIZATIONS.BUTTON_TEXTS.ACCEPT,
    androidFooterButtonText: TRUECALLER_ANDROID_CUSTOMIZATIONS.FOOTER_TEXTS.ANOTHER_METHOD,
    androidConsentHeading: TRUECALLER_ANDROID_CUSTOMIZATIONS.CONSENT_HEADINGS.LOG_IN_TO,
  });

  const [isTruecallerSupported, setIsTruecallerSupported] = useState(false);

  useEffect(() => {
    const initAndCheck = async () => {
      try {
        await initializeTruecallerSDK();
        const usable = await isSdkUsable();
        setIsTruecallerSupported(usable);
      } catch (e) {
        setIsTruecallerSupported(false);
      }
    };
    initAndCheck();
  }, [initializeTruecallerSDK, isSdkUsable]);

  useEffect(() => {
    if (userProfile) {
      console.log('Truecaller profile:', userProfile);
      
      const verifyTruecaller = async () => {
        setLoading(true);
        try {
          // Extract 10 digit number from Truecaller payload
          let phoneStr = userProfile.phoneNumber || '';
          if (phoneStr.startsWith('+91')) {
            phoneStr = phoneStr.slice(3);
          } else if (phoneStr.startsWith('0')) {
            phoneStr = phoneStr.slice(1);
          }
          
          if (!phoneStr || phoneStr.length < 10) {
            Alert.alert('Invalid phone number received from Truecaller');
          }

          // We pass isTrueCaller = true
          const response = await authService.verifyOtp(phoneStr, undefined, undefined, undefined, true);
          
          if (response.data.status === 'success' || response.status === 200) {
            // Truecaller verification successful, navigate depending on profile
            if (response.data.existingUser && response.data.userProfileCompleted) {
              navigation.reset({ index: 0, routes: [{ name: 'Main' as any }] });
            } else {
              navigation.reset({ index: 0, routes: [{ name: 'ProfileSetup' as any }] });
            }
          }
        } catch (error: any) {
          showNotification(
            NotificationType.ERROR,
            t('notification.defaultErrorTitle'),
            getErrorMessage(error, 'Truecaller verification failed')
          );
        } finally {
          setLoading(false);
        }
      };
      
      verifyTruecaller();
    }
  }, [userProfile]);

  useEffect(() => {
    if (truecallerError) {
      console.error('Truecaller error:', truecallerError);
      showNotification(
        NotificationType.ERROR,
        'Truecaller Error',
        getErrorMessage(truecallerError, 'Failed to login with Truecaller')
      );
    }
  }, [truecallerError]);

  const handleTruecallerLogin = async () => {
    Keyboard.dismiss();
    try {
      const isUsable = await isSdkUsable();
      if (isUsable) {
        await openTruecallerForVerification();
      } else {
        showNotification(
          NotificationType.ERROR,
          'Truecaller Unavailable',
          'Truecaller app is not installed or configured on this device.'
        );
      }
    } catch (err) {
      showNotification(
        NotificationType.ERROR,
        'Error',
        'Could not start Truecaller login'
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(false);
    }, [])
  );

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
    handleTruecallerLogin,
    isTruecallerSupported,
  };
};
