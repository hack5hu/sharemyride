import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { authService } from '@/serviceManager/authService';
import { Alert } from 'react-native';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const navigation = useNavigation<any>();

  const toggleTerms = () => setIsTermsAccepted((prev) => !prev);

  const handleGetOtp = async (phone: string) => {
    setLoading(true);
    try {
      const response = await authService.login(phone, true);
      
      if (response.data.status === 'success' || response.status === 200) {
        navigation.navigate('OTPVerification', { phoneNumber: phone });
      } else {
        Alert.alert('Login', response.data.message || 'Verification failed');
      }
    } catch (error: any) {
      Alert.alert('Verification Error', error.message || 'Something went wrong');
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
      handleGetOtp(values.phone);
    },
  });

  const handleSocialLogin = (provider: string) => {
    console.log('Login with:', provider);
  };

  return {
    loading,
    phone: formik.values.phone,
    error: formik.touched.phone ? formik.errors.phone : undefined,
    handleChange: formik.handleChange('phone'),
    handleBlur: formik.handleBlur('phone'),
    handleSubmit: formik.handleSubmit,
    isValid: formik.isValid && formik.dirty,
    handleSocialLogin,
    isTermsAccepted,
    toggleTerms,
  };
};
