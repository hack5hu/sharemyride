import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import * as S from '../UserProfileDetailTemplate.styles';

export interface VehicleBentoCardProps {
  vehicle: {
    model: string;
    color: string;
    plateNumber: string;
    tag?: string;
  };
  t: any;
}

export const VehicleBentoCard: React.FC<VehicleBentoCardProps> = React.memo(({
  vehicle,
  t,
}) => {
  const theme = useTheme();

  return (
    <S.Section>
      <S.SectionTitleLabel>
        {t.vehicleInfo}
      </S.SectionTitleLabel>
      <S.BentoCard>
        <S.BentoHeader>
          <Typography variant="label" size="sm" color="outline">
            {t.vehicleInfo.toUpperCase()}
          </Typography>
          <Icon
            name="electric-car"
            size={20}
            color={theme.colors.primary}
          />
        </S.BentoHeader>
        <S.VehicleInfo>
          <S.VehicleIconContainer>
            <Icon
              name="directions-car"
              size={30}
              color={theme.colors.primary_container}
            />
          </S.VehicleIconContainer>
          <S.VehicleDetails>
            <Typography variant="title" size="md" weight="bold">
              {vehicle.model}
            </Typography>
            <Typography
              variant="body"
              size="xs"
              weight="medium"
              color="on_surface_variant"
            >
              {vehicle.color} • {vehicle.plateNumber}
            </Typography>
            {vehicle.tag && (
              <S.TagRow>
                <S.StatusDot />
                <Typography
                  variant="label"
                  size="sm"
                  color="primary"
                  weight="bold"
                >
                  {vehicle.tag.toUpperCase()}
                </Typography>
              </S.TagRow>
            )}
          </S.VehicleDetails>
        </S.VehicleInfo>
      </S.BentoCard>
    </S.Section>
  );
});

VehicleBentoCard.displayName = 'VehicleBentoCard';
