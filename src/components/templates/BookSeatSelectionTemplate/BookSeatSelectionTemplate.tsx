import React from 'react';

import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Button } from '@/components/atoms/Button';
import { CarFloorPlan } from '@/components/organisms/CarFloorPlan/CarFloorPlan';
import { SeatLegend } from '@/components/molecules/SeatLegend/SeatLegend';
import { verticalScale } from '@/styles';
import * as S from './BookSeatSelectionTemplate.styles';
import { BookSeatSelectionTemplateProps } from './types.d';

export const BookSeatSelectionTemplate: React.FC<
  BookSeatSelectionTemplateProps
> = ({
  t,
  st,
  rows,
  selectedSeats,
  occupiedSeats,
  prices,
  totalPrice,
  seatCount,
  toggleSeat,
  handleBack,
  handleConfirm,
  isBooking,
  isDisabled,
}) => {
  const theme = useTheme();

  return (
    <S.Root>
      <ScreenShell title={st.headerTitle} onBack={handleBack}>
        <S.ScrollContent
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: verticalScale(240) }}
        >
          <S.ContentPadding>
            {/* ── Header Intro ── */}
            <S.HeaderIntro>
              <Typography variant="title" size="md" weight="bold">
                {st.title}
              </Typography>
              <Typography
                variant="body"
                size="sm"
                color={theme.colors.on_surface_variant}
              >
                {st.subtitle}
              </Typography>
            </S.HeaderIntro>

            {/* ── Legend ── */}
            <S.LegendWrapper>
              <SeatLegend
                availableLabel={st.legendAvailable}
                selectedLabel={st.legendSelected}
                occupiedLabel={st.legendBooked}
              />
            </S.LegendWrapper>

            {/* ── Car plan ── */}
            <S.CarPlanWrapper pointerEvents={isBooking ? 'none' : 'auto'}>
              <CarFloorPlan
                rows={rows}
                selectedSeats={selectedSeats}
                occupiedSeats={occupiedSeats}
                prices={prices}
                onSeatPress={isBooking ? undefined : toggleSeat}
                driverLabel={st.driverLabel}
              />
            </S.CarPlanWrapper>
          </S.ContentPadding>
        </S.ScrollContent>

        {/* ── Fixed Bottom ── */}
        <S.FixedFooter>
          <S.SummaryRow>
            <S.PillBadge>
              <Typography
                variant="label"
                size="sm"
                weight="bold"
                color="primary"
              >
                {seatCount === 1
                  ? t('selectSeat.seatsSelected', {
                      count: seatCount,
                      seatWord: t('common.seat'),
                    })
                  : t('selectSeat.seatsSelected', {
                      count: seatCount,
                      seatWord: t('common.seats'),
                    })}
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
