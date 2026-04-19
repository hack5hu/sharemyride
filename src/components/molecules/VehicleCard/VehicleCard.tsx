import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';
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
  type = 'CAR',
  plate,
  isSelected,
  onPress,
  onEdit,
  onDelete,
  isAddButton,
  fullWidth,
}) => {
  const theme = useTheme();

  if (isAddButton) {
    return (
      <S.AddActionCard onPress={onPress} fullWidth={fullWidth}>
        <S.AddIconCircle>
          <Icon name="add" size={24} color={theme.colors.outline} />
        </S.AddIconCircle>
        <Typography variant="label" size="xs" weight="bold" color={theme.colors.outline}>
          Add New
        </Typography>
      </S.AddActionCard>
    );
  }

  return (
    <S.CardContainer isSelected={isSelected} onPress={onPress} fullWidth={fullWidth}>
      {isSelected && (
        <S.SelectionIndicator>
          <Icon name="check-circle" size={18} color={theme.colors.primary} />
        </S.SelectionIndicator>
      )}
      
      <S.IconBox>
        <Icon 
          name={type === 'bike' ? 'motorcycle' : 'directions-car'} 
          size={fullWidth ? 40 : 32} 
          color={isSelected ? theme.colors.primary : theme.colors.outline} 
        />
      </S.IconBox>

      <S.InfoBox>
        <S.CompanyRow>
          <S.ColorDot color={color} />
          <Typography variant="label" size={fullWidth ? 'sm' : 'xxs'} weight="bold" color={theme.colors.primary} style={{ textTransform: 'uppercase' }}>
            {company || 'Vehicle'}
          </Typography>
        </S.CompanyRow>
        
        <Typography variant="title" size={fullWidth ? 'md' : 'xs'} weight="bold" numberOfLines={1}>
          {model} • {seater}-Seater 
        </Typography>
        
        <Typography variant="body" size={fullWidth ? 'sm' : 'xs'} color={theme.colors.on_surface_variant}>
          {(plate || '').toUpperCase()}
        </Typography>
      </S.InfoBox>

      {(onEdit || onDelete) && (
        <S.ActionRow>
          {onEdit && (
            <S.ActionButton onPress={onEdit}>
              <Icon name="edit" size={18} color={theme.colors.primary} />
            </S.ActionButton>
          )}
          {onDelete && (
            <S.ActionButton onPress={onDelete}>
              <Icon name="delete-outline" size={18} color={theme.colors.error} />
            </S.ActionButton>
          )}
        </S.ActionRow>
      )}
    </S.CardContainer>
  );
};
