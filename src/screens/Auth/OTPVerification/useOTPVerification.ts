import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { authService } from '@/serviceManager/authService';
import { useAuthStore } from '@/store/useAuthStore';

export const useOTPVerification = () => {
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { phoneNumber } = route.params || {};
  
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
      Alert.alert('Error', 'Phone number missing');
      return;
    }
    
    setLoading(true);
    try {
      const response = await authService.verifyOtp(phoneNumber, code);
      
      if (response.data.status === 'success' || response.status === 200) {
        console.log('we are here')
        const { token, userId, userProfileCompleted } = response.data;
        
        // Store auth state in Zustand
        await setAuth(
          { id: userId, phone: phoneNumber },
          token,
          userProfileCompleted
        );

        // Background sync Profile, Vehicles, and Preferences immediately
        const { fetchProfile } = useAuthStore.getState();
        const { useVehicleStore } = require('@/store/useVehicleStore');
        const { useTravelPrefStore } = require('@/store/useTravelPrefStore');
        const { syncVehicles } = useVehicleStore.getState();
        const { syncPreferences } = useTravelPrefStore.getState();
        
        fetchProfile();
        syncVehicles();
        syncPreferences();

        setLoading(false);
        
        // Navigation is handled by RootNavigator reacting to store changes
        // but we can also trigger it here if needed. 
        // For now, let's let the RootNavigator handle the switch.
      } else {
        Alert.alert('Verification Failed', response.data.message || 'Invalid OTP');
        setLoading(false);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Verification failed');
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setTimer(45);
    try {
      await authService.resendOtp(phoneNumber);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to resend OTP');
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
