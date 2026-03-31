import React from 'react';
import { View } from 'react-native';
import { Input } from '../../atoms/Input';
import { Tag } from '../../atoms/Tag';
import { Container, TagRow } from './LocationInput.styles';
import { useTranslation } from '@/hooks/useTranslation';

export interface LocationInputProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  onPressNearby?: () => void;
  onPressGlobal?: () => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  label,
  value,
  onValueChange,
  onPressNearby,
  onPressGlobal,
}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Input
        label={label}
        value={value}
        onChangeText={onValueChange}
        placeholder={t('profileSetup.locationPlaceholder')}
        leftIcon="location-on"
      />
      <TagRow>
        <Tag active onPress={onPressNearby}>
          {t('profileSetup.nearbyOnly')}
        </Tag>
        <Tag onPress={onPressGlobal}>
          {t('profileSetup.globalReach')}
        </Tag>
      </TagRow>
    </Container>
  );
};
