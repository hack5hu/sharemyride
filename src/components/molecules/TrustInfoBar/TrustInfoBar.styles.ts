import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${moderateScale(12)}px;
  gap: ${scale(12)}px;
  background-color: ${({ theme }) =>
    theme.colors.primary_fixed + '4D'}; // 30% Opacity as per design
  border-radius: ${moderateScale(12)}px;
`;

export const InfoText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(11)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_primary_fixed_variant};
  flex: 1;
  flex-shrink: 1;
`;
