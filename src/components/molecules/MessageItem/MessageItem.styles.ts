import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<{ isUnread: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${moderateScale(16)}px;
  border-radius: ${({ theme }) => theme.roundness.lg}px;
  background-color: ${({ theme, isUnread }) => 
    isUnread ? theme.colors.surface_container_lowest : theme.colors.surface_container_low};
  margin-bottom: ${verticalScale(12)}px;
  ${({ isUnread, theme }) => isUnread && `
    shadow-color: ${theme.colors.shadow};
    shadow-offset: 0px 4px;
    shadow-opacity: 0.05;
    shadow-radius: 8px;
    elevation: 2;
  `}
`;

export const ContentContainer = styled.View`
  flex: 1;
  margin-left: ${scale(12)}px;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(4)}px;
`;

export const RouteContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${verticalScale(4)}px;
`;

export const BadgeContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.primary_container};
  min-width: ${moderateScale(20)}px;
  height: ${moderateScale(20)}px;
  border-radius: ${moderateScale(10)}px;
  justify-content: center;
  align-items: center;
  padding-horizontal: ${scale(4)}px;
  margin-top: ${verticalScale(8)}px;
`;

export const InfoColumn = styled.View`
  align-items: end;
  justify-content: space-between;
  height: 100%;
`;
