import React from 'react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { InfoBox } from '../../molecules/InfoBox';
import { Checkbox } from '../../atoms/Checkbox';
import { useLocale } from '@/constants/localization';
import { FormContainer, TermsContainer, TermsText } from './LoginForm.styles';
import { LoginFormProps } from './types';

export const LoginForm: React.FC<LoginFormProps> = ({
  value,
  onChangeText,
  onBlur,
  error,
  onSubmit,
  isValid,
  loading,
  isTermsAccepted,
  onToggleTerms,
}) => {
  const t = useLocale();

  // Button is enabled ONLY when phone is 10 digits AND terms are accepted
  const isButtonDisabled = !isValid || !isTermsAccepted || value.length < 10;

  return (
    <FormContainer>
      <Input
        label={t.login.phoneLabel}
        placeholder={t.login.phonePlaceholder}
        prefix="+91"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        error={error}
        keyboardType="phone-pad"
        maxLength={10}
      />

      <TermsContainer>
        <Checkbox checked={isTermsAccepted} onToggle={onToggleTerms} />
        <TermsText onPress={onToggleTerms}>
          {t.dummyContent.termsBody}
        </TermsText>
      </TermsContainer>

      <Button
        variant="primary"
        icon="arrow-forward"
        onPress={onSubmit as any}
        loading={loading}
        disabled={isButtonDisabled}
      >
        {t.login.getOtp}
      </Button>

      <InfoBox>{t.login.otpInfoBox}</InfoBox>
    </FormContainer>
  );
};
