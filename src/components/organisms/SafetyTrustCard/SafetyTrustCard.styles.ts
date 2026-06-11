import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles/scale';

export const Container = styled(LinearGradient)`
  padding: ${moderateScale(20)}px;
  border-radius: ${moderateScale(24)}px;
  flex-direction: row;
  align-items: flex-start;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.primary}0D`}; /* 5% opacity */
`;

export const IconContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_container};
  padding: ${moderateScale(8)}px;
  border-radius: ${moderateScale(12)}px;
  margin-right: ${scale(16)}px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Description = styled.Text`
  font-family: 'PlusJakartaSans-Medium';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(4)}px;
  line-height: ${responsiveFont(18)}px;
`;
