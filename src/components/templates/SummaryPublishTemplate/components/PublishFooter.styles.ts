import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

export const FixedFooter = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(34)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  elevation: 8;
  shadow-color: #000;
  shadow-offset: 0px -4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
`;

export const ErrorText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.error};
  font-weight: 600;
  text-align: center;
  margin-bottom: ${verticalScale(12)}px;
  padding-horizontal: ${scale(24)}px;
`;



export const TermsText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-align: center;
  margin-top: ${verticalScale(16)}px;
`;

export const TermsLink = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration-line: underline;
  text-decoration-color: ${({ theme }) => theme.colors.primary_container};
`;
