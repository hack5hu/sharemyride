import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { scale, verticalScale } from '@/styles';
import { CarFloorPlan, FIVE_SEATER_ROWS, SEVEN_SEATER_ROWS } from '@/components/organisms/CarFloorPlan';
import { SeatLegend } from '@/components/molecules/SeatLegend/SeatLegend';
import { VehicleType } from '@/components/molecules/VehicleToggle/VehicleToggle';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { VehicleHorizontalList } from '@/components/molecules/VehicleHorizontalList/VehicleHorizontalList';
import { Vehicle } from '@/store/useVehicleStore';
import * as S from './SeatSelectionTemplate.styles';

export interface SeatSelectionTemplateProps {
  flow: 'publish' | 'book';
  selectedSeats: Set<string>;
  vehicleType: VehicleType;
  seatIdsLabel: string;
  onSeatPress: (id: string) => void;
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  onVehicleSelect: (id: string) => void;
  onAddNewVehicle: () => void;
  onBackPress: () => void;
  onContinue: () => void;
  t: any;
}

export const SeatSelectionTemplate: React.FC<SeatSelectionTemplateProps> = ({
  flow,
  selectedSeats,
  vehicleType,
  seatIdsLabel,
  onSeatPress,
  vehicles,
  selectedVehicleId,
  onVehicleSelect,
  onAddNewVehicle,
  onBackPress,
  onContinue,
  t,
}) => {
  const theme = useTheme();
  const rows = vehicleType === '7' ? SEVEN_SEATER_ROWS : FIVE_SEATER_ROWS;
  return (
    <ScreenShell
      title={'Select your seats'}
      onBack={onBackPress}
    >
      <S.ContentScroll showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: verticalScale(240) }}>
        <View style={{ paddingHorizontal: scale(24), marginTop: verticalScale(12), marginBottom: verticalScale(8), gap: verticalScale(4) }}>
          <Typography variant="title" size="md" weight="bold">{t.title}</Typography>
          <Typography variant="body" size="sm" color={theme.colors.on_surface_variant}>{t.subtitle}</Typography>
        </View>

        <View style={{ marginTop: verticalScale(16) }}>
          <VehicleHorizontalList
            vehicles={vehicles}
            selectedId={selectedVehicleId}
            onSelect={onVehicleSelect}
            onAddNew={onAddNewVehicle}
            title={t.yourVehicles || 'Your Vehicles'}
          />

          <SeatLegend
            availableLabel={t.legendAvailable || 'Available'}
            selectedLabel={t.legendSelected || 'Selected'}
            occupiedLabel={t.legendOccupied || 'Occupied'}
          />
        </View>

        <View >
          <CarFloorPlan
            rows={rows}
            selectedSeats={selectedSeats}
            onSeatPress={onSeatPress}
            driverLabel={t.driverLabel}
          />
        </View>
      </S.ContentScroll>
      <S.BarWrapper>
      <S.ContinueButton onPress={onContinue} activeOpacity={0.9} disabled={selectedSeats.size === 0}>
        <S.ContinueGradient
          colors={[theme.colors.primary_container, theme.colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <S.ContinueText>{selectedSeats.size} {selectedSeats.size === 1 ? 'Seat' : 'Seats'} Selected</S.ContinueText>
        </S.ContinueGradient>
      </S.ContinueButton>
      </S.BarWrapper>
    </ScreenShell>
  );
};
