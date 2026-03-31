import { useState, useRef, useEffect } from 'react';
import { TextInput } from 'react-native';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';

export const useOTPVerification = () => {
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const inputRefs = useRef<(TextInput | null)[]>([]);

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
      handleVerify(code);
      navigation.navigate('ProfileSetup');
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
    setTimeout(() => {
      setLoading(false);
      console.log('Verifying OTP:', code);
      // Navigation or Toast logic here
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
