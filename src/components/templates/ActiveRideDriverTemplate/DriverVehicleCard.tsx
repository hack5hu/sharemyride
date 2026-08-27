import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import { DriverVehicleInfo } from './types.d';
import * as S from './DriverVehicleCard.styles';

export interface DriverVehicleCardProps {
  vehicleInfo: DriverVehicleInfo;
  batteryRemainingText: string;
}

export const DriverVehicleCard: React.FC<DriverVehicleCardProps> = React.memo(
  ({ vehicleInfo, batteryRemainingText }) => {
    const theme = useTheme();

    return (
      <S.VehicleCard>
        <S.VehicleTopRow>
          <S.VehicleIconContainer>
            <Icon
              name="directions-car"
              size={moderateScale(22)}
              color={theme.colors.primary}
            />
          </S.VehicleIconContainer>
          <S.VehicleInfoGroup>
            <S.VehicleTitleText numberOfLines={1}>
              {vehicleInfo.company}{' '}
              <S.VehicleModelLight>{vehicleInfo.model}</S.VehicleModelLight>
            </S.VehicleTitleText>
          </S.VehicleInfoGroup>
        </S.VehicleTopRow>
        <S.VehicleBadgesRow>
          {!!vehicleInfo.color && (
            <S.VehicleBadge>
              <S.ColorDot />
              <S.VehicleBadgeText>{vehicleInfo.color}</S.VehicleBadgeText>
            </S.VehicleBadge>
          )}
          {!!vehicleInfo.type && (
            <S.VehicleBadge>
              <S.VehicleBadgeText>{vehicleInfo.type}</S.VehicleBadgeText>
            </S.VehicleBadge>
          )}
          {!!vehicleInfo.licensePlate && (
            <S.VehicleBadge>
              <S.VehicleBadgeText>{vehicleInfo.licensePlate}</S.VehicleBadgeText>
            </S.VehicleBadge>
          )}
          {vehicleInfo.batteryPercentage !== undefined && (
            <S.VehicleBadge>
              <S.VehicleBadgeText>
                {batteryRemainingText.replace(
                  '{{percent}}',
                  String(vehicleInfo.batteryPercentage),
                )}
              </S.VehicleBadgeText>
            </S.VehicleBadge>
          )}
        </S.VehicleBadgesRow>
      </S.VehicleCard>
    );
  },
);

DriverVehicleCard.displayName = 'DriverVehicleCard';
