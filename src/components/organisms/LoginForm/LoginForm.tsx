import React from 'react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import { InfoBox } from '../../molecules/InfoBox';
import { useLocale } from '@/constants/localization';
import { Card, FormContainer } from './LoginForm.styles';
import { LoginFormProps } from './types';

export const LoginForm: React.FC<LoginFormProps> = ({
  value,
  onChangeText,
  onBlur,
  error,
  onSubmit,
  isValid,
  loading,
}) => {
  const t = useLocale();

  return (
    <FormContainer>
      <Input
        label={t.login.phoneLabel}
        placeholder={t.login.phonePlaceholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        error={error}
        keyboardType="phone-pad"
        maxLength={10}
      />
      <Button
        variant="primary"
        icon="arrow-forward"
        onPress={onSubmit as any}
        loading={loading}
        disabled={!isValid}
      >
        {t.login.getOtp}
      </Button>

      <InfoBox>{t.login.otpInfoBox}</InfoBox>
      {/* <Footer>
        <Typography variant="body" size="sm" color="on_surface_variant">
          {t.login.noAccount}{' '}
          <Typography variant="body" size="sm" weight="bold" color="primary">
            {t.login.signUp}
          </Typography>
        </Typography>
          {/* </Footer>  */}
    </FormContainer>
  );
};
