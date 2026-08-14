import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

export const BarWrapper = styled(Box)`
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

export const SummaryRow = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
  padding-horizontal: ${scale(8)}px;
`;

export const SummaryBlock = styled(Box)<{ alignEnd?: boolean }>`
  align-items: ${({ alignEnd }) => (alignEnd ? 'flex-end' : 'flex-start')};
`;

export const SummaryLabel = styled(Typography)<{ color?: string }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  font-weight: 500;
  color: ${({ theme, color }) => color || theme.colors.on_surface_variant};
`;

export const TitleLabel = styled(SummaryLabel)`
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 800;
`;

export const SeatIdLabel = styled(SummaryLabel)`
  font-size: ${responsiveFont(14)}px;
  font-weight: 500;
`;

export const MoneyLabelText = styled(SummaryLabel)`
  font-weight: 700;
  text-transform: uppercase;
`;

export const HoldTimerNoteText = styled(SummaryLabel)`
  text-align: center;
  margin-top: 16px;
  font-size: ${responsiveFont(10)}px;
  font-style: italic;
  opacity: 0.7;
`;

export const MoneyValueText = styled(Typography)<{ isBook?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${({ isBook }) =>
    isBook ? responsiveFont(20) : responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const SeatCountText = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(22)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -0.5px;
`;

export const ContinueButton = styled.TouchableOpacity<{ disabled: boolean }>`
  width: 100%;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const ContinueGradient = styled(LinearGradient)`
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

export const ContinueText = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const SeatCountRow = styled(Box)`
  flex-direction: row;
  align-items: baseline;
  gap: 4px;
`;
