import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const BannerContainer = styled.TouchableOpacity<{ $topInset?: number }>`
  background-color: ${({ theme }) => theme.colors.error_container || '#ffdad6'};
  padding-horizontal: ${({ theme }) => scale(theme.spacing.md)}px;
  padding-top: ${({ theme, $topInset = 0 }) => verticalScale(theme.spacing.sm) + $topInset}px;
  padding-bottom: ${({ theme }) => verticalScale(theme.spacing.sm)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-left-radius: ${({ theme }) => moderateScale(theme.roundness.md)}px;
  border-bottom-right-radius: ${({ theme }) => moderateScale(theme.roundness.md)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow || '#000000'};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 4px;
  elevation: 4;
  z-index: 9999;
`;

export const LeftContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-right: ${({ theme }) => scale(theme.spacing.sm)}px;
`;

export const IconBadge = styled.View`
  width: ${({ theme }) => moderateScale(34)}px;
  height: ${({ theme }) => moderateScale(34)}px;
  border-radius: ${({ theme }) => moderateScale(theme.roundness.full)}px;
  background-color: ${({ theme }) => theme.colors.error || '#ba1a1a'};
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => scale(theme.spacing.sm)}px;
`;

export const TextColumn = styled.View`
  flex: 1;
`;

export const TitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(13)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_error_container || '#410002'};
`;

export const SubtitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_error_container || '#410002'};
  opacity: 0.9;
  margin-top: ${({ theme }) => verticalScale(2)}px;
`;

export const ActionButton = styled.View`
  background-color: ${({ theme }) => theme.colors.error || '#ba1a1a'};
  padding-horizontal: ${({ theme }) => scale(theme.spacing.sm + 2)}px;
  padding-vertical: ${({ theme }) => verticalScale(6)}px;
  border-radius: ${({ theme }) => moderateScale(theme.roundness.full)}px;
  flex-direction: row;
  align-items: center;
`;

export const ActionButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_error};
  margin-right: ${({ theme }) => scale(4)}px;
`;
