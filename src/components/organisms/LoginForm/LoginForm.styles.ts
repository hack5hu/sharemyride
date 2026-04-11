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
