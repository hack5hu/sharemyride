import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';
import { View } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

/* Fixed Top Header (Glassmorphism concept) */
export const TopHeader = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: ${verticalScale(64)}px;
  background-color: ${({ theme }) => `${theme.colors.surface}E6`}; /* 90% opacity for blur effect */
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(24)}px;
  z-index: 50;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 4px;
  shadow-opacity: 0.04;
  shadow-radius: 16px;
  elevation: 3;
`;

export const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
`;

export const BackButton = styled.TouchableOpacity`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -0.5px;
`;

export const HeaderStepText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  letter-spacing: 1px;
`;

/* Content Container pushes below Header */
export const ContentArea计算 = styled.View`
  flex: 1;
  margin-top: ${verticalScale(64)}px;
`;
export const ContentArea = styled.View`
  flex: 1;
  margin-top: ${verticalScale(64)}px;
  position: relative;
`;

/* Ethereal Floating Footer for Search State (Map 2) */
export const SearchFloatingFooter = styled.View`
  position: absolute;
  bottom: ${verticalScale(32)}px;
  left: ${scale(24)}px;
  right: ${scale(24)}px;
  background-color: ${({ theme }) => `${theme.colors.surface_container_lowest}E6`}; /* 90% opactiy */
  border-radius: 9999px;
  padding: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.outline_variant}33`}; /* 20% opacity */
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 10px;
  shadow-opacity: 0.1;
  shadow-radius: 20px;
  elevation: 10;
  z-index: 50;
`;

export const FooterLeftText = styled.View`
  padding-horizontal: ${scale(8)}px;
`;

export const FooterLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.outline_variant};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const FooterValue = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const SearchContinueButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding-horizontal: ${scale(32)}px;
  padding-vertical: ${verticalScale(12)}px;
  border-radius: 9999px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 12px;
  elevation: 5;
`;

export const SearchContinueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;
