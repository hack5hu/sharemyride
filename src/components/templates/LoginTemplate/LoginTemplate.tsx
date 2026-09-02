import React from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ZyncRideLogo } from '@/components/atoms/ZyncRideLogo';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { LoginForm } from '@/components/organisms/LoginForm';
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
} from './LoginTemplate.styles';
import { type LoginTemplateProps } from './types.d';

export const LoginTemplate: React.FC<LoginTemplateProps> = ({
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
  t,
  theme,
  language,
  handleLanguageToggle,
}) => {
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
                source={require('@/assets/images/carpool.png')}
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
};
