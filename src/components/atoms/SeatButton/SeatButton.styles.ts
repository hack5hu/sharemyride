import styled from 'styled-components/native';
import { moderateScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export type SeatState =
  | 'selected'
  | 'available'
  | 'driver'
  | 'occupied'
  | 'unavailable';

export const SeatTouchable = styled.TouchableOpacity<{ state: SeatState }>`
  width: ${moderateScale(68)}px;
  height: ${moderateScale(68)}px;
  border-radius: ${moderateScale(16)}px;
  align-items: center;
  justify-content: center;
  opacity: ${({ state }) => (state === 'unavailable' ? 0.65 : 1)};
  background-color: ${({ theme, state }) => {
    if (state === 'driver' || state === 'occupied' || state === 'unavailable') {
      return theme.colors.surface_container_low;
    }
    if (state === 'selected') return 'transparent';
    return `${theme.colors.primary}08`;
  }};
  border-width: ${({ state }) => (state === 'available' ? '1.5px' : '0px')};
  border-color: ${({ theme, state }) =>
    state === 'available' ? `${theme.colors.primary}30` : 'transparent'};
  elevation: ${({ state }) => (state === 'selected' ? 6 : 0)};
  shadow-color: ${({ theme, state }) =>
    state === 'selected' ? theme.colors.primary : 'transparent'};
  shadow-offset: 0px 4px;
  shadow-opacity: ${({ state }) => (state === 'selected' ? 0.35 : 0)};
  shadow-radius: ${({ state }) => (state === 'selected' ? '8px' : '0px')};
`;

export const SeatGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: ${moderateScale(16)}px;
  align-items: center;
  justify-content: center;
`;

export const DriverLabelText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${moderateScale(2)}px;
`;

export const OccupiedLabelText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.outline};
  margin-top: ${moderateScale(2)}px;
`;

export const UnavailableLabelText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(9.5)}px;
  color: ${({ theme }) => theme.colors.outline};
  margin-top: ${moderateScale(2)}px;
`;

export const Container = styled.View`
  align-items: center;
  width: ${moderateScale(72)}px;
  min-height: ${moderateScale(68)}px;
`;

export const ContentWrapper = styled.View`
  gap: ${moderateScale(2)}px;
  align-items: center;
  justify-content: center;
`;

export const PriceText = styled.Text<{ selected: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.on_primary : theme.colors.primary};
  margin-top: ${moderateScale(2)}px;
`;
