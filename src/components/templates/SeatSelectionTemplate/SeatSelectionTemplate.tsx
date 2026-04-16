import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { scale, verticalScale } from '@/styles';
import { CarFloorPlan, FIVE_SEATER_ROWS, SEVEN_SEATER_ROWS } from '@/components/organisms/CarFloorPlan';
import { SeatLegend } from '@/components/molecules/SeatLegend/SeatLegend';
import { SeatSummaryBar } from '@/components/molecules/SeatSummaryBar/SeatSummaryBar';
import { VehicleToggle, VehicleType } from '@/components/molecules/VehicleToggle/VehicleToggle';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './SeatSelectionTemplate.styles';

export interface SeatSelectionTemplateProps {
  flow: 'publish' | 'book';
  selectedSeats: Set<string>;
  vehicleType: VehicleType;
  seatIdsLabel: string;
  onSeatPress: (id: string) => void;
  onVehicleTypeChange: (type: VehicleType) => void;
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
  onVehicleTypeChange,
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

        <View style={{ padding: scale(24) }}>

          <VehicleToggle
            selected={vehicleType}
            onSelect={onVehicleTypeChange}
            fiveSeaterLabel={t.fiveSeater || '5 Seater'}
            sevenSeaterLabel={t.sevenSeater || '7 Seater'}
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

      <SeatSummaryBar
        flow={flow}
        seatCount={selectedSeats.size}
        moneyValue={''}
        seatIdLabel={seatIdsLabel}
        summaryTitle={t.seatsOffering || 'Seats Offered'}
        moneyLabel={t.estEarnings || 'Est. Earnings'}
        continueLabel={t.continue || 'Continue'}
        onContinue={onContinue}
      />
    </ScreenShell>
  );
};
