import React from 'react';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { CarFloorPlan, FIVE_SEATER_ROWS, SEVEN_SEATER_ROWS } from '@/components/organisms/CarFloorPlan';
import { SeatLegend } from '@/components/molecules/SeatLegend/SeatLegend';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Button } from '@/components/atoms/Button';
import { VehicleHorizontalList } from '@/components/molecules/VehicleHorizontalList/VehicleHorizontalList';
import * as S from './SeatSelectionTemplate.styles';
import { SeatSelectionTemplateProps } from './types';

export const SeatSelectionTemplate: React.FC<SeatSelectionTemplateProps> = React.memo(({
  selectedSeats,
  vehicleType,
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

  const renderSeatSelection = () => {
    if (!selectedVehicleId) {
      return (
        <S.EmptyStateContainer>
          <S.EmptyStateText
            variant="body"
            size="lg"
            color={theme.colors.on_surface_variant}
          >
            {t.selectVehicleFirst}
          </S.EmptyStateText>
        </S.EmptyStateContainer>
      );
    }

    return (
      <>
        <S.LegendWrapper>
          <SeatLegend
            availableLabel={t.legendAvailable}
            selectedLabel={t.legendSelected}
            occupiedLabel={t.legendOccupied}
          />
        </S.LegendWrapper>

        <S.FloorPlanWrapper>
          <CarFloorPlan
            rows={rows}
            selectedSeats={selectedSeats}
            onSeatPress={onSeatPress}
            driverLabel={t.driverLabel}
          />
        </S.FloorPlanWrapper>
      </>
    );
  };

  return (
    <ScreenShell
      title={t.headerTitle}
      onBack={onBackPress}
    >
      <S.ContentScroll
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }}
      >

        <S.VehicleListWrapper>
          <VehicleHorizontalList
            vehicles={vehicles}
            selectedId={selectedVehicleId}
            onSelect={onVehicleSelect}
            onAddNew={onAddNewVehicle}
            title={t.yourVehicles}
          />
        </S.VehicleListWrapper>

        <S.TitleContainer>
          <Typography variant="title" size="md" weight="bold">
            {t.title}
          </Typography>
          <Typography
            variant="body"
            size="sm"
            color={theme.colors.on_surface_variant}
          >
            {t.subtitle}
          </Typography>
        </S.TitleContainer>

        {renderSeatSelection()}
      </S.ContentScroll>

      <S.BarWrapper>
        <Button
          onPress={onContinue}
          disabled={selectedSeats.size === 0 || !selectedVehicleId}
          variant="primary"
        >
          {`${selectedSeats.size} ${selectedSeats.size === 1 ? t.seatSelected : t.seatsSelected}`}
        </Button>
      </S.BarWrapper>
    </ScreenShell>
  );
});

SeatSelectionTemplate.displayName = 'SeatSelectionTemplate';
