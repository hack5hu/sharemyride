import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { 
  GridRow, 
  GridCard, 
  GridCardHeader, 
  GridCardLabel, 
  GridCardValue, 
  GridCardSub, 
  EditButton 
} from './InfoGrid.styles';
import { moderateScale } from '@/styles';

interface InfoGridProps {
  vehicle: any;
  pricing: any;
  onEditVehicle: () => void;
  onEditPricing: () => void;
}

export const InfoGrid: React.FC<InfoGridProps> = ({ vehicle, pricing, onEditVehicle, onEditPricing }) => {
  const theme = useTheme();

  return (
    <GridRow>
      <GridCard>
        <GridCardHeader>
          <GridCardLabel>Vehicle</GridCardLabel>
          <EditButton onPress={onEditVehicle}>
            <Icon name="edit" size={moderateScale(12)} color={theme.colors.primary} />
          </EditButton>
        </GridCardHeader>
        <Icon name={vehicle?.icon || 'directions-car'} size={moderateScale(24)} color={theme.colors.primary} />
        <GridCardValue numberOfLines={1}>{vehicle?.name || 'Loading...'}</GridCardValue>
        <GridCardSub>{vehicle?.numberplate || '---'}</GridCardSub>
      </GridCard>

      <GridCard>
        <GridCardHeader>
          <GridCardLabel>Pricing</GridCardLabel>
          <EditButton onPress={onEditPricing}>
            <Icon name="edit" size={moderateScale(12)} color={theme.colors.primary} />
          </EditButton>
        </GridCardHeader>
        <Icon name="payments" size={moderateScale(24)} color={theme.colors.tertiary} />
        <GridCardValue>{pricing?.pricePerSeat}</GridCardValue>
        <GridCardSub>{pricing?.seatCount} Seats Offered</GridCardSub>
      </GridCard>
    </GridRow>
  );
};
