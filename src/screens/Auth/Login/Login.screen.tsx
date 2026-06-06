import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { LoginForm } from '@/components/organisms/LoginForm';
import { useLocale } from '@/constants/localization';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { ZyncRideLogo } from '@/components/atoms/ZyncRideLogo';
import {
  ScrollContent,
  BackgroundBubble,
  BrandHeader,
  LogoText,
  ContentWrapper,
  LoginCard,
} from './Login.styles';
import { useLogin } from './useLogin';

export const LoginScreen: React.FC = () => {
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
  } = useLogin();
  const t = useLocale();

  // Truecaller is the active path when it's installed AND user hasn't chosen another method
  const isTruecallerActive = isTruecallerSupported && !hasDismissedTruecaller;

  return (
    <ScreenShell>
      {/* Background Decorative Elements */}
      <BackgroundBubble top="-5%" left="-5%" />
      <BackgroundBubble bottom="-5%" right="-5%" />

      <ScrollContent showsVerticalScrollIndicator={false}>
        <ContentWrapper>
          <BrandHeader>
            <ZyncRideLogo width={180} height={60} />
            <Typography
              variant="body"
              size="sm"
              color="on-surface-variant"
              align="center"
              style={{ marginTop: 12 }}
            >
              {t.login.brandTagline}
            </Typography>
          </BrandHeader>

          <LoginCard>
            <LoginForm
              value={phone}
              onChangeText={handleChange}
              onBlur={handleBlur}
              error={error}
              onSubmit={handleSubmit}
              isValid={isValid}
              loading={loading}

              onTruecallerLogin={isTruecallerSupported ? handleTruecallerLogin : undefined}
              onInputFocus={handleInputFocus}
              isTruecallerActive={isTruecallerActive}
            />
          </LoginCard>
        </ContentWrapper>
      </ScrollContent>
    </ScreenShell>
  );
};
