import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const TimelineRow = styled.View<{ $isPending?: boolean }>`
  flex-direction: row;
  align-items: flex-start;
  gap: ${scale(14)}px;
  position: relative;
  opacity: ${({ $isPending }) => ($isPending ? 0.9 : 1)};
`;

export const IndicatorColumn = styled.View`
  align-items: center;
  justify-content: flex-start;
  width: ${scale(18)}px;
  padding-top: ${verticalScale(4)}px;
`;

export const StatusDot = styled.View<{
  $isCurrentUser?: boolean;
  $isCompleted?: boolean;
}>`
  width: ${moderateScale(14)}px;
  height: ${moderateScale(14)}px;
  border-radius: ${moderateScale(7)}px;
  background-color: ${({ theme, $isCurrentUser, $isCompleted }) =>
    $isCurrentUser || $isCompleted
      ? theme.colors.primary
      : theme.colors.outline_variant};
  ${({ $isCurrentUser, theme }) =>
    $isCurrentUser &&
    `
    border-width: 3px;
    border-color: ${theme.colors.primary}30;
  `}
`;

export const TimelineConnector = styled.View`
  position: absolute;
  top: ${verticalScale(20)}px;
  bottom: -${verticalScale(16)}px;
  width: 1.5px;
  background-color: ${({ theme }) => theme.colors.outline_variant}50;
  align-self: center;
`;

export const ContentBox = styled.View<{ $isCurrentUser?: boolean }>`
  flex: 1;
  padding: ${({ $isCurrentUser }) =>
    $isCurrentUser ? `${moderateScale(12)}px` : '0px'};
  background-color: ${({ theme, $isCurrentUser }) =>
    $isCurrentUser ? `${theme.colors.primary}0D` : 'transparent'};
  border-radius: ${moderateScale(14)}px;
  gap: ${verticalScale(6)}px;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextGroup = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const TitleText = styled.Text<{ $isCurrentUser?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: ${({ $isCurrentUser }) => ($isCurrentUser ? '700' : '600')};
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme, $isCurrentUser }) =>
    $isCurrentUser ? theme.colors.primary : theme.colors.on_surface};
  line-height: ${verticalScale(19)}px;
`;

export const SubtitleText = styled.Text<{ $isCurrentUser?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme, $isCurrentUser }) =>
    $isCurrentUser
      ? `${theme.colors.primary}CC`
      : theme.colors.on_surface_variant};
`;

export const ActionsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  margin-top: ${verticalScale(4)}px;
`;

export const ActionPill = styled.TouchableOpacity<{ $copied?: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
  background-color: ${({ theme, $copied }) =>
    $copied ? '#22c55e15' : theme.colors.surface_container_low};
  padding-horizontal: ${scale(9)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(8)}px;
`;

export const ActionPillText = styled.Text<{ $copied?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme, $copied }) =>
    $copied ? '#15803d' : theme.colors.primary};
`;

export const UserIconBadge = styled.View`
  width: ${moderateScale(28)}px;
  height: ${moderateScale(28)}px;
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}20`};
  align-items: center;
  justify-content: center;
`;
