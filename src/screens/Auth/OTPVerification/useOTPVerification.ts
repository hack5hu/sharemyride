import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { authService } from '@/serviceManager/authService';
import { useAuthStore } from '@/store/useAuthStore';
import { getDeviceId } from '@/utils/deviceId';
import { getFcmToken } from '@/utils/fcm';
import { useTranslation } from '@/hooks/useTranslation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';
import { getErrorMessage } from '@/utils/error';

export const useOTPVerification = () => {
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const route = useRoute<any>();
  const { phoneNumber } = route.params || {};
  const { t } = useTranslation();

  const { setAuth } = useAuthStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTextChange = (text: string) => {
    setOtpValue(text);
  };

  const handleVerify = async (code: string) => {
    if (!phoneNumber) {
      showNotification(
        NotificationType.ERROR,
        t('notification.defaultErrorTitle'),
        t('notification.defaultErrorMessage')
      );
      return;
    }

    setLoading(true);
    try {
      const [deviceId, fcmToken] = await Promise.all([
        getDeviceId(),
        getFcmToken(),
      ]);

      const response = await authService.verifyOtp(
        phoneNumber,
        code,
        deviceId,
        fcmToken,
      );

      if (response.data.status === 'success' || response.status === 200) {
        const { token, userId, userProfileCompleted } = response.data;

        // Store auth state in Zustand
        await setAuth(
          { id: userId, phone: phoneNumber },
          token,
          userProfileCompleted,
        );

        // Background sync Profile, Vehicles, and Preferences immediately only if the profile is completed
        if (userProfileCompleted) {
          const { fetchProfile } = useAuthStore.getState();
          const { useVehicleStore } = require('@/store/useVehicleStore');
          const { useTravelPrefStore } = require('@/store/useTravelPrefStore');
          const { syncVehicles } = useVehicleStore.getState();
          const { syncPreferences } = useTravelPrefStore.getState();

          fetchProfile();
          syncVehicles();
          syncPreferences();
        }

        setLoading(false);

        // Navigation is handled by RootNavigator reacting to store changes
        // but we can also trigger it here if needed.
        // For now, let's let the RootNavigator handle the switch.
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

  const handleResend = async () => {
    setTimer(45);
    try {
      await authService.resendOtp(phoneNumber);
    } catch (error: any) {
      showNotification(
        NotificationType.ERROR,
        t('notification.defaultErrorTitle'),
        getErrorMessage(error, t('notification.defaultErrorMessage'))
      );
    }
  };

  return {
    timer,
    loading,
    otpValue,
    handleTextChange,
    handleVerify,
    handleResend,
    phoneNumber,
  };
};
