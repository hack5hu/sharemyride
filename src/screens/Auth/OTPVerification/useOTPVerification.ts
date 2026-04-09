import { useState, useRef, useEffect } from 'react';
import { TextInput } from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@/store/useAuthStore';

export const useOTPVerification = () => {
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { setAuth } = useAuthStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formik = useFormik({
    initialValues: { otp: ['', '', '', '', '', ''] },
    onSubmit: values => {
      const code = values.otp.join('');
      if (code.length === 6) {
        handleVerify(code);
      }
    },
  });

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...formik.values.otp];
    newOtp[index] = text.slice(-1);
    formik.setFieldValue('otp', newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (
      e.nativeEvent.key === 'Backspace' &&
      !formik.values.otp[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (code: string) => {
    setLoading(true);
    // Simulate API verification call
    setTimeout(async () => {
      console.log('Verifying OTP:', code);
      // Store auth state (mock user data)
      await setAuth(
        { id: '123', name: 'John Doe', phone: '1234567890' },
        'mock_jwt_token_safe_storage'
      );
      setLoading(false);
      // Navigate to BookRideInfo (Home/Main screen)
      navigation.navigate('BookRideInfo');
    }, 1500);
  };

  const handleResend = () => {
    setTimer(45);
    console.log('OTP Resent');
  };

  return {
    formik,
    timer,
    loading,
    inputRefs,
    handleOtpChange,
    handleKeyPress,
    handleResend,
  };
};
