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
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  onTextChange,
  onFilled,
  error,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <ThirdPartyOtpInput
        numberOfDigits={length}
        focusColor={error ? theme.colors.error : theme.colors.primary}
        onTextChange={onTextChange}
        onFilled={onFilled}
        theme={{
          containerStyle: {
            width: '100%',
            justifyContent: 'space-between',
          },
          pinCodeContainerStyle: {
            backgroundColor: theme.colors.surface_container_lowest,
            width: scale(42),
            height: scale(50),
            borderRadius: theme.roundness.md,
            borderWidth: 1,
            borderColor: error ? theme.colors.error : theme.colors.outline_variant,
            margin:2,
          },
          pinCodeTextStyle: {
            fontFamily: 'Plus Jakarta Sans',
            fontSize: 20,
            fontWeight: '600',
            color: theme.colors.on_surface,
          },
          focusedPinCodeContainerStyle: {
            borderColor: error ? theme.colors.error : theme.colors.primary,
            borderWidth: 2,
          },
        }}
      />
    </Container>
  );
};
