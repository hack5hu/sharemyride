import styled from 'styled-components/native';
import { scale, verticalScale } from '@/styles';

export const Card = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${({ theme }) => theme.roundness.md}px;
  padding: ${scale(24)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant};

  /* Soft ambient shadow as per design rules */
  shadow-color: ${({ theme }) => theme.colors.on_surface};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 24px;
  elevation: 4;
`;

export const FormContainer = styled.View`
  gap: ${verticalScale(16)}px;
`;

/** Wraps the Input so we can overlay a Pressable on top */
export const InputContainer = styled.View`
  position: relative;
`;

/** Sits on top of the Input to intercept taps when Truecaller is active */
export const InputTapOverlay = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
`;

export const PrefixText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-right: ${scale(8)}px;
`;

export const TermsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  margin-vertical: ${verticalScale(8)}px;
`;

export const TermsText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: 14px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  flex: 1;
`;

export const Footer = styled.View`
  margin-top: ${verticalScale(32)}px;
  padding-top: ${verticalScale(24)}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.outline_variant};
  align-items: center;
`;

export const TruecallerRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const TruecallerText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-right: ${scale(4)}px;
`;

export const TruecallerBrandText = styled(TruecallerText)`
  color: #0052FF;
  font-weight: 700;
`;
