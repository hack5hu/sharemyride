import { View, TouchableOpacity } from 'react-native';
import { Typography } from '@/components/atoms/Typography';
import { Avatar } from '@/components/atoms/Avatar';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import styled from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import { VehicleToggle, VehicleType } from '@/components/molecules/VehicleToggle';
import { SeatLegend } from '@/components/molecules/SeatLegend';
import { SeatSummaryBar } from '@/components/molecules/SeatSummaryBar';
import { CarFloorPlan } from '@/components/organisms/CarFloorPlan';
import { FIVE_SEATER_ROWS, SEVEN_SEATER_ROWS } from '@/components/organisms/CarFloorPlan';

/* ---------- Inline styles (scoped to template) ---------- */
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
  selectedSeats: Set<string>;
  onSeatPress: (id: string) => void;
  onBackPress: () => void;
  onContinue: () => void;
}

export const SeatSelectionTemplate: React.FC<SeatSelectionTemplateProps> = ({
  selectedSeats,
  onSeatPress,
  onBackPress,
  onContinue,
}) => {
  const theme = useTheme();
  const { selectSeat: t } = useLocale();

  return (
    <Container>
      {/* TopAppBar */}
      <Header>
        <HeaderLeft>
          <TouchableOpacity onPress={onBackPress} style={{ padding: 8 }}>
            <MaterialIcons name="arrow-back" size={moderateScale(24)} color={theme.colors.primary_container} />
          </TouchableOpacity>
          <Typography variant="title" size="sm" weight="bold" color={theme.colors.primary_container}>
            {t.headerTitle}
          </Typography>
        </HeaderLeft>

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
      </Header>

      <ContentScroll showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: verticalScale(240) }}>
        {/* Ride Briefing Card */}
        <BriefingCard>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <IconCircle>
              <MaterialIcons name="route" size={moderateScale(24)} color={theme.colors.primary} />
            </IconCircle>
            <View>
              <Typography variant="body" size="md" weight="bold">Tech District</Typography>
              <Typography variant="label" size="sm" color={theme.colors.on_surface_variant}>
                {t.arrivingIn.replace('{min}', '12')}
              </Typography>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Typography variant="title" size="md" weight="bold" color={theme.colors.primary}>$14.50</Typography>
            <Typography variant="label" size="xs" weight="bold" color={theme.colors.on_surface_variant}>{t.estimatedFare}</Typography>
          </View>
        </BriefingCard>

        {/* Legend */}
        <SeatLegend
          availableLabel={t.legendAvailable}
          selectedLabel={t.legendSelected}
          bookedLabel={t.legendBooked}
        />

        {/* Car floor plan visuals */}
        <CarFloorPlan
          rows={FIVE_SEATER_ROWS}
          selectedSeats={selectedSeats}
          onSeatPress={onSeatPress}
          driverLabel={t.driverLabel}
        />
      </ContentScroll>

      {/* Reservation Summary */}
      <SeatSummaryBar
        seatCount={selectedSeats.size}
        selectedLabel={t.seatSelected.replace('{count}', selectedSeats.size.toString())}
        seatIdLabel={selectedSeats.size > 0 ? Array.from(selectedSeats).join(', ') : undefined}
        totalPayable="$14.50"
        summaryTitle={t.summaryTitle}
        continueLabel={t.continue}
        holdTimerNote={t.holdTimerNote}
        onContinue={onContinue}
      />
    </Container>
  );
};
