import React from 'react';
import { View } from 'react-native';
import { Button } from '../../atoms/Button';
import { Typography } from '../../atoms/Typography';
import { useTheme } from 'styled-components/native';
import { Container, ButtonRow } from './GenderSelector.styles';
import { useTranslation } from '@/hooks/useTranslation';

export interface GenderSelectorProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({
  label,
  value,
  onValueChange,
  required,
  disabled,
}) => {
  const { t } = useTranslation();

  const options = [
    { label: t('profileSetup.genderMale'), value: 'male' },
    { label: t('profileSetup.genderFemale'), value: 'female' },
    { label: t('profileSetup.genderOther'), value: 'other' },
  ];

  return (
    <Container>
      <Typography
        variant="label"
        size="sm"
        weight="bold"
        color="on_surface_variant"
        style={{ marginBottom: 8, textTransform: 'uppercase' }}
      >
        {label}
        {required && (
          <Typography variant="label" size="sm" color="error">
            {' '}
            *
          </Typography>
        )}
      </Typography>
      <ButtonRow style={{ opacity: disabled ? 0.6 : 1 }}>
        {options.map(option => (
          <View key={option.value} style={{ flex: 1, marginHorizontal: 4 }}>
            <Button
              variant={value === option.value ? 'primary' : 'secondary'}
              onPress={disabled ? undefined : () => onValueChange(option.value)}
              style={{ height: 48 }}
              disabled={disabled}
            >
              {option.label}
            </Button>
          </View>
        ))}
      </ButtonRow>
    </Container>
  );
};
