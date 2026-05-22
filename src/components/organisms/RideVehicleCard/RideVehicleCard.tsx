import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';
import * as S from './RideVehicleCard.styles';

interface RideVehicleCardProps {
  vehicle?: {
    company?: string;
    model?: string;
    plateNumber?: string;
    color?: string;
    type?: string;
  };
  t: Record<string, string>;
}

export const RideVehicleCard: React.FC<RideVehicleCardProps> = ({ vehicle, t }) => {
  const theme = useTheme();

  if (!vehicle) return null;

  const VEHICLE_TYPE_LABELS: Record<string, string> = {
    CAR_4_SEATER: t.compactSedan || 'Compact Sedan',
    CAR_7_SEATER: t.premiumSuv || 'Premium SUV',
    BIKE: t.swiftBike || 'Swift Bike',
  };

  const capitalizeText = (str?: string): string => {
    if (!str) return '';
    return str
      .trim()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const getColorHex = (colorName?: string): string | null => {
    if (!colorName) return null;
    const name = colorName.toLowerCase().trim();
    const colorMap: Record<string, string> = {
      red: '#e11d48',
      blue: '#2563eb',
      green: '#16a34a',
      black: '#1e293b',
      white: '#ffffff',
      grey: '#475569',
      gray: '#475569',
      silver: '#94a3b8',
      gold: '#d97706',
      bronze: '#b45309',
      yellow: '#ca8a04',
      orange: '#ea580c',
      brown: '#7c2d12',
      '#000000': '#1e293b',
      '#ffffff': '#ffffff',
    };
    return colorMap[name] || name;
  };

  const getColorName = (colorName?: string): string => {
    if (!colorName) return '';
    const name = colorName.toLowerCase().trim();
    const friendlyMap: Record<string, string> = {
      '#000000': 'Black',
      black: 'Black',
      '#ffffff': 'White',
      white: 'White',
      '#808080': 'Grey',
      '#a9a9a9': 'Grey',
      grey: 'Grey',
      gray: 'Grey',
      '#475569': 'Slate',
      '#94a3b8': 'Silver',
      silver: 'Silver',
      '#ef4444': 'Red',
      '#e11d48': 'Red',
      red: 'Red',
      '#3b82f6': 'Blue',
      '#2563eb': 'Blue',
      blue: 'Blue',
    };

    if (friendlyMap[name]) return friendlyMap[name];
    if (name.startsWith('#')) return 'Colored';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const colorHex = getColorHex(vehicle.color);
  const colorName = getColorName(vehicle.color);
  const showPlate = vehicle.plateNumber && vehicle.plateNumber.trim().length > 0;

  const displayCompany = capitalizeText(vehicle.company);
  const displayModel = capitalizeText(vehicle.model);

  return (
    <S.VehicleCard>
      <S.VehicleLabelRow>
        <S.SectionDot color={theme.colors.primary} />
        <Typography variant="label" size="xs" weight="bold" color="on_surface_variant">
          {(t.assignedVehicle || 'ASSIGNED VEHICLE').toUpperCase()}
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
            {displayCompany} {displayModel}
          </Typography>

          <S.PlateRow>
            {showPlate && (
              <S.PlateBadge>
                <Typography variant="label" size="xs" weight="bold" color="on_surface">
                  {vehicle.plateNumber!.toUpperCase()}
                </Typography>
              </S.PlateBadge>
            )}
            <S.CategoryPill>
              <Typography variant="label" size="xs" weight="medium" color="on_surface_variant">
                {VEHICLE_TYPE_LABELS[vehicle.type || ''] || t.standardVehicle || 'Standard'}
              </Typography>
            </S.CategoryPill>

            {colorHex && (
              <S.ColorPill>
                <S.ColorDot colorHex={colorHex} />
                <Typography variant="label" size="xs" weight="medium" color="on_surface_variant">
                  {colorName}
                </Typography>
              </S.ColorPill>
            )}
          </S.PlateRow>
        </S.VehicleDetails>
      </S.MainRow>
    </S.VehicleCard>
  );
};



