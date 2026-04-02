import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-vertical: ${verticalScale(4)}px;
`;

export const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
`;

export const IconBox = styled.View`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme }) => theme.colors.tertiary + '1A'}; // 10% opacity
  align-items: center;
  justify-content: center;
`;

export const TextContent = styled.View`
  gap: ${verticalScale(2)}px;
`;

export const PrimaryText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(14)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const Description = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(12)}px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;
