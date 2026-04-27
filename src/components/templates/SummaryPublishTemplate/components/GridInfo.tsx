import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { moderateScale } from '@/styles';
import { 
  GridRow, 
  GridCard, 
  SectionHeader, 
  SectionLabel, 
  EditButton, 
  GridCardValue, 
  GridCardSub, 
  EmptyStateWrapper, 
  EmptyStateText 
} from './GridInfo.styles';

interface GridInfoProps {
  vehicle: any;
  pricing: any;
  onEditVehicle: () => void;
  onEditSeats: () => void;
  t: any;
}

export const GridInfo: React.FC<GridInfoProps> = ({ 
  vehicle, 
  pricing, 
  onEditVehicle, 
  onEditSeats, 
  t 
}) => {
  const theme = useTheme();

  return (
    <GridRow>
      <GridCard>
        <SectionHeader>
          <Icon name="directions-car" size={moderateScale(20)} color={theme.colors.primary} />
          <EditButton onPress={onEditVehicle} activeOpacity={0.7}>
            <Icon name="edit" size={moderateScale(16)} color={theme.colors.primary} />
          </EditButton>
        </SectionHeader>
        <SectionLabel>{t.vehicleLabel}</SectionLabel>
        {vehicle ? (
          <>
            <GridCardValue numberOfLines={1}>{vehicle.name}</GridCardValue>
            <GridCardSub numberOfLines={1}>{vehicle.subText}</GridCardSub>
            <GridCardSub numberOfLines={1}>{vehicle.numberplate}</GridCardSub>
          </>
        ) : (
          <EmptyStateWrapper onPress={onEditVehicle}>
            <EmptyStateText>{t.addVehicleLabel}</EmptyStateText>
          </EmptyStateWrapper>
        )}
      </GridCard>

      <GridCard>
        <SectionHeader>
          <Icon name="group" size={moderateScale(20)} color={theme.colors.primary} />
          <EditButton onPress={onEditSeats} activeOpacity={0.7}>
            <Icon name="edit" size={moderateScale(16)} color={theme.colors.primary} />
          </EditButton>
        </SectionHeader>
        <SectionLabel>{t.availabilityLabel}</SectionLabel>
        <GridCardValue>{pricing.seatCount} Seats</GridCardValue>
        <GridCardSub>{pricing.pricePerSeat} per seat</GridCardSub>
      </GridCard>
    </GridRow>
  );
};
