import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';
import * as S from './RideVehicleCard.styles';

interface RideVehicleCardProps {
  vehicle: {
    company: string;
    model: string;
    plateNumber: string;
    color: string;
    type: string;
  };
  t: any;
}

export const RideVehicleCard: React.FC<RideVehicleCardProps> = ({ vehicle, t }) => {
  const theme = useTheme();

  const VEHICLE_TYPE_LABELS: Record<string, string> = {
    CAR_4_SEATER: t.compactSedan,
    CAR_7_SEATER: t.premiumSuv,
    BIKE: t.swiftBike,
  };

  return (
    <S.VehicleCard>
      <S.VehicleLabelRow>
        <S.SectionDot color={theme.colors.primary} />
        <Typography variant="label" size="xs" weight="bold" color="on_surface_variant">
          {t.assignedVehicle || 'ASSIGNED VEHICLE'}
        </Typography>
      </S.VehicleLabelRow>

      <S.MainRow>
        <S.VehicleIconBox>
          <Icon
            name={vehicle.type === 'BIKE' ? 'motorcycle' : 'directions-car'}
            size={moderateScale(32)}
            color={theme.colors.primary}
          />
        </S.VehicleIconBox>

        <S.VehicleDetails>
          <Typography variant="title" size="sm" weight="bold">
            {vehicle.company} {vehicle.model}
          </Typography>

          <S.PlateRow>
            <S.PlateBadge>
              <Typography variant="label" size="xs" weight="bold" color="on_surface">
                {vehicle.plateNumber}
              </Typography>
            </S.PlateBadge>
            <S.CategoryPill>
              <Typography variant="label" size="xs" weight="medium" color="on_surface_variant">
                {VEHICLE_TYPE_LABELS[vehicle.type] || t.standardVehicle || 'Standard'}
              </Typography>
            </S.CategoryPill>
          </S.PlateRow>
        </S.VehicleDetails>
      </S.MainRow>
    </S.VehicleCard>
  );
};

