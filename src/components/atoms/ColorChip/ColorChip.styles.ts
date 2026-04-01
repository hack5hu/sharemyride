import styled from 'styled-components/native';
import { moderateScale } from '@/styles';

export const Container = styled.TouchableOpacity<{ selected: boolean }>`
  align-items: center;
  justify-content: center;
  gap: ${moderateScale(6)}px;
  margin-right: ${moderateScale(12)}px;
`;

export const Chip = styled.View<{ color: string; selected: boolean }>`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: ${({ color }) => color};
  border-width: ${({ selected }) => (selected ? 3 : 1)}px;
  border-color: ${({ theme, selected, color }) => {
    if (selected) return theme.colors.primary;
    // For white/very light colors, show a subtle border
    return color.toLowerCase() === '#ffffff' ? theme.colors.outline_variant : 'transparent';
  }};
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;
