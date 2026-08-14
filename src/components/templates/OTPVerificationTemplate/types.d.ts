import { DefaultTheme } from 'styled-components/native';

export interface OTPVerificationTemplateProps {
  propPhoneNumber?: string;
  dynamicPhoneNumber?: string;
  timer: number;
  loading: boolean;
  otpValue: string;
  handleTextChange: (text: string) => void;
  handleVerify: (code: string) => void;
  handleResend: () => void;

  t: {
    otp: {
      title: string;
      subtitle: string;
      resendCode: string;
      verify: string;
      resendIn: string;
    };
  };
  theme: DefaultTheme;
}
