import React from 'react';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { useSettingsStore } from '@/store/settings';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { LoginTemplate } from '@/components/templates/LoginTemplate';
import { useLogin } from './useLogin';

export const LoginScreen: React.FC = React.memo(() => {
  const {
    loading,
    phone,
    error,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    handleTruecallerLogin,
    handleInputFocus,
    isTruecallerSupported,
    hasDismissedTruecaller,
    isKeyboardVisible,
  } = useLogin();

  const t = useLocale();
  const theme = useTheme();
  const navigation = useAppNavigation();
  const { language, setLanguage } = useSettingsStore();

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const handleHelpPress = () => {
    navigation.navigate('HelpAndSupport');
  };

  return (
    <LoginTemplate
      loading={loading}
      phone={phone}
      error={error}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleSubmit={handleSubmit}
      isValid={isValid}
      handleTruecallerLogin={handleTruecallerLogin}
      handleInputFocus={handleInputFocus}
      isTruecallerSupported={isTruecallerSupported}
      hasDismissedTruecaller={hasDismissedTruecaller}
      isKeyboardVisible={isKeyboardVisible}
      t={t}
      theme={theme}
      language={language}
      handleLanguageToggle={handleLanguageToggle}
      handleHelpPress={handleHelpPress}
    />
  );
});
