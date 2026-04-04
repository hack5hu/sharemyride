import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(24)}px;
  shadow-color: ${({ theme }) => theme.colors.on_surface};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.04;
  shadow-radius: 32px;
  elevation: 4;
  position: relative;
  overflow: hidden;
`;

export const VisualPathLine = styled.View`
  position: absolute;
  left: ${scale(36)}px;
  top: ${verticalScale(72)}px;
  bottom: ${verticalScale(72)}px;
  width: ${scale(2)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  opacity: 0.4;
  border-radius: 9999px;
`;

export const InputsWrapper = styled.View`
  gap: ${verticalScale(32)}px;
  z-index: 10;
`;

export const InputGroup = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  gap: ${scale(16)}px;
`;

export const StartIconContainer = styled.View`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-top: ${verticalScale(12)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 8px;
  elevation: 4;
`;

export const DestinationIconContainer = styled.View`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: 9999px;
  border-width: ${moderateScale(2)}px;
  border-color: ${({ theme }) => theme.colors.primary_container};
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  align-items: center;
  justify-content: center;
  margin-top: ${verticalScale(12)}px;
`;

export const InputContent = styled.View`
  flex: 1;
`;

export const InputLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.outline};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: ${verticalScale(4)}px;
`;

export const MockInput = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(8)}px;
  padding: ${moderateScale(14)}px ${moderateScale(16)}px;
`;

export const MockInputText = styled.Text<{ $hasValue?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme, $hasValue }) => 
    $hasValue ? theme.colors.on_surface : theme.colors.outline};
`;
