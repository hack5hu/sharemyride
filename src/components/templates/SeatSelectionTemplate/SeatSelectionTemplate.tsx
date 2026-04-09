import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { moderateScale, scale, verticalScale } from '@/styles';
import { CarFloorPlan, FIVE_SEATER_ROWS } from '@/components/organisms/CarFloorPlan';
import { SeatLegend } from '@/components/molecules/SeatLegend/SeatLegend';
import { SeatSummaryBar } from '@/components/molecules/SeatSummaryBar/SeatSummaryBar';

/* ---------- Inline styles (scoped to template) ---------- */
const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const ContentScroll = styled.ScrollView`
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(12)}px;
`;

const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

const DriverMeta = styled.View`
  align-items: flex-end;
`;

const BriefingCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(20)}px;
  margin-horizontal: ${scale(24)}px;
  margin-top: ${verticalScale(12)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.04;
  shadow-radius: 20px;
`;

const IconCircle = styled.View`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  background-color: ${({ theme }) => theme.colors.primary_container}1A;
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
`;

/* ---------- Template ---------- */
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
    <Container>
      {/* TopAppBar */}
      <Header>
        <HeaderLeft>
          <TouchableOpacity onPress={onBackPress} style={{ padding: 8 }}>
            <MaterialIcons name="arrow-back" size={moderateScale(24)} color={theme.colors.primary_container} />
          </TouchableOpacity>
          <Typography variant="title" size="sm" weight="bold" color={theme.colors.primary_container}>
            {isBook ? t.headerTitle : t.headerTitle}
          </Typography>
        </HeaderLeft>

        {isBook && (
          <HeaderRight>
            <DriverMeta>
              <Typography variant="label" size="xs" weight="bold" color={theme.colors.on_surface_variant} style={{ textTransform: 'uppercase', letterSpacing: 1 }}>
                Tesla Model 3
              </Typography>
              <Typography variant="label" size="xs" weight="bold" color={theme.colors.primary}>
                {t.verifiedVehicle}
              </Typography>
            </DriverMeta>
            <Avatar 
              size="sm" 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCS37mTysRp3QqEQyUxkiwJnoSjFJkJpBQM6pz9jlBc_AVoagCQUejNgCkHQsTGaaHNAomXkz-iZa2nNpytZ0LZBTlQsGoPm5QFAhz2x-MslGGAmMJy5gSvcEvPFhZfcV0MD88vGJbM9KhQei67fC3peCgByygY6BLrsi-ACcZaibIdl9OjOgqQqeRgUGAalBhV7Xn7yWMKJRc4KP_7z9-X94kaCAnKK0W0WbSokoMEMfsRZbfN_Ht8qe75xtN0Jw5_n-LmANWZA9av' }} 
              style={{ borderWidth: 2, borderColor: theme.colors.primary_fixed }}
            />
          </HeaderRight>
        )}
      </Header>

      <ContentScroll showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: verticalScale(240) }}>
        {isBook && (
          <BriefingCard>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <IconCircle>
                <MaterialIcons name="route" size={moderateScale(24)} color={theme.colors.primary} />
              </IconCircle>
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
          </BriefingCard>
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
      </ContentScroll>

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
    </Container>
  );
};
