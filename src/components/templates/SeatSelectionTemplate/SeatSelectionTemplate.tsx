import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { scale, verticalScale } from '@/styles';
import { CarFloorPlan, FIVE_SEATER_ROWS } from '@/components/organisms/CarFloorPlan';
import { SeatLegend } from '@/components/molecules/SeatLegend/SeatLegend';
import { SeatSummaryBar } from '@/components/molecules/SeatSummaryBar/SeatSummaryBar';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './SeatSelectionTemplate.styles';

export interface SeatSelectionTemplateProps {
  flow: 'publish' | 'book';
  selectedSeats: Set<string>;
  moneyValue: string;
  seatIdsLabel: string;
  onSeatPress: (id: string) => void;
  onBackPress: () => void;
  onContinue: () => void;
  t: any;
}

export const SeatSelectionTemplate: React.FC<SeatSelectionTemplateProps> = ({
  flow,
  selectedSeats,
  moneyValue,
  seatIdsLabel,
  onSeatPress,
  onBackPress,
  onContinue,
  t,
}) => {
  const theme = useTheme();
  const isBook = flow === 'book';

  return (
    <ScreenShell
      title={t.headerTitle}
      onBack={onBackPress}
      rightElement={isBook ? (
        <S.HeaderRight>
          <S.DriverMeta>
            <Typography variant="label" size="xs" weight="bold" color={theme.colors.on_surface_variant} style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
              Tesla Model 3
            </Typography>
            <Typography variant="label" size="xs" weight="bold" color={theme.colors.primary}>
              {t.verifiedVehicle}
            </Typography>
          </S.DriverMeta>
          <Avatar 
            size="sm" 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCS37mTysRp3QqEQyUxkiwJnoSjFJkJpBQM6pz9jlBc_AVoagCQUejNgCkHQsTGaaHNAomXkz-iZa2nNpytZ0LZBTlQsGoPm5QFAhz2x-MslGGAmMJy5gSvcEvPFhZfcV0MD88vGJbM9KhQei67fC3peCgByygY6BLrsi-ACcZaibIdl9OjOgqQqeRgUGAalBhV7Xn7yWMKJRc4KP_7z9-X94kaCAnKK0W0WbSokoMEMfsRZbfN_Ht8qe75xtN0Jw5_n-LmANWZA9av' }} 
            style={{ borderWidth: 2, borderColor: theme.colors.primary_fixed }}
          />
        </S.HeaderRight>
      ) : undefined}
    >
      <S.ContentScroll showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: verticalScale(240) }}>
        {isBook && (
          <S.BriefingCard>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <S.IconCircle>
                <MaterialIcons name="route" size={scale(24)} color={theme.colors.primary} />
              </S.IconCircle>
              <View>
                <Typography variant="body" size="md" weight="bold">Tech District</Typography>
                <Typography variant="label" size="sm" color={theme.colors.on_surface_variant}>
                  {t.arrivingIn ? t.arrivingIn.replace('{min}', '12') : 'Arriving in 12 min'}
                </Typography>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Typography variant="title" size="md" weight="bold" color={theme.colors.primary}>$14.50</Typography>
              <Typography variant="label" size="xs" weight="bold" color={theme.colors.on_surface_variant}>{t.estimatedFare}</Typography>
            </View>
          </S.BriefingCard>
        )}

        {!isBook && (
          <View style={{ paddingHorizontal: scale(24), marginTop: verticalScale(12), marginBottom: verticalScale(24) }}>
            <Typography variant="title" size="md" weight="bold">{t.title}</Typography>
            <Typography variant="body" size="sm" color={theme.colors.on_surface_variant}>{t.subtitle}</Typography>
          </View>
        )}

        <SeatLegend
          availableLabel={t.legendAvailable || 'Available'}
          selectedLabel={t.legendSelected || 'Selected'}
          occupiedLabel={t.legendOccupied || 'Occupied'}
        />

        <View style={{ marginTop: verticalScale(24) }}>
          <CarFloorPlan
            rows={FIVE_SEATER_ROWS}
            selectedSeats={selectedSeats}
            onSeatPress={onSeatPress}
            driverLabel={t.driverLabel}
          />
        </View>
      </S.ContentScroll>

      <SeatSummaryBar
        flow={flow}
        seatCount={selectedSeats.size}
        moneyValue={moneyValue}
        seatIdLabel={seatIdsLabel}
        summaryTitle={isBook ? (t.summaryTitle || 'Reservation Summary') : (t.seatsOffering || 'Seats Offered')}
        moneyLabel={isBook ? (t.totalPayable || 'Total Payable') : (t.estEarnings || 'Est. Earnings')}
        continueLabel={t.continue || 'Continue'}
        holdTimerNote={isBook ? (t.holdTimerNote || 'Seats are held for 5:00 minutes') : undefined}
        onContinue={onContinue}
      />
    </ScreenShell>
  );
};
