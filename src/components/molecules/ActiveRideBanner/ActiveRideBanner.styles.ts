import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const BannerContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  margin-horizontal: ${scale(16)}px;
  margin-top: ${verticalScale(10)}px;
  margin-bottom: ${verticalScale(8)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.15;
  shadow-radius: 12px;
  elevation: 6;
  position: relative;
  overflow: hidden;
`;

export const TopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${verticalScale(6)}px;
`;

export const StatusBadgeRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const PulsingDot = styled.View`
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: ${moderateScale(4)}px;
  background-color: ${({ theme }) => theme.colors.primary_fixed || '#8df7c1'};
`;

export const StatusBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.primary_fixed_dim || '#a7d0b8'};
  letter-spacing: 1.2px;
  text-transform: uppercase;
`;

export const DismissButton = styled.TouchableOpacity`
  padding: ${moderateScale(4)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: rgba(255, 255, 255, 0.15);
`;

export const MainContentRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${scale(12)}px;
`;

export const TextSection = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const TitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const SubtitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 400;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_primary}CC;
`;

export const ActionPill = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  background-color: rgba(255, 255, 255, 0.2);
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const ActionPillText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;
