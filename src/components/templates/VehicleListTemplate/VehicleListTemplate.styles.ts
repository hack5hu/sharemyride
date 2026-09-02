import styled from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, scale, verticalScale } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(100),
    paddingTop: verticalScale(12),
  },
  showsVerticalScrollIndicator: false,
}))`
  flex: 1;
`;

export const GarageBanner = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_container};
  padding: ${moderateScale(18)}px;
  border-radius: ${moderateScale(22)}px;
  margin-bottom: ${verticalScale(20)}px;
  position: relative;
  overflow: hidden;
  min-height: ${verticalScale(110)}px;
  justify-content: space-between;
`;

export const BannerDecorCircle = styled.View`
  position: absolute;
  right: -${scale(25)}px;
  top: -${scale(25)}px;
  width: ${scale(110)}px;
  height: ${scale(110)}px;
  border-radius: ${scale(55)}px;
  background-color: rgba(255, 255, 255, 0.08);
`;

export const BannerTopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const BannerBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  padding: ${verticalScale(3)}px ${scale(10)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: rgba(255, 255, 255, 0.18);
`;

export const CountPill = styled.View`
  padding: ${verticalScale(3)}px ${scale(10)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: rgba(255, 255, 255, 0.22);
`;

export const BannerBottomContent = styled.View`
  margin-top: ${verticalScale(8)}px;
  gap: ${verticalScale(2)}px;
`;

export const BannerSubtitle = styled(Typography).attrs({
  variant: 'body',
  size: 'xs',
  color: 'on_primary',
})`
  opacity: 0.85;
`;

export const ListContainer = styled.View`
  gap: ${verticalScale(12)}px;
  width: 100%;
`;

export const EmptyState = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: ${verticalScale(60)}px;
  padding-horizontal: ${scale(24)}px;
  gap: ${verticalScale(14)}px;
`;

export const EmptyIconCircle = styled.View`
  width: ${scale(76)}px;
  height: ${scale(76)}px;
  border-radius: ${scale(38)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
`;

export const FloatingButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${verticalScale(12)}px ${scale(16)}px ${verticalScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const Loader = styled.ActivityIndicator`
  margin-top: ${verticalScale(40)}px;
`;

