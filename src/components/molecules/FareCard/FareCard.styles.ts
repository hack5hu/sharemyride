import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles/scale';

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(20)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LeftContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding: ${moderateScale(10)}px;
  border-radius: ${moderateScale(12)}px;
  margin-right: ${scale(12)}px;
`;

export const TextContainer = styled.View``;

export const Title = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(10)}px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.outline};
`;

export const Value = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;
