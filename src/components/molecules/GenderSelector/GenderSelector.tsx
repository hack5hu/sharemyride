import React from 'react';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import {
  Container,
  ButtonRow,
  OptionWrapper,
  StyledLabel,
} from './GenderSelector.styles';

export interface GenderSelectorProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
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
      <StyledLabel
        variant="label"
        size="sm"
        weight="bold"
        color="on_surface_variant"
      >
        {label}
        {required && (
          <Typography variant="label" size="sm" color="error">
            {' '}
            *
          </Typography>
        )}
      </StyledLabel>
      <ButtonRow disabled={disabled}>
        {options.map(option => (
          <OptionWrapper key={option.value}>
            <Button
              variant={value === option.value ? 'primary' : 'secondary'}
              onPress={disabled ? undefined : () => onValueChange(option.value)}
              disabled={disabled}
            >
              {option.label}
            </Button>
          </OptionWrapper>
        ))}
      </ButtonRow>
    </Container>
  );
};
