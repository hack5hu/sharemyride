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
  padding-bottom: ${verticalScale(40)}px;
  padding-top: ${verticalScale(24)}px;
  background-color: ${({ theme }) => theme.colors.surface}E6;
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.surface_container_highest};
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

const SummaryLabel = styled.Text<{ color?: string }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  font-weight: 500;
  color: ${({ theme, color }) => color || theme.colors.on_surface_variant};
`;

const MoneyValueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

const SeatCountText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(22)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -0.5px;
`;

const ContinueButton = styled.TouchableOpacity<{ disabled: boolean }>`
  width: 100%;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const ContinueGradient = styled(LinearGradient)`
  width: 100%;
  padding-vertical: ${verticalScale(18)}px;
  border-radius: ${moderateScale(16)}px;
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.2;
  shadow-radius: 12px;
  elevation: 8;
`;

const ContinueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export interface SeatSummaryBarProps {
  flow: 'publish' | 'book';
  seatCount: number;
  moneyValue: string;
  summaryTitle: string;
  moneyLabel: string;
  continueLabel: string;
  seatIdLabel?: string;
  holdTimerNote?: string;
  onContinue: () => void;
}

export const SeatSummaryBar: React.FC<SeatSummaryBarProps> = ({
  flow,
  seatCount,
  moneyValue,
  summaryTitle,
  moneyLabel,
  continueLabel,
  seatIdLabel,
  holdTimerNote,
  onContinue,
}) => {
  const theme = useTheme();
  const disabled = seatCount === 0;
  const isBook = flow === 'book';

  return (
    <BarWrapper>
      <SummaryRow>
        <SummaryBlock>
          <SummaryLabel 
            color={isBook ? theme.colors.primary_container : undefined}
            style={{ textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: '800' }}
          >
            {summaryTitle}
          </SummaryLabel>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
            <SeatCountText>{seatCount} {seatCount === 1 ? 'Seat' : 'Seats'}</SeatCountText>
            {isBook && seatIdLabel && (
              <SummaryLabel style={{ fontSize: responsiveFont(14), fontWeight: '500' }}>
                ({seatIdLabel})
              </SummaryLabel>
            )}
          </View>
        </SummaryBlock>
        {!!moneyValue && (
          <SummaryBlock alignEnd>
            <SummaryLabel style={{ fontWeight: '700', textTransform: 'uppercase' }}>{moneyLabel}</SummaryLabel>
            <MoneyValueText style={{ fontSize: isBook ? responsiveFont(20) : responsiveFont(18), fontWeight: '800' }}>
              {moneyValue}
            </MoneyValueText>
          </SummaryBlock>
        )}
      </SummaryRow>
      <ContinueButton onPress={onContinue} activeOpacity={0.9} disabled={disabled}>
        <ContinueGradient
          colors={[theme.colors.primary_container, theme.colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ContinueText>{continueLabel}</ContinueText>
        </ContinueGradient>
      </ContinueButton>
      {isBook && holdTimerNote && (
        <SummaryLabel style={{ textAlign: 'center', marginTop: 16, fontSize: responsiveFont(10), fontStyle: 'italic', opacity: 0.7 }}>
          {holdTimerNote}
        </SummaryLabel>
      )}
    </BarWrapper>
  );
};
