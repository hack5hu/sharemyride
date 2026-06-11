import React from 'react';
import { OtpInput as ThirdPartyOtpInput } from 'react-native-otp-entry';
import { useTheme } from 'styled-components/native';
import { Container } from './OtpInput.styles';
import { scale } from '@/styles';

export interface OtpInputProps {
  length?: number;
  onTextChange: (text: string) => void;
  onFilled?: (text: string) => void;
  error?: boolean;
  disabled?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  onTextChange,
  onFilled,
  error,
  disabled,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <ThirdPartyOtpInput
        numberOfDigits={length}
        focusColor={error ? theme.colors.error : theme.colors.primary}
        onTextChange={onTextChange}
        onFilled={onFilled}
        disabled={disabled}
        theme={{
          containerStyle: {
            width: '100%',
            justifyContent: 'space-between',
          },
          pinCodeContainerStyle: {
            backgroundColor: error
              ? theme.colors.error_container
              : theme.colors.surface_container,
            width: scale(44),
            height: scale(54),
            borderRadius: theme.roundness.md,
            borderWidth: 0,
            margin: 2,
            /* Subtle shadow to separate fields cleanly */
            elevation: 1,
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.03,
            shadowRadius: 2,
          },
          pinCodeTextStyle: {
            fontFamily: 'Plus Jakarta Sans',
            fontSize: scale(20),
            fontWeight: '700',
            color: error
              ? theme.colors.on_error_container
              : theme.colors.on_surface,
          },
          focusedPinCodeContainerStyle: {
            backgroundColor: theme.colors.surface_container_lowest,
            borderWidth: 0,
            elevation: 3,
            shadowColor: theme.colors.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
          },
        }}
      />
    </Container>
  );
};
