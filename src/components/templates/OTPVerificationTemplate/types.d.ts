export interface OTPVerificationTemplateProps {
  propPhoneNumber?: string;
  dynamicPhoneNumber?: string;
  timer: number;
  loading: boolean;
  otpValue: string;
  handleTextChange: (text: string) => void;
  handleVerify: (code: string) => void;
  handleResend: () => void;
  toastConfig: {
    isVisible: boolean;
    type: 'success' | 'error' | 'info';
    message: string;
  };
  hideToast: () => void;
  t: any;
  theme: any;
}
