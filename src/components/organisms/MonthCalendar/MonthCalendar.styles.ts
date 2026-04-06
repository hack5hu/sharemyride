import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const MonthContainer = styled.View`
  margin-bottom: ${verticalScale(40)}px;
`;

export const MonthHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${verticalScale(16)}px;
`;

export const MonthTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const CurrentBadge = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.outline};
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const DaysGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

export const DayHeaderCell = styled.View`
  width: ${(100 / 7).toFixed(4)}%;
  align-items: center;
  padding-vertical: ${verticalScale(8)}px;
`;

export const DayHeaderText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.outline};
`;

export const DayCell = styled.View`
  width: ${(100 / 7).toFixed(4)}%;
  align-items: center;
  padding-vertical: ${verticalScale(2)}px;
`;

export const DayButton = styled.TouchableOpacity<{
  isSelected: boolean;
  isDisabled: boolean;
}>`
  width: ${moderateScale(42)}px;
  height: ${moderateScale(42)}px;
  border-radius: ${moderateScale(10)}px;
  align-items: center;
  justify-content: center;
  opacity: ${({ isDisabled }) => (isDisabled ? 0.3 : 1)};
  background-color: transparent;
`;

export const DaySelectedGradient = styled(LinearGradient)`
  width: ${moderateScale(42)}px;
  height: ${moderateScale(42)}px;
  border-radius: ${moderateScale(10)}px;
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 4;
`;

export const DayText = styled.Text<{
  isSelected: boolean;
  isDisabled: boolean;
}>`
  font-family: 'Plus Jakarta Sans';
  font-weight: ${({ isSelected }) => (isSelected ? '700' : '500')};
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme, isSelected, isDisabled }) => {
    if (isSelected) return theme.colors.on_primary;
    if (isDisabled) return theme.colors.outline_variant;
    return theme.colors.on_surface;
  }};
`;
