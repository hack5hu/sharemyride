import styled from 'styled-components/native';
import { scale, verticalScale, responsiveFont, moderateScale } from '@/styles';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${scale(40)}px;
  padding-vertical: ${verticalScale(60)}px;
`;

export const IconContainer = styled.View`
  width: ${moderateScale(120)}px;
  height: ${moderateScale(120)}px;
  border-radius: ${moderateScale(60)}px;
  background-color: ${({ theme }) => `${theme.colors.surface_container_low}80`};
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(24)}px;
`;

export const TextContainer = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(20)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  text-align: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const Description = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-align: center;
  line-height: ${responsiveFont(22)}px;
`;
