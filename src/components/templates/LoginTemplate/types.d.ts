import { DefaultTheme } from 'styled-components/native';

interface LoginTranslations {
  brandTagline: string;
  english: string;
  hindi: string;
}

export interface LoginTemplateProps {
  loading: boolean;
  phone: string;
  error?: string;
  handleChange: (text: string) => void;
  handleBlur: (e: unknown) => void;
  handleSubmit: () => void;
  isValid: boolean;
  handleTruecallerLogin: () => void;
  handleInputFocus: () => void;
  isTruecallerSupported: boolean;
  hasDismissedTruecaller: boolean;
  isKeyboardVisible: boolean;
  t: {
    login: LoginTranslations;
  };
  theme: DefaultTheme;
  language: string;
  handleLanguageToggle: () => void;
  handleHelpPress: () => void;
}
