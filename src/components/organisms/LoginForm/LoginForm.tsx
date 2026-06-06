import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { InfoBox } from '../../molecules/InfoBox';

import { useLocale } from '@/constants/localization';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  FormContainer,
  InputContainer,
  InputTapOverlay,
  ActionGroup,
  OrDividerContainer,
  OrDividerLine,
  OrDividerText,
  TruecallerRow,
  TruecallerText,
  TruecallerBrandText,
} from './LoginForm.styles';
import { LoginFormProps } from './types';

export const LoginForm: React.FC<LoginFormProps> = ({
  value,
  onChangeText,
  onBlur,
  error,
  onSubmit,
  isValid,
  loading,

  onTruecallerLogin,
  onInputFocus,
  isTruecallerActive,
}) => {
  const t = useLocale();

  // Track previous isTruecallerActive to detect true→false transition
  const prevActiveRef = useRef<boolean | undefined>(isTruecallerActive);
  const [inputKey, setInputKey] = useState(0);
  const [autoFocusInput, setAutoFocusInput] = useState(false);

  useEffect(() => {
    // When Truecaller goes from active → dismissed, auto-focus the input
    if (prevActiveRef.current === true && !isTruecallerActive) {
      setAutoFocusInput(true);
      setInputKey((k) => k + 1); // remount Input so autoFocus fires
    }
    prevActiveRef.current = isTruecallerActive;
  }, [isTruecallerActive]);

  // Button is enabled ONLY when phone is 10 digits
  const isButtonDisabled = value.length !== 10;

  return (
    <FormContainer>
      {/*
        Wrap the Input in a relative container.
        When Truecaller is active, an invisible Pressable sits on top
        so tapping it fires Truecaller instead of focusing the TextInput.
        This prevents the keyboard from popping up after the Truecaller dialog closes.
      */}
      <InputContainer>
        <Input
          key={inputKey}
          label={t.login.phoneLabel}
          placeholder={t.login.phonePlaceholder}
          prefix="+91"
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          error={error}
          keyboardType="phone-pad"
          maxLength={10}
          editable={!loading && !isTruecallerActive}
          showSoftInputOnFocus={!isTruecallerActive}
          autoFocus={autoFocusInput}
        />
        {isTruecallerActive && (
          <InputTapOverlay onPress={onInputFocus} />
        )}
      </InputContainer>

      <ActionGroup>
        <Button
          variant="primary"
          icon="arrow-forward"
          onPress={onSubmit as any}
          loading={loading}
          disabled={isButtonDisabled}
        >
          {t.login.continueButton}
        </Button>

        {onTruecallerLogin && (
          <>
            <OrDividerContainer>
              <OrDividerLine />
              <OrDividerText>{t.login.orDivider}</OrDividerText>
              <OrDividerLine />
            </OrDividerContainer>

            <TruecallerRow onPress={onTruecallerLogin} disabled={loading}>
              <TruecallerText>{t.login.truecallerPrefix}</TruecallerText>
              <Icon name="verified-user" size={16} color="#0052FF" />
              <TruecallerBrandText>{t.login.truecallerSuffix}</TruecallerBrandText>
              <Icon name="keyboard-arrow-right" size={16} color="#0052FF" />
            </TruecallerRow>
          </>
        )}
      </ActionGroup>

      <InfoBox>{t.login.otpInfoBox}</InfoBox>
    </FormContainer>
  );
};
