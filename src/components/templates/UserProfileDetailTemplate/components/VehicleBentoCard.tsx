import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled, { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { scale, verticalScale, moderateScale } from '@/styles';
import * as S from '../UserProfileDetailTemplate.styles';

const VehicleContent = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

const VehicleIconBox = styled.View`
  width: ${moderateScale(52)}px;
  height: ${moderateScale(52)}px;
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
  align-items: center;
  justify-content: center;
`;

const VehicleDetails = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

const TagRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  margin-top: ${verticalScale(4)}px;
`;

const CategoryPill = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(6)}px;
`;

export interface VehicleBentoCardProps {
  vehicle: {
    model: string;
    color: string;
    plateNumber: string;
    tag?: string;
  };
  t: any;
}

export const VehicleBentoCard: React.FC<VehicleBentoCardProps> = React.memo(
  ({ vehicle, t }) => {
    const theme = useTheme();

    return (
      <S.SectionCard>
        <S.SectionLabelRow>
          <S.SectionDot color={theme.colors.primary} />
          <Typography
            variant="label"
            size="xs"
            weight="bold"
            color="on_surface_variant"
          >
            {(t.vehicleInfo || 'ASSIGNED VEHICLE').toUpperCase()}
          </Typography>
        </S.SectionLabelRow>

        <VehicleContent>
          <VehicleIconBox>
            <Icon
              name="directions-car"
              size={moderateScale(28)}
              color={theme.colors.primary}
            />
          </VehicleIconBox>
          <VehicleDetails>
            <Typography variant="title" size="sm" weight="bold">
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
              <TagRow>
                <CategoryPill>
                  <Typography
                    variant="label"
                    size="xxs"
                    color="on_surface_variant"
                    weight="medium"
                  >
                    {vehicle.tag}
                  </Typography>
                </CategoryPill>
              </TagRow>
            )}
          </VehicleDetails>
        </VehicleContent>
      </S.SectionCard>
    );
  },
);

VehicleBentoCard.displayName = 'VehicleBentoCard';
