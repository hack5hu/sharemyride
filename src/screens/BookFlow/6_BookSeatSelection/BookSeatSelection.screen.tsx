import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { CarFloorPlan } from '@/components/organisms/CarFloorPlan/CarFloorPlan';
import { SeatLegend } from '@/components/molecules/SeatLegend/SeatLegend';
import { verticalScale } from '@/styles';
import { useBookSeatSelection } from './useBookSeatSelection';
import { BookSeatSelectionProps } from './types';
import * as S from './BookSeatSelection.styles';
import { useTranslation } from '@/hooks/useTranslation';

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
    isBooking,
  } = useBookSeatSelection(rideId);

  const theme = useTheme();
  const { t, translations } = useTranslation();
  const st = translations.selectSeat;
  const isDisabled = seatCount === 0;

  return (
    <S.Root>
      <ScreenShell title={st.headerTitle} onBack={handleBack}>
        <S.ScrollContent showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: verticalScale(240) }}>
          <S.ContentPadding>

            {/* ── Header Intro ── */}
            <View style={{ width: '100%', gap: verticalScale(4), marginBottom: verticalScale(8) }}>
              <Typography variant="title" size="md" weight="bold">{st.title}</Typography>
              <Typography variant="body" size="sm" color={theme.colors.on_surface_variant}>
                {st.subtitle}
              </Typography>
            </View>

            {/* ── Meta Info ── */}
            <S.MetaStrip>
              <S.MetaItem>
                <Typography variant="label" size="sm" weight="bold">
                  {departureDate}
                </Typography>
                <Typography variant="label" size="xs" color="on_surface_variant">{t('common.date')}</Typography>
              </S.MetaItem>
              <S.MetaItem>
                <Typography variant="label" size="sm" weight="bold">
                  {departureTime}
                </Typography>
                <Typography variant="label" size="xs" color="on_surface_variant">{t('common.time')}</Typography>
              </S.MetaItem>
              <S.MetaItem>
                <Typography variant="label" size="sm" weight="bold" numberOfLines={1}>
                  {driverName.split(' ')[0]}
                </Typography>
                <Typography variant="label" size="xs" color="on_surface_variant">{st.driverLabel}</Typography>
              </S.MetaItem>
            </S.MetaStrip>

            {/* ── Legend ── */}
            <View style={{ width: '100%', marginTop: verticalScale(8) }}>
                <SeatLegend
                    availableLabel={st.legendAvailable}
                    selectedLabel={st.legendSelected}
                    occupiedLabel={st.legendBooked}
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
                    driverLabel={st.driverLabel}
                />
            </View>

          </S.ContentPadding>
        </S.ScrollContent>

        {/* ── Fixed Bottom ── */}
        <S.FixedBottom>
          <S.SummaryRow>
            <S.PillBadge>
              <Typography variant="label" size="sm" weight="bold" color="primary">
                {seatCount === 1 ? st.seatSelected : t('selectSeat.seatsSelected', { count: seatCount, seatWord: t('common.seats') })}
              </Typography>
            </S.PillBadge>
            <Typography variant="title" size="md" weight="bold">
              ₹{totalPrice.toFixed(0)}
            </Typography>
          </S.SummaryRow>

          <S.ConfirmButton
            disabled={isDisabled || isBooking}
            onPress={handleConfirm}
            activeOpacity={0.85}
          >
            {isBooking ? (
              <ActivityIndicator color={theme.colors.on_primary} />
            ) : (
              <Typography
                variant="title"
                size="sm"
                weight="bold"
                color={isDisabled ? 'on_surface_variant' : 'on_primary'}
              >
                {isDisabled ? st.pickSeatToContinue : st.bookMySeat}
              </Typography>
            )}
          </S.ConfirmButton>
        </S.FixedBottom>
      </ScreenShell>
    </S.Root>
  );
};
