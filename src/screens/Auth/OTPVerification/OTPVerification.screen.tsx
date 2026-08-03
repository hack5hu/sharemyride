import React, { useState } from 'react';
import { useTheme } from 'styled-components/native';
import { OTPVerificationTemplate } from '@/components/templates/OTPVerificationTemplate';
import { useOTPVerification } from './useOTPVerification';
import { OTPVerificationProps } from './types';
import { useLocale } from '@/constants/localization';

export const OTPVerificationScreen: React.FC<OTPVerificationProps> = ({
  phoneNumber: propPhoneNumber,
}) => {
  const theme = useTheme();

  const {
    timer,
    loading,
    otpValue,
    handleTextChange,
    handleVerify,
    handleResend,
    phoneNumber: dynamicPhoneNumber,
  } = useOTPVerification();



  const { otpVerification: t } = useLocale();

  return (
    <OTPVerificationTemplate
      propPhoneNumber={propPhoneNumber}
      dynamicPhoneNumber={dynamicPhoneNumber}
      timer={timer}
      loading={loading}
      otpValue={otpValue}
      handleTextChange={handleTextChange}
      handleVerify={handleVerify}
      handleResend={handleResend}

      t={t}
      theme={theme}
    />
  );
};
