import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
  justify-content: center;
  align-items: center;
`;

/* ── Decorative background orbs ── */

export const GradientOrb = styled(Animated.View)<{
  size: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}>`
  position: absolute;
  width: ${({ size }) => scale(size)}px;
  height: ${({ size }) => scale(size)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.primary};
  opacity: 0.06;
  ${({ top }) => (top !== undefined ? `top: ${verticalScale(top)}px;` : '')}
  ${({ bottom }) =>
    bottom !== undefined ? `bottom: ${verticalScale(bottom)}px;` : ''}
  ${({ left }) => (left !== undefined ? `left: ${scale(left)}px;` : '')}
  ${({ right }) => (right !== undefined ? `right: ${scale(right)}px;` : '')}
`;

export const AccentOrb = styled(Animated.View)<{
  size: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}>`
  position: absolute;
  width: ${({ size }) => scale(size)}px;
  height: ${({ size }) => scale(size)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.primary_container};
  opacity: 0.1;
  ${({ top }) => (top !== undefined ? `top: ${verticalScale(top)}px;` : '')}
  ${({ bottom }) =>
    bottom !== undefined ? `bottom: ${verticalScale(bottom)}px;` : ''}
  ${({ left }) => (left !== undefined ? `left: ${scale(left)}px;` : '')}
  ${({ right }) => (right !== undefined ? `right: ${scale(right)}px;` : '')}
`;

/* ── Centre branding cluster ── */

export const BrandCluster = styled(Animated.View)`
  align-items: center;
  justify-content: center;
`;

export const LogoRow = styled.View`
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
`;

export const SubtitleRow = styled(Animated.View)`
  align-items: center;
  margin-top: ${verticalScale(4)}px;
`;

/* ── Bottom loading area ── */

export const LoaderSection = styled(Animated.View)`
  position: absolute;
  bottom: ${verticalScale(72)}px;
  align-items: center;
`;

export const PulseRing = styled(Animated.View)`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: 9999px;
  border-width: ${moderateScale(2.5)}px;
  border-color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${verticalScale(12)}px;
`;

/* ── Subtle version tag ── */

export const VersionTag = styled.View`
  position: absolute;
  bottom: ${verticalScale(32)}px;
  align-items: center;
`;
