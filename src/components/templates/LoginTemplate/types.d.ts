export interface LoginTemplateProps {
  loading: boolean;
  phone: string;
  error?: string;
  handleChange: (text: string) => void;
  handleBlur: (e: any) => void;
  handleSubmit: () => void;
  isValid: boolean;
  handleTruecallerLogin: () => void;
  handleInputFocus: () => void;
  isTruecallerSupported: boolean;
  hasDismissedTruecaller: boolean;
  isKeyboardVisible: boolean;
  t: any;
  theme: any;
  language: string;
  handleLanguageToggle: () => void;
  handleHelpPress: () => void;
}
