import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import * as S from '../BookingConfirmedTemplate.styles';

export interface BookingDetailCardProps {
  iconName: string;
  label: string;
  value: string;
  subValue?: string;
}

export const BookingDetailCard: React.FC<BookingDetailCardProps> = ({
  iconName,
  label,
  value,
  subValue,
}) => {
  const theme = useTheme();

  return (
    <S.DetailCard>
      <S.DetailCardHeader>
        <S.IconBox>
          <MaterialIcons
            name={iconName}
            size={20}
            color={theme.colors.primary}
          />
        </S.IconBox>
        <Typography
          variant="label"
          size="xs"
          weight="bold"
          color={theme.colors.on_surface_variant}
        >
          {label}
        </Typography>
      </S.DetailCardHeader>
      <S.ValueWrapper>
        <Typography variant="title" size="sm" weight="bold">
          {value}
        </Typography>
        {subValue ? (
          <Typography
            variant="label"
            size="xs"
            color={theme.colors.on_surface_variant}
          >
            {subValue}
          </Typography>
        ) : null}
      </S.ValueWrapper>
    </S.DetailCard>
  );
};
