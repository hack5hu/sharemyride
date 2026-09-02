import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { type DefaultTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { type VEHICLE_TYPES } from '@/constants/ride';
import { type VehicleType } from '@/screens/Profile/VehicleDetails/types.d';
import * as S from '../VehicleDetailsTemplate.styles';

interface VehicleTypeSectionProps {
  vehicleTypes: typeof VEHICLE_TYPES;
  selectedType: VehicleType;
  setVehicleType: (type: VehicleType) => void;
  isLoading: boolean;
  theme: DefaultTheme;
  t: (key: string, params?: Record<string, string | number>) => string;
}

export const VehicleTypeSection: React.FC<VehicleTypeSectionProps> = React.memo(
  ({
    vehicleTypes,
    selectedType,
    setVehicleType,
    isLoading,
    theme,
    t,
  }) => {
    const selectedTypeObj = vehicleTypes.find(v => v.type === selectedType);

    return (
      <S.CardSection>
        <S.SectionHeader>
          <S.SectionTitleRow>
            <Icon name="category" size={18} color={theme.colors.primary} />
            <S.SectionTitleText>
              {t('vehicleDetails.vehicleType')}
            </S.SectionTitleText>
          </S.SectionTitleRow>
          {selectedTypeObj && (
            <S.ActiveValuePill>
              <Typography
                variant="label"
                size="xs"
                weight="bold"
                color="primary"
              >
                {t(`vehicleDetails.${selectedTypeObj.type}`)}
              </Typography>
            </S.ActiveValuePill>
          )}
        </S.SectionHeader>

        <S.TypeSelectorRow>
          {vehicleTypes
            .filter(v => v.type !== 'bike')
            .map(v => {
              const isSelected = selectedType === v.type;

              return (
                <S.TypeCard
                  key={v.type}
                  selected={isSelected}
                  onPress={isLoading ? () => {} : () => setVehicleType(v.type)}
                >
                  <Icon
                    name={v.icon}
                    size={24}
                    color={
                      isSelected
                        ? theme.colors.on_primary
                        : theme.colors.on_surface_variant
                    }
                  />
                  <Typography
                    variant="label"
                    size="xs"
                    weight={isSelected ? 'bold' : 'medium'}
                    color={isSelected ? 'on_primary' : 'on_surface_variant'}
                  >
                    {t(`vehicleDetails.${v.type}`)}
                  </Typography>
                </S.TypeCard>
              );
            })}
        </S.TypeSelectorRow>
      </S.CardSection>
    );
  },
);
