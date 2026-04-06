import styled from 'styled-components/native';
import { moderateScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export type SeatState = 'selected' | 'available' | 'driver';

export const SeatTouchable = styled.TouchableOpacity<{ state: SeatState }>`
  width: ${moderateScale(56)}px;
  height: ${moderateScale(56)}px;
  border-radius: ${moderateScale(8)}px;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${({ theme, state }) => {
    if (state === 'driver') return `${theme.colors.outline_variant}`;
    if (state === 'selected') return 'transparent';
    return `${theme.colors.primary}33`;
  }};
  background-color: ${({ theme, state }) => {
    if (state === 'driver') return theme.colors.surface_container;
    if (state === 'selected') return 'transparent';
    return theme.colors.surface_container_lowest;
  }};
  opacity: ${({ state }) => state === 'driver' ? 0.4 : 1};
`;

export const SeatGradient = styled(LinearGradient)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: ${moderateScale(6)}px;
  align-items: center;
  justify-content: center;
`;

export const DriverLabelText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(8)}px;
  color: ${({ theme }) => theme.colors.outline};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: ${moderateScale(4)}px;
`;
