import React from 'react';
import { ScrollView } from 'react-native';
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
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const TopHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(12)}px;
`;

const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
`;

const BackButton = styled.TouchableOpacity`
  padding: ${moderateScale(8)}px;
  border-radius: 9999px;
`;

const HeaderTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

const StepText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

const ProgressBarBg = styled.View`
  height: ${moderateScale(4)}px;
  background-color: ${({ theme }) => theme.colors.surface_container};
  margin-horizontal: ${scale(24)}px;
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: ${verticalScale(24)}px;
`;

const ProgressBarFill = styled.View`
  width: 66%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 9999px;
`;

const TitleSection = styled.View`
  padding-horizontal: ${scale(24)}px;
  margin-bottom: ${verticalScale(24)}px;
`;

const TitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(24)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -0.5px;
  margin-bottom: ${verticalScale(4)}px;
`;

const SubtitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

/* ---------- Template ---------- */
export interface SeatSelectionTemplateProps {
  vehicleType: VehicleType;
  selectedSeats: Set<string>;
  onVehicleTypeChange: (type: VehicleType) => void;
  onSeatPress: (id: string) => void;
  onBackPress: () => void;
  onContinue: () => void;
  estEarnings: string;
}

export const SeatSelectionTemplate: React.FC<SeatSelectionTemplateProps> = ({
  vehicleType,
  selectedSeats,
  onVehicleTypeChange,
  onSeatPress,
  onBackPress,
  onContinue,
  estEarnings,
}) => {
  const theme = useTheme();
  const { seatSelection: t } = useLocale();

  const rows = vehicleType === '5' ? FIVE_SEATER_ROWS : SEVEN_SEATER_ROWS;

  return (
    <Container edges={['top']}>
      {/* Header */}
      <TopHeader>
        <HeaderLeft>
          <BackButton onPress={onBackPress} activeOpacity={0.7}>
            <MaterialIcons name="arrow-back" size={moderateScale(24)} color={theme.colors.primary} />
          </BackButton>
          <HeaderTitle>{t.headerTitle}</HeaderTitle>
        </HeaderLeft>
        {/* <StepText>{t.stepIndicator}</StepText> */}
      </TopHeader>

      {/* Progress */}
      {/* <ProgressBarBg>
        <ProgressBarFill />
      </ProgressBarBg> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: scale(24),
          paddingBottom: verticalScale(200),
        }}
      >
        {/* Title */}
        <TitleSection style={{ paddingHorizontal: 0 }}>
          <TitleText>{t.title}</TitleText>
          <SubtitleText>{t.subtitle}</SubtitleText>
        </TitleSection>

        {/* Vehicle type toggle */}
        <VehicleToggle
          selected={vehicleType}
          onSelect={onVehicleTypeChange}
          fiveSeaterLabel={t.fiveSeater}
          sevenSeaterLabel={t.sevenSeater}
        />

        {/* Car floor plan */}
        <CarFloorPlan
          rows={rows}
          selectedSeats={selectedSeats}
          onSeatPress={onSeatPress}
          driverLabel={t.driverLabel}
        />

        {/* Legend */}
        <SeatLegend
          selectedLabel={t.legendSelected}
          availableLabel={t.legendAvailable}
          occupiedLabel={t.legendOccupied}
        />
      </ScrollView>

      {/* Floating summary + CTA */}
      <SeatSummaryBar
        seatCount={selectedSeats.size}
        estEarnings={estEarnings}
        seatsLabel={t.seatsOffering}
        earningsLabel={t.estEarnings}
        continueLabel={t.continue}
        onContinue={onContinue}
      />
    </Container>
  );
};
