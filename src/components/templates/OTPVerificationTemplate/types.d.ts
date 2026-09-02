import { type DefaultTheme } from 'styled-components/native';
import { type OtpVerificationTranslations } from '@/constants/localization/types';

export interface OTPVerificationTemplateProps {
  propPhoneNumber?: string;
  dynamicPhoneNumber?: string;
  timer: number;
  loading: boolean;
  otpValue: string;
  handleTextChange: (text: string) => void;
  handleVerify: (code: string) => void;
  handleResend: () => void;

  t: OtpVerificationTranslations;
  theme: DefaultTheme;
}

