import styled from 'styled-components/native';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { scale, verticalScale, responsiveFont, moderateScale } from '@/styles';

export const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
`;

export const ScrollContent = styled(KeyboardAwareScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: verticalScale(32),
  },
  keyboardShouldPersistTaps: 'handled',
  showsVerticalScrollIndicator: false,
  bottomOffset: verticalScale(210),
})`
  flex: 1;
`;

export const ContentWrapper = styled(View)`
  width: 100%;
`;

export const HeroContainer = styled(View)`
  width: 100%;
  height: ${verticalScale(420)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
`;

export const HeroImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const FormContentWrapper = styled(View)`
  padding-horizontal: ${scale(20)}px;
  width: 100%;
  max-width: ${moderateScale(448)}px;
  align-self: center;
  margin-top: -${verticalScale(40)}px;
`;

export const OverlayHeader = styled(View)`
  align-items: center;
`;

export const OverlayTagline = styled(Text)`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(15)}px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: -${verticalScale(16)}px;
  margin-bottom: ${verticalScale(20)}px;
`;

export const LoginCard = styled(View)`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(28)}px;
  padding-horizontal: ${moderateScale(24)}px;
  padding-bottom: ${moderateScale(24)}px;

  /* Premium soft shadow */
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.06;
  shadow-radius: 24px;
  elevation: 8;
`;

export const TopLanguageButton = styled(TouchableOpacity)`
  position: absolute;
  top: ${verticalScale(50)}px;
  right: ${scale(20)}px;
  z-index: 20;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: ${moderateScale(30)}px;
  gap: ${scale(6)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.04;
  shadow-radius: 8px;
  elevation: 2;
`;

export const LanguageButtonText = styled(Text)`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(13)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;
