import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles/scale';

export const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: ${verticalScale(32)}px;
`;

export const IconContainer = styled.View<{ type: 'pickup' | 'stop' | 'destination' }>`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme, type }) => 
    type === 'pickup' ? theme.colors.primary : 
    type === 'destination' ? theme.colors.tertiary : 
    theme.colors.surface_container_highest};
  justify-content: center;
  align-items: center;
  z-index: 1;
  border-width: ${({ type }) => type === 'stop' ? 2 : 0}px;
  border-color: ${({ theme, type }) => type === 'stop' ? theme.colors.outline_variant : 'transparent'};
`;

export const StopDot = styled.View`
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: ${moderateScale(4)}px;
  background-color: ${({ theme }) => theme.colors.outline};
`;

export const Content = styled.View`
  margin-left: ${scale(12)}px;
  flex: 1;
`;

export const Label = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(10)}px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-bottom: ${verticalScale(4)}px;
  opacity: 0.7;
`;

export const Address = styled.Text`
  font-family: 'PlusJakartaSans-SemiBold';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  text-decoration-line: underline;
  text-decoration-color: ${({ theme }) => `${theme.colors.primary}33`}; /* 20% opacity */
`;
