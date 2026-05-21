import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Button } from '@/components/atoms/Button';
import { CarFloorPlan } from '@/components/organisms/CarFloorPlan/CarFloorPlan';
import { SeatLegend } from '@/components/molecules/SeatLegend/SeatLegend';
import { verticalScale, moderateScale } from '@/styles';
import * as S from './BookSeatSelectionTemplate.styles';
import { BookSeatSelectionTemplateProps } from './types.d';

export const BookSeatSelectionTemplate: React.FC<BookSeatSelectionTemplateProps> = ({
  t,
  st,
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
  passengers,
  isBooking,
  isDisabled,
}) => {
  const theme = useTheme();

  return (
    <S.Root>
      <ScreenShell title={st.headerTitle} onBack={handleBack}>
        <S.ScrollContent showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: verticalScale(240) }}>
          <S.ContentPadding>

            {/* ── Header Intro ── */}
            <S.HeaderIntro>
              <Typography variant="title" size="md" weight="bold">{st.title}</Typography>
              <Typography variant="body" size="sm" color={theme.colors.on_surface_variant}>
                {st.subtitle}
              </Typography>
            </S.HeaderIntro>

            {/* ── Meta Info ── */}
            <S.MetaStrip>
              <S.MetaItem>
                <Typography variant="label" size="sm" weight="bold">
                  {departureDate}
                </Typography>
                <Typography variant="label" size="xs" color={theme.colors.on_surface_variant}>{t('common.date')}</Typography>
              </S.MetaItem>
              <S.MetaItem>
                <Typography variant="label" size="sm" weight="bold">
                  {departureTime}
                </Typography>
                <Typography variant="label" size="xs" color={theme.colors.on_surface_variant}>{t('common.time')}</Typography>
              </S.MetaItem>
              <S.MetaItem>
                <Typography variant="label" size="sm" weight="bold" numberOfLines={1}>
                  {driverName.split(' ')[0]}
                </Typography>
                <Typography variant="label" size="xs" color={theme.colors.on_surface_variant}>{st.driverLabel}</Typography>
              </S.MetaItem>
            </S.MetaStrip>

            {/* ── Legend ── */}
            <S.LegendWrapper>
                <SeatLegend
                    availableLabel={st.legendAvailable}
                    selectedLabel={st.legendSelected}
                    occupiedLabel={st.legendBooked}
                />
            </S.LegendWrapper>

            {/* ── Car plan ── */}
            <S.CarPlanWrapper>
                <CarFloorPlan
                    rows={rows}
                    selectedSeats={selectedSeats}
                    occupiedSeats={occupiedSeats}
                    prices={prices}
                    onSeatPress={toggleSeat}
                    driverLabel={st.driverLabel}
                />
            </S.CarPlanWrapper>

            {/* ── Co-riders ── */}
            {passengers.length > 0 && (
              <S.CoRidersSection>
                <S.CoRidersTitle variant="label" size="sm" weight="bold" color={theme.colors.on_surface_variant}>
                  {t('rideDetail.coRiders')}
                </S.CoRidersTitle>
                <S.CoRiderList>
                  {passengers.map((passenger: any, idx: number) => (
                    <S.CoRiderCard key={idx}>
                      <S.PassengerAvatar source={{ uri: passenger.photoUrl }} />
                      <S.PassengerInfo>
                        <Typography variant="body" size="md" weight="bold">{passenger.name}</Typography>
                        <Typography variant="label" size="xs" color={theme.colors.on_surface_variant} numberOfLines={1}>
                          {passenger.segment}
                        </Typography>
                      </S.PassengerInfo>
                    </S.CoRiderCard>
                  ))}
                </S.CoRiderList>
              </S.CoRidersSection>
            )}

          </S.ContentPadding>
        </S.ScrollContent>

        {/* ── Fixed Bottom ── */}
        <S.FixedFooter>
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

          <Button
            disabled={isDisabled || isBooking}
            onPress={handleConfirm}
            loading={isBooking}
            variant="primary"
          >
            {isDisabled ? st.pickSeatToContinue : st.bookMySeat}
          </Button>
        </S.FixedFooter>
      </ScreenShell>
    </S.Root>
  );
};
