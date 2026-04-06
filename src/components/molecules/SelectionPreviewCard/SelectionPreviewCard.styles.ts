import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

export const CardContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => `${theme.colors.surface_container_lowest}E6`};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.outline_variant}1A`};
  shadow-color: rgb(23, 29, 25);
  shadow-offset: 0px -4px;
  shadow-opacity: 0.06;
  shadow-radius: 24px;
  elevation: 3;
  margin-bottom: ${verticalScale(12)}px;
`;

export const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const IconCircle = styled.View`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => `${theme.colors.primary_fixed}33`};
  align-items: center;
  justify-content: center;
`;

export const LabelText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.outline};
`;

export const ValueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;
