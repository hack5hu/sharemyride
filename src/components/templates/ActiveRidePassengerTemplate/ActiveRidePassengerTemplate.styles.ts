import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(36),
  },
})`
  flex: 1;
`;

export const LiveLocationCard = styled.View<{ $active: boolean }>`
  background-color: ${({ theme }) =>
    theme.colors.surface_container_lowest || theme.colors.surface};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(14)}px ${moderateScale(16)}px;
  margin-bottom: ${verticalScale(12)}px;
  border-width: 1px;
  border-color: ${({ theme, $active }) =>
    $active ? `${theme.colors.primary}30` : `${theme.colors.outline_variant || '#e2e2e2'}30`};
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  elevation: 3;
`;

export const LiveLocationTopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LiveLocationLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  flex: 1;
`;

export const LiveLocationIconContainer = styled.View<{ $active: boolean }>`
  width: ${moderateScale(38)}px;
  height: ${moderateScale(38)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme, $active }) =>
    $active ? `${theme.colors.primary}18` : theme.colors.surface_container_low};
  align-items: center;
  justify-content: center;
`;

export const LiveLocationTextGroup = styled.View`
  flex: 1;
`;

export const LiveLocationTitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const LiveLocationText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14.5)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const LiveBadge = styled.View`
  background-color: #22c55e20;
  padding-horizontal: ${scale(7)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(6)}px;
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const LiveDot = styled.View`
  width: ${moderateScale(5)}px;
  height: ${moderateScale(5)}px;
  border-radius: 3px;
  background-color: #22c55e;
`;

export const LiveBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(9)}px;
  color: #15803d;
  letter-spacing: 0.5px;
`;

export const LiveLocationSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(6)}px;
  line-height: ${verticalScale(16)}px;
`;

export const TimelineCard = styled.View`
  background-color: ${({ theme }) =>
    theme.colors.surface_container_lowest || theme.colors.surface};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  gap: ${verticalScale(14)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  elevation: 3;
  margin-bottom: ${verticalScale(12)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.outline_variant || '#e2e2e2'}30`};
`;

export const TimelineHeader = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  letter-spacing: 1.2px;
  text-transform: uppercase;
  opacity: 0.75;
`;

export const SafetyCenterButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => `${theme.colors.error || '#ba1a1a'}12`};
  padding-vertical: ${verticalScale(14)}px;
  border-radius: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
  margin-top: ${verticalScale(6)}px;
`;

export const SafetyCenterButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(13.5)}px;
  color: ${({ theme }) => theme.colors.error || '#ba1a1a'};
`;
