import styled from 'styled-components/native';
import { OlaMap } from '@/components/organisms/OlaMap';
import { moderateScale } from '@/styles';

export const MapLayer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
`;

export const StyledOlaMap = styled(OlaMap)`
  flex: 1;
  width: 100%;
  height: 100%;
`;

export const MarkerDot = styled.View<{ color?: string; size?: number }>`
  width: ${({ size }) => moderateScale(size ?? 12)}px;
  height: ${({ size }) => moderateScale(size ?? 12)}px;
  border-radius: 9999px;
  background-color: ${({ theme, color }) => color || theme.colors.primary};
  shadow-color: ${({ theme, color }) => color || theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 4px;
  elevation: 3;
`;

export const MarkerDotOuter = styled.View<{ color?: string }>`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: 9999px;
  background-color: ${({ theme, color }) =>
    `${color || theme.colors.primary}33`};
  align-items: center;
  justify-content: center;
`;
