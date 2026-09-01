import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import * as S from './VehicleCard.styles';

export interface VehicleCardProps {
  company?: string;
  model: string;
  seater: string;
  color?: string;
  type?: string;
  plate?: string;
  isSelected?: boolean;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isAddButton?: boolean;
  fullWidth?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  company,
  model,
  seater,
  color = '#000000',
  type = 'sedan',
  isSelected,
  onPress,
  onEdit,
  onDelete,
  isAddButton,
  fullWidth,
}) => {
  const theme = useTheme();

  const getVehicleIcon = () => {
    switch (type?.toLowerCase()) {
      case 'bike':
        return 'motorcycle';
      case 'suv':
        return 'commute';
      case 'hatchback':
        return 'drive-eta';
      default:
        return 'directions-car';
    }
  };

  if (isAddButton) {
    return (
      <S.AddActionCard onPress={onPress} fullWidth={fullWidth}>
        <S.AddIconCircle>
          <Icon name="add" size={24} color={theme.colors.primary} />
        </S.AddIconCircle>
        <Typography
          variant="label"
          size="xs"
          weight="bold"
          color="primary"
        >
          Add New
        </Typography>
      </S.AddActionCard>
    );
  }

  return (
    <S.CardContainer
      isSelected={isSelected}
      onPress={onPress}
      fullWidth={fullWidth}
    >
      {isSelected && (
        <S.SelectionIndicator>
          <Icon name="check-circle" size={20} color={theme.colors.on_primary} />
        </S.SelectionIndicator>
      )}

      <S.TopRow>
        <S.BrandInfoRow>
          <S.IconBox isSelected={isSelected}>
            <Icon
              name={getVehicleIcon()}
              size={24}
              color={isSelected ? theme.colors.on_primary : theme.colors.primary}
            />
          </S.IconBox>
          <S.InfoBox>
            <S.CompanyRow>
              <S.ColorDot color={color} />
              <S.CompanyText isSelected={isSelected}>
                {company || 'Vehicle'}
              </S.CompanyText>
            </S.CompanyRow>
            <Typography
              variant="title"
              size={fullWidth ? 'md' : 'sm'}
              weight="bold"
              color={isSelected ? 'on_primary' : 'on_surface'}
              numberOfLines={1}
            >
              {model}
            </Typography>
          </S.InfoBox>
        </S.BrandInfoRow>

        {(onEdit || onDelete) && (
          <S.ActionRow>
            {onEdit && (
              <S.ActionButton onPress={onEdit}>
                <Icon name="edit" size={16} color={theme.colors.primary} />
              </S.ActionButton>
            )}
            {onDelete && (
              <S.ActionButton onPress={onDelete}>
                <Icon
                  name="delete-outline"
                  size={16}
                  color={theme.colors.error}
                />
              </S.ActionButton>
            )}
          </S.ActionRow>
        )}
      </S.TopRow>

      <S.BadgesRow>
        <S.SpecPill isSelected={isSelected}>
          <Typography
            variant="label"
            size="xs"
            weight="medium"
            color={isSelected ? 'on_primary' : 'on_surface_variant'}
          >
            {seater}-Seater
          </Typography>
        </S.SpecPill>
        {type && (
          <S.SpecPill isSelected={isSelected}>
            <S.SpecTypeText isSelected={isSelected}>
              {type}
            </S.SpecTypeText>
          </S.SpecPill>
        )}
      </S.BadgesRow>
    </S.CardContainer>
  );
};

