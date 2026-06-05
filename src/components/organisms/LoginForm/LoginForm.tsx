import React from 'react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { InfoBox } from '../../molecules/InfoBox';
import { Checkbox } from '../../atoms/Checkbox';
import { useLocale } from '@/constants/localization';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FormContainer, TermsContainer, TermsText, TruecallerRow, TruecallerText } from './LoginForm.styles';
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
  onTruecallerLogin,
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
        onFocus={onTruecallerLogin}
        error={error}
        keyboardType="phone-pad"
        maxLength={10}
        editable={!loading}
      />
      
      {onTruecallerLogin && (
        <TruecallerRow onPress={onTruecallerLogin} disabled={loading}>
          <TruecallerText>Or, Login with </TruecallerText>
          <Icon name="verified-user" size={16} color="#0052FF" /> 
          <TruecallerText style={{ color: '#0052FF', fontWeight: 'bold' }}>truecaller</TruecallerText>
          <Icon name="keyboard-arrow-right" size={16} color="#0052FF" />
        </TruecallerRow>
      )}

      <TermsContainer>
        <Checkbox 
          checked={isTermsAccepted} 
          onToggle={onToggleTerms} 
          disabled={loading}
        />
        <TermsText onPress={loading ? undefined : onToggleTerms}>
          {t.login.termsShort}
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
