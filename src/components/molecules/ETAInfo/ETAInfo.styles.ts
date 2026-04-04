import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles/scale';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_fixed};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(20)}px;
  justify-content: space-between;
`;

export const TopSection = styled.View``;

export const Title = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(10)}px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.on_primary_fixed_variant};
  opacity: 0.7;
`;

export const TimeLabel = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(32)}px;
  color: ${({ theme }) => theme.colors.on_primary_fixed_variant};
  margin-top: ${verticalScale(4)}px;
`;

export const BottomSection = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${verticalScale(16)}px;
`;

export const AwayText = styled.Text`
  font-family: 'PlusJakartaSans-Medium';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_primary_fixed_variant};
  margin-left: ${scale(8)}px;
`;
