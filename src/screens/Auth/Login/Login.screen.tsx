import React from 'react';
import { Typography } from '@/components/atoms/Typography';
import { LoginForm } from '@/components/organisms/LoginForm';
import { useLocale } from '@/constants/localization';
import { ScreenShell } from '@/components/molecules/ScreenShell';
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
    isTermsAccepted,
    toggleTerms,
  } = useLogin();
  const t = useLocale();

  return (
    <ScreenShell>
      {/* Background Decorative Elements */}
      <BackgroundBubble top="-5%" left="-5%" />
      <BackgroundBubble bottom="-5%" right="-5%" />

      <ScrollContent showsVerticalScrollIndicator={false}>
        <ContentWrapper>
          <BrandHeader>
            <LogoText>{t.login.brandName}</LogoText>
            <Typography
              variant="body"
              size="sm"
              color="on-surface-variant"
              align="center"
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
              isTermsAccepted={isTermsAccepted}
              onToggleTerms={toggleTerms}
            />
          </LoginCard>
        </ContentWrapper>
      </ScrollContent>
    </ScreenShell>
  );
};
