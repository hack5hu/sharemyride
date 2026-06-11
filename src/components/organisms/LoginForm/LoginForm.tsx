import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'styled-components/native';
import { Button } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { useLocale } from '@/constants/localization';
import { useAppNavigation } from '@/hooks/useAppNavigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Input } from '../../atoms/Input';
import {
  FormContainer,
  InputContainer,
  InputTapOverlay,
  TruecallerRow,
  TermsContainer,
  SecurityBadge,
  DummyRow,
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
  const theme = useTheme();
  const navigation = useAppNavigation();

  const prevActiveRef = useRef<boolean | undefined>(isTruecallerActive);
  const [inputKey, setInputKey] = useState(0);
  const [autoFocusInput, setAutoFocusInput] = useState(false);

  useEffect(() => {
    if (prevActiveRef.current === true && !isTruecallerActive) {
      setAutoFocusInput(true);
      setInputKey(k => k + 1);
    }
    prevActiveRef.current = isTruecallerActive;
  }, [isTruecallerActive]);

  const isButtonDisabled = value.length !== 10;

  return (
    <FormContainer>
      <InputContainer>
        <Input
          key={inputKey}
          label={t.login.phoneLabel}
          placeholder={t.login.phonePlaceholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          error={error}
          keyboardType="phone-pad"
          maxLength={10}
          editable={!loading && !isTruecallerActive}
          showSoftInputOnFocus={!isTruecallerActive}
          autoFocus={autoFocusInput}
          prefix="+91"
        />
        {isTruecallerActive && <InputTapOverlay onPress={onInputFocus} />}
        {onTruecallerLogin ? (
          <TruecallerRow
            onPress={onTruecallerLogin}
            disabled={loading}
            activeOpacity={0.7}
          >
            <Typography
              size="md"
              weight="semibold"
              color={theme.colors.on_surface_variant}
            >
              {t.login.truecallerPrefix}
            </Typography>
            <Icon
              name="verified-user"
              size={16}
              color={theme.colors.truecaller}
            />
            <Typography size="md" weight="bold" color={theme.colors.truecaller}>
              {t.login.truecallerSuffix}
            </Typography>
            <Icon
              name="keyboard-arrow-right"
              size={16}
              color={theme.colors.truecaller}
            />
          </TruecallerRow>
        ) : (
          <DummyRow />
        )}
      </InputContainer>

      <Button
        variant="primary"
        icon="arrow-forward"
        onPress={() => onSubmit()}
        loading={loading}
        disabled={isButtonDisabled}
      >
        {t.login.continueButton}
      </Button>

      <TermsContainer>
        <SecurityBadge>
          <Icon name="lock-outline" size={18} color={theme.colors.primary} />
        </SecurityBadge>
        <Typography
          size="xs"
          color={theme.colors.on_surface_variant}
          style={{ flex: 1 }}
        >
          {t.login.termsPrefix}
          <Typography
            size="xs"
            color={theme.colors.primary}
            weight="bold"
            onPress={() => navigation.navigate('TermsAndConditions')}
          >
            {t.login.termsOfService}
          </Typography>
          {t.login.termsAnd}
          <Typography
            size="xs"
            color={theme.colors.primary}
            weight="bold"
            onPress={() => navigation.navigate('TermsAndConditions')}
          >
            {t.login.privacyPolicy}
          </Typography>
          {t.login.termsSuffix}
        </Typography>
      </TermsContainer>
    </FormContainer>
  );
};
