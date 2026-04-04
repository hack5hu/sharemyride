import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles/scale';

export const Container = styled.View`
  margin-top: ${verticalScale(4)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(8)}px;
  margin-bottom: ${verticalScale(12)}px;
`;

export const Title = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(14)}px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.colors.outline};
`;

export const SpotsBadge = styled.View`
  background-color: ${({ theme }) => `${theme.colors.primary_container}1A`}; /* 10% opacity */
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(4)}px;
`;

export const SpotsText = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.primary_container};
`;

export const ScrollArea = styled.ScrollView`
  padding-bottom: ${verticalScale(8)}px;
`;
