import styled from 'styled-components/native';
import { moderateScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';
import { Typography } from '../Typography';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export type SeatState = 'selected' | 'available' | 'driver' | 'occupied';

export const SeatTouchable = styled.TouchableOpacity<{ state: SeatState }>`
  width: ${moderateScale(64)}px;
  height: ${moderateScale(64)}px;
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
  border-width: 1.5px;
  background-color: ${({ theme, state }) => {
    if (state === 'driver') return theme.colors.surface_container_lowest;
    if (state === 'selected') return 'transparent';
    if (state === 'occupied') return theme.colors.surface_container_highest;
    return theme.colors.surface_container_lowest;
  }};
  border-color: ${({ theme, state }) => {
    if (state === 'driver') return `${theme.colors.outline}30`;
    if (state === 'selected') return 'transparent';
    if (state === 'occupied') return theme.colors.outline_variant;
    return `${theme.colors.primary}40`;
  }};
  border-style: solid;
  elevation: ${({ state }) => (state === 'selected' ? 4 : 0)};
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
`;

export const SeatGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: ${moderateScale(10)}px;
  align-items: center;
  justify-content: center;
`;

export const DriverLabelText = styled(Typography).attrs({
  variant: 'label',
  size: 'xs',
  weight: 'bold',
})`
  color: ${({ theme }) => theme.colors.outline};
  margin-top: ${moderateScale(2)}px;
`;

export const Container = styled.View`
  align-items: center;
  width: ${moderateScale(70)}px;
`;

export const ContentWrapper = styled.View`
  gap: ${moderateScale(2)}px;
  align-items: center;
`;

export const BlockIconWrapper = styled(MaterialIcons)`
  position: absolute;
  top: 0;
  right: -${moderateScale(4)}px;
`;

export const PriceText = styled.Text<{ selected: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.on_primary : theme.colors.primary};
  margin-top: ${moderateScale(1)}px;
`;
