import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { CarFloorPlan } from '@/components/organisms/CarFloorPlan/CarFloorPlan';
import { SeatLegend } from '@/components/molecules/SeatLegend/SeatLegend';
import { moderateScale, scale, verticalScale } from '@/styles';
import { useBookSeatSelection } from './useBookSeatSelection';
import { BookSeatSelectionProps } from './types';
import * as S from './BookSeatSelection.styles';

export const BookSeatSelectionScreen: React.FC<BookSeatSelectionProps> = ({ route }) => {
  const { rideId } = route.params;
  const {
    rows,
    selectedSeats,
    occupiedSeats,
    prices,
    totalPrice,
    seatCount,
    vehicleType,
    toggleSeat,
    handleBack,
    handleConfirm,
    driverName,
    vehicleRegistration,
    departureDate,
    departureTime,
  } = useBookSeatSelection(rideId);

  const theme = useTheme();
  const isDisabled = seatCount === 0;

  return (
    <S.Root>
      <ScreenShell title="Select your seats" onBack={handleBack}>
        <S.ScrollContent showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: verticalScale(240) }}>
          <S.ContentPadding>

            {/* ── Header Intro ── */}
            <View style={{ width: '100%', gap: verticalScale(4), marginBottom: verticalScale(8) }}>
              <Typography variant="title" size="md" weight="bold">Select a seat</Typography>
              <Typography variant="body" size="sm" color={theme.colors.on_surface_variant}>
                Choose your preferred seat from the available options.
              </Typography>
            </View>

            {/* ── Meta Info ── */}
            <S.MetaStrip>
              <S.MetaItem>
                <Typography variant="label" size="sm" weight="bold">
                  {departureDate}
                </Typography>
                <Typography variant="label" size="xs" color="on_surface_variant">Date</Typography>
              </S.MetaItem>
              <S.MetaItem>
                <Typography variant="label" size="sm" weight="bold">
                  {departureTime}
                </Typography>
                <Typography variant="label" size="xs" color="on_surface_variant">Time</Typography>
              </S.MetaItem>
              <S.MetaItem>
                <Typography variant="label" size="sm" weight="bold" numberOfLines={1}>
                  {driverName.split(' ')[0]}
                </Typography>
                <Typography variant="label" size="xs" color="on_surface_variant">Driver</Typography>
              </S.MetaItem>
            </S.MetaStrip>

            {/* ── Legend ── */}
            <View style={{ width: '100%', marginTop: verticalScale(8) }}>
                <SeatLegend
                    availableLabel="Available"
                    selectedLabel="Selected"
                    occupiedLabel="Occupied"
                />
            </View>

            {/* ── Car plan ── */}
            <View style={{ marginTop: verticalScale(16) }}>
                <CarFloorPlan
                    rows={rows}
                    selectedSeats={selectedSeats}
                    occupiedSeats={occupiedSeats}
                    prices={prices}
                    onSeatPress={toggleSeat}
                    driverLabel="Driver"
                />
            </View>

          </S.ContentPadding>
        </S.ScrollContent>

        {/* ── Fixed Bottom ── */}
        <S.FixedBottom>
          <S.SummaryRow>
            <S.PillBadge>
              <Typography variant="label" size="sm" weight="bold" color="primary">
                {seatCount} {seatCount === 1 ? 'seat' : 'seats'} selected
              </Typography>
            </S.PillBadge>
            <Typography variant="title" size="md" weight="bold">
              ₹{totalPrice.toFixed(0)}
            </Typography>
          </S.SummaryRow>

          <S.ConfirmButton
            disabled={isDisabled}
            onPress={handleConfirm}
            activeOpacity={0.85}
          >
            <Typography
              variant="title"
              size="sm"
              weight="bold"
              color={isDisabled ? 'on_surface_variant' : 'on_primary'}
            >
              {isDisabled ? 'Pick a Seat to Continue' : 'Book My Seat'}
            </Typography>
          </S.ConfirmButton>
        </S.FixedBottom>
      </ScreenShell>
    </S.Root>
  );
};
