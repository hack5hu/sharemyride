import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const SafeContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const Header = styled.View`
  height: ${verticalScale(64)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(24)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  z-index: 10;
`;

export const HeroSection = styled.View`
  margin-bottom: ${moderateScale(20)}px;
  gap: ${moderateScale(8)}px;
`;

export const ContentContainer = styled.View`
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(24)}px;
  gap: ${moderateScale(24)}px;
`;

export const Footer = styled.View`
  align-items: center;
`;

export const VersionText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(10)}px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  opacity: 0.6;
  letter-spacing: 2px;
  margin-top: ${moderateScale(24)}px;
  text-align: center;
`;
