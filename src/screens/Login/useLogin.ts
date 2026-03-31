import { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/native';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleGetOtp = (phone: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      console.log('OTP sent to:', phone);
      navigation.navigate('OTPVerification', { phoneNumber: phone });
    }, 2000);
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
  };
};
