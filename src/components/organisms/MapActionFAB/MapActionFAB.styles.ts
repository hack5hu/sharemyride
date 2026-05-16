import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(14)}px;
  border-radius: ${moderateScale(100)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
  shadow-color: ${({ theme }) => theme.colors.on_background};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.25;
  shadow-radius: 12px;
  elevation: 10;
  border-width: 2px;
  border-color: rgba(255, 255, 255, 0.2);
`;

export const Label = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(14)}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.on_primary};
  letter-spacing: -0.2px;
`;
