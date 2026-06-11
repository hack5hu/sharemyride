import React from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { LoginForm } from '@/components/organisms/LoginForm';
import { useLocale } from '@/constants/localization';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { useSettingsStore } from '@/store/settings';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import { ZyncRideLogo } from '@/components/atoms/ZyncRideLogo';
import {
  Container,
  ScrollContent,
  ContentWrapper,
  HeroContainer,
  HeroImage,
  FormContentWrapper,
  LoginCard,
  OverlayHeader,
  OverlayTagline,
  TopLanguageButton,
  LanguageButtonText,
} from './Login.styles';
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
    <ScreenShell noPaddingTop>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Container>
        <ScrollContent showsVerticalScrollIndicator={false}>
          <ContentWrapper>
            {/* Top Illustration */}
            <HeroContainer>
              <HeroImage
                source={require('../../../assets/images/carpool.png')}
                resizeMode="cover"
              />
            </HeroContainer>

            {/* Form & Actions Overlay */}
            <FormContentWrapper>
              <LoginCard>
                <OverlayHeader>
                  <ZyncRideLogo width={250} height={80} />
                  <OverlayTagline>{t.login.brandTagline}</OverlayTagline>
                </OverlayHeader>

                <LoginForm
                  value={phone}
                  onChangeText={handleChange}
                  onBlur={handleBlur}
                  error={error}
                  onSubmit={handleSubmit}
                  isValid={isValid}
                  loading={loading}
                  onTruecallerLogin={
                    isTruecallerSupported ? handleTruecallerLogin : undefined
                  }
                  onInputFocus={handleInputFocus}
                  isTruecallerActive={
                    isTruecallerSupported && !hasDismissedTruecaller
                  }
                />
              </LoginCard>
            </FormContentWrapper>
          </ContentWrapper>
        </ScrollContent>

        {/* Sticky Top Language Button */}
        <TopLanguageButton onPress={handleLanguageToggle}>
          <Icon
            name="language"
            size={16}
            color={theme.colors.on_surface_variant}
          />
          <LanguageButtonText>
            {language === 'en' ? t.login.english : t.login.hindi}
          </LanguageButtonText>
          <Icon
            name="keyboard-arrow-down"
            size={16}
            color={theme.colors.on_surface_variant}
          />
        </TopLanguageButton>
      </Container>
    </ScreenShell>
  );
});
