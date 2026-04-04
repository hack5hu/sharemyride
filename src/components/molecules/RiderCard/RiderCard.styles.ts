import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles/scale';

export const Container = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  width: ${scale(180)}px;
  margin-right: ${scale(12)}px;
`;

export const AvatarContainer = styled.View`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primary_fixed_dim};
  justify-content: center;
  align-items: center;
`;

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Content = styled.View`
  margin-left: ${scale(12)}px;
  flex: 1;
`;

export const Name = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const Info = styled.Text`
  font-family: 'PlusJakartaSans-Medium';
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.outline};
  margin-top: ${verticalScale(2)}px;
`;
