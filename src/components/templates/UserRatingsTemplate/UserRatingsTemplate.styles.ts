import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentContainer = styled.View`
  flex: 1;
  padding-horizontal: ${scale(20)}px;
  padding-top: ${verticalScale(8)}px;
`;

export const RatingSummaryBanner = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${verticalScale(20)}px ${scale(20)}px;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
  elevation: 3;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  gap: ${verticalScale(6)}px;
`;

export const ScoreRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const StarsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(3)}px;
`;

export const ReviewCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(16)}px;
  margin-bottom: ${verticalScale(12)}px;
  elevation: 2;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.04;
  shadow-radius: 8px;
  gap: ${verticalScale(10)}px;
`;

export const ReviewHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ReviewerInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(10)}px;
  flex: 1;
`;

export const ReviewComment = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(13)}px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.on_surface};
  line-height: ${moderateScale(18)}px;
`;

export const EmptyStateWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-vertical: ${verticalScale(60)}px;
  gap: ${verticalScale(12)}px;
`;

export const EmptyIconCircle = styled.View`
  width: ${moderateScale(64)}px;
  height: ${moderateScale(64)}px;
  border-radius: ${moderateScale(32)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
  align-items: center;
  justify-content: center;
`;
