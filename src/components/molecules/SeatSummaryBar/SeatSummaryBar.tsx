import React from 'react';
import { View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

const BarWrapper = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(32)}px;
`;

const GradientBg = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: -${verticalScale(40)}px;
`;

const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
  padding-horizontal: ${scale(8)}px;
`;

const SummaryBlock = styled.View<{ alignEnd?: boolean }>`
  align-items: ${({ alignEnd }) => (alignEnd ? 'flex-end' : 'flex-start')};
`;

const SummaryLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

const SeatCountText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

const EarningsText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

const ContinueButton = styled.TouchableOpacity<{ disabled: boolean }>`
  width: 100%;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const ContinueGradient = styled(LinearGradient)`
  width: 100%;
  padding-vertical: ${verticalScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 12px;
  shadow-opacity: 0.2;
  shadow-radius: 20px;
  elevation: 6;
`;

const ContinueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export interface SeatSummaryBarProps {
  seatCount: number;
  estEarnings: string;
  seatsLabel: string;
  earningsLabel: string;
  continueLabel: string;
  onContinue: () => void;
}

export const SeatSummaryBar: React.FC<SeatSummaryBarProps> = ({
  seatCount,
  estEarnings,
  seatsLabel,
  earningsLabel,
  continueLabel,
  onContinue,
}) => {
  const theme = useTheme();
  const disabled = seatCount === 0;

  return (
    <BarWrapper>
      <GradientBg
        colors={['transparent', theme.colors.surface]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        pointerEvents="none"
      />
      <SummaryRow>
        <SummaryBlock>
          <SummaryLabel>{seatsLabel}</SummaryLabel>
          <SeatCountText>{seatCount} Seats</SeatCountText>
        </SummaryBlock>
        <SummaryBlock alignEnd>
          <SummaryLabel>{earningsLabel}</SummaryLabel>
          <EarningsText>{estEarnings}</EarningsText>
        </SummaryBlock>
      </SummaryRow>
      <ContinueButton onPress={onContinue} activeOpacity={0.9} disabled={disabled}>
        <ContinueGradient
          colors={[theme.colors.primary, theme.colors.primary_container]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ContinueText>{continueLabel}</ContinueText>
        </ContinueGradient>
      </ContinueButton>
    </BarWrapper>
  );
};
