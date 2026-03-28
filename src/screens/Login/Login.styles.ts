import styled from 'styled-components/native';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { scale, verticalScale, responsiveFont, moderateScale } from '@/styles';
import { Typography } from '@/components/atoms/Typography';

export const Container = styled(KeyboardAvoidingView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContent = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: scale(24),
    paddingVertical: verticalScale(48),
  },
})``;

export const BackgroundBubble = styled(View)<{
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
}>`
  position: absolute;
  width: 30%;
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.colors.primary}0D; /* 5% opacity */
  border-radius: 9999px;
  top: ${({ top }) => top || 'auto'};
  left: ${({ left }) => left || 'auto'};
  bottom: ${({ bottom }) => bottom || 'auto'};
  right: ${({ right }) => right || 'auto'};
  /* Note: HTML uses blur-[80px]. Native RN Views do not support blur filters; 
     consider using an Image with blurRadius if higher fidelity is needed. */
`;

export const BrandHeader = styled(View)`
  margin-bottom: ${verticalScale(40)}px;
  align-items: center;
`;

export const LogoText = styled(Typography)`
  font-weight: 800; /* extrabold */
  font-size: ${responsiveFont(30)}px; /* text-3xl */
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${verticalScale(8)}px;
  text-align: center;
  letter-spacing: -1px;
`;

/**
 * ContentWrapper mimics the max-w-md constraint from HTML
 */
export const ContentWrapper = styled(View)`
  width: 100%;
  max-width: ${moderateScale(448)}px;
  align-self: center;
`;

export const LoginCard = styled(View)`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(8)}px;
  padding: ${moderateScale(32)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant};

  /* Shadow: shadow-[0_4px_24px_rgba(0,135,90,0.08)] */
  shadow-color: #00875a;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 24px;
  elevation: 4;
`;
