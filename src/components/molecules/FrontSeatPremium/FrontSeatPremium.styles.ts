import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

export const Wrapper = styled.View`
  gap: ${verticalScale(0)}px;
`;

export const CheckRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  gap: ${scale(14)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding: ${moderateScale(18)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const CheckboxOuter = styled.View<{ checked: boolean }>`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: ${moderateScale(6)}px;
  border-width: 2px;
  border-color: ${({ theme, checked }) =>
    checked ? theme.colors.primary : theme.colors.outline_variant};
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.primary : 'transparent'};
  align-items: center;
  justify-content: center;
  margin-top: ${moderateScale(1)}px;
`;

export const CheckRowRight = styled.View`
  flex: 1;
`;

export const CheckTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(4)}px;
`;

export const CheckTitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const CheckDesc = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(18)}px;
`;

/* Mini counter section — shown when checked */
export const MiniSection = styled.View`
  padding-left: ${scale(38)}px;
  padding-right: ${scale(4)}px;
  padding-vertical: ${verticalScale(12)}px;
  border-left-width: 2px;
  border-left-color: ${({ theme }) => `${theme.colors.primary}1A`};
  gap: ${verticalScale(6)}px;
  margin-top: ${verticalScale(4)}px;
`;

export const MiniRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const MiniLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const MiniCounterPill = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: 9999px;
  shadow-color: rgb(0, 0, 0);
  shadow-offset: 0px 1px;
  shadow-opacity: 0.06;
  shadow-radius: 4px;
  elevation: 1;
`;

export const MiniSmallButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const MiniAmountText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  min-width: ${scale(36)}px;
  text-align: center;
`;

export const MaxNote = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.tertiary};
`;
