import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import { type CoinBadgeVariant } from './types.d';

export const BadgeContainer = styled.Pressable<{ $variant: CoinBadgeVariant }>`
  flex-direction: row;
  align-items: center;
  border-radius: ${moderateScale(999)}px;
  background-color: ${({ theme }) =>
    theme.name === 'dark' ? 'rgba(245, 158, 11, 0.16)' : '#FEF3C7'};
  border-width: 1px;
  border-color: ${({ theme }) =>
    theme.name === 'dark' ? 'rgba(251, 191, 36, 0.4)' : '#FCD34D'};
  padding-horizontal: ${({ $variant }) =>
    $variant === 'header'
      ? scale(10)
      : $variant === 'compact'
      ? scale(8)
      : scale(14)}px;
  padding-vertical: ${({ $variant }) =>
    $variant === 'header'
      ? verticalScale(6)
      : $variant === 'compact'
      ? verticalScale(4)
      : verticalScale(8)}px;
`;

export const CoinIconWrapper = styled.View`
  width: ${moderateScale(20)}px;
  height: ${moderateScale(20)}px;
  border-radius: ${moderateScale(10)}px;
  background-color: #F59E0B;
  align-items: center;
  justify-content: center;
  margin-right: ${scale(6)}px;
`;

export const CoinText = styled.Text<{ $variant: CoinBadgeVariant }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${({ $variant }) =>
    $variant === 'compact' ? responsiveFont(12) : responsiveFont(14)}px;
  color: ${({ theme }) =>
    theme.name === 'dark' ? '#FBBF24' : '#B45309'};
  letter-spacing: -0.2px;
`;

export const HelpIconPressable = styled.Pressable`
  padding: ${moderateScale(2)}px;
  margin-left: ${scale(5)}px;
  align-items: center;
  justify-content: center;
`;
