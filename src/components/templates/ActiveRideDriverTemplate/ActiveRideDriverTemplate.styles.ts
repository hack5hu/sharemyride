import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: verticalScale(40) },
})`
  flex: 1;
`;

export const BodyContent = styled.View`
  padding-horizontal: ${scale(16)}px;
  padding-top: ${verticalScale(16)}px;
  gap: ${verticalScale(18)}px;
`;

export const LiveLocationCard = styled.View<{ $active?: boolean }>`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest || theme.colors.surface};
  padding: ${moderateScale(18)}px;
  border-radius: ${moderateScale(22)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.08;
  shadow-radius: 14px;
  elevation: 3;
  gap: ${verticalScale(12)}px;
  border-width: 1px;
  border-color: ${({ theme, $active }) =>
    $active ? `${theme.colors.primary}30` : `${theme.colors.outline_variant || '#e2e2e2'}30`};
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

export const LiveLocationIconContainer = styled.View<{ $active?: boolean }>`
  width: ${moderateScale(44)}px;
  height: ${moderateScale(44)}px;
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ theme, $active }) =>
    $active ? `${theme.colors.primary}18` : `${theme.colors.on_surface_variant}12`};
  align-items: center;
  justify-content: center;
`;

export const LiveLocationTextGroup = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const LiveLocationTitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const LiveLocationText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const LiveBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
  background-color: #22c55e20;
  padding-horizontal: ${scale(7)}px;
  padding-vertical: ${verticalScale(2.5)}px;
  border-radius: ${moderateScale(6)}px;
`;

export const LiveDot = styled.View`
  width: ${moderateScale(6)}px;
  height: ${moderateScale(6)}px;
  border-radius: ${moderateScale(3)}px;
  background-color: #22c55e;
`;

export const LiveBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(9)}px;
  color: #15803d;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const LiveLocationSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${verticalScale(16)}px;
`;

export const StopsSection = styled.View`
  gap: ${verticalScale(12)}px;
`;

export const StopsHeader = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  letter-spacing: 1.8px;
  text-transform: uppercase;
  padding-horizontal: ${scale(4)}px;
  opacity: 0.75;
`;

export const SafetyButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => `${theme.colors.error || '#ba1a1a'}12`};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(20)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(10)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.error || '#ba1a1a'}25`};
`;

export const SafetyButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.error || '#ba1a1a'};
`;
