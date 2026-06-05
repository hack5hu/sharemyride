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
import {
  useTruecaller,
  TRUECALLER_ANDROID_CUSTOMIZATIONS,
  type TruecallerAndroidResponse,
} from '@ajitpatel28/react-native-truecaller';
import { useAuthStore } from '@/store/useAuthStore';
import { getDeviceId } from '@/utils/deviceId';
import { getFcmToken } from '@/utils/fcm';
import { Logger } from '@/utils/logger';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const navigation = useAppNavigation();
  const { t } = useTranslation();
  const { setAuth } = useAuthStore();

  const verifyTruecaller = useCallback(
    async (params: {
      phoneNumber?: string;
      authorizationCode?: string;
      codeVerifier?: string;
    }) => {
      setLoading(true);
      try {
        let phoneStr = params.phoneNumber || '';
        if (phoneStr) {
          phoneStr = phoneStr.startsWith('+91')
            ? phoneStr.slice(3)
            : phoneStr.startsWith('0')
            ? phoneStr.slice(1)
            : phoneStr;

          if (phoneStr.length < 10) {
            Alert.alert('Invalid phone number received from Truecaller');
            setLoading(false);
            return;
          }
        }

        const [deviceId, fcmToken] = await Promise.all([
          getDeviceId().catch(() => null),
          getFcmToken().catch(() => null),
        ]);

        const response = await authService.verifyOtp(
          phoneStr || undefined,
          undefined,
          deviceId,
          fcmToken,
          true,
          params.authorizationCode,
          params.codeVerifier
        );

        if (response.data.status === 'success' || response.status === 200) {
          const { token, userId, userProfileCompleted: completed } = response.data;
          await setAuth({ id: userId, phone: phoneStr }, token, completed);
          if (completed) {
            useAuthStore.getState().fetchProfile();
            require('@/store/useVehicleStore').useVehicleStore.getState().syncVehicles();
            require('@/store/useTravelPrefStore').useTravelPrefStore.getState().syncPreferences();
          }
        } else {
          showNotification(
            NotificationType.ERROR,
            t('notification.defaultErrorTitle'),
            response.data.message || t('notification.defaultErrorMessage')
          );
        }
      } catch (error: any) {
        Logger.error('Truecaller verification failed', error);
        showNotification(
          NotificationType.ERROR,
          t('notification.defaultErrorTitle'),
          getErrorMessage(error, 'Truecaller verification failed')
        );
      } finally {
        setLoading(false);
      }
    },
    [setAuth, t]
  );

  const handleTruecallerSuccess = useCallback(
    (data: {
      phoneNumber?: string;
      authorizationCode?: string;
      codeVerifier?: string;
    }) => verifyTruecaller(data),
    [verifyTruecaller]
  );

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
    androidButtonColor: '#2C765CFF',
    androidButtonTextColor: '#FFFFFF',
    androidButtonShape: TRUECALLER_ANDROID_CUSTOMIZATIONS.BUTTON_SHAPES.ROUNDED,
    androidButtonText: TRUECALLER_ANDROID_CUSTOMIZATIONS.BUTTON_TEXTS.ACCEPT,
    androidFooterButtonText:
      TRUECALLER_ANDROID_CUSTOMIZATIONS.FOOTER_TEXTS.ANOTHER_METHOD,
    androidConsentHeading:
      TRUECALLER_ANDROID_CUSTOMIZATIONS.CONSENT_HEADINGS.LOG_IN_TO,
    androidSdkOptions: TRUECALLER_ANDROID_CUSTOMIZATIONS.SDK_OPTIONS.VERIFY_ALL_USERS,
    androidSuccessHandler: (data: TruecallerAndroidResponse) =>
      handleTruecallerSuccess({
        phoneNumber: data.phone_number,
        authorizationCode: data.authorizationCode,
        codeVerifier: data.codeVerifier,
      }),
  });

  const [isTruecallerSupported, setIsTruecallerSupported] = useState(false);

  useEffect(() => {
    initializeTruecallerSDK()
      .then(isSdkUsable)
      .then(setIsTruecallerSupported)
      .catch(() => setIsTruecallerSupported(false));
  }, [initializeTruecallerSDK, isSdkUsable]);

  useEffect(() => {
    if (userProfile) {
      handleTruecallerSuccess({ phoneNumber: userProfile.phoneNumber || '' });
    }
  }, [userProfile, handleTruecallerSuccess]);

  useEffect(() => {
    console.log(truecallerError);
    if (truecallerError && !/cancel|dismiss|4/i.test(truecallerError)) {
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
      if (await isSdkUsable()) {
        await openTruecallerForVerification();
      } else {
        showNotification(
          NotificationType.ERROR,
          'Truecaller Unavailable',
          'Truecaller app is not installed or configured on this device.'
        );
      }
    } catch (err) {
      Logger.error('Could not start Truecaller login', err);
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
    initialValues: { phone: '' },
    validate: (v) =>
      !v.phone
        ? { phone: 'Phone number is required' }
        : !/^\d{10}$/.test(v.phone)
        ? { phone: 'Please enter a valid 10-digit number' }
        : {},
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
    isTermsAccepted,
    toggleTerms,
    handleTruecallerLogin,
    isTruecallerSupported,
  };
};
