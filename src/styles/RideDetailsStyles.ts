import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';
import { ActivityIndicator as RNActivityIndicator } from 'react-native';

export const RideDetailsActivityIndicator = styled(RNActivityIndicator)``;

export const RideDetailsRoot = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const RideDetailsReportButton = styled.TouchableOpacity`
  padding: ${moderateScale(8)}px;
`;

export const RideDetailsScrollContent = styled.ScrollView`
  flex: 1;
`;

export const RideDetailsContentPadding = styled.View`
  padding-horizontal: ${scale(20)}px;
  padding-bottom: ${verticalScale(140)}px;
  gap: ${verticalScale(16)}px;
`;

export const RideDetailsSectionCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(28)}px;
  padding: ${moderateScale(20)}px;
  elevation: 1;
`;

export const RideDetailsSectionLabelRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const RideDetailsSectionDot = styled.View<{ color?: string }>`
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: ${moderateScale(4)}px;
  background-color: ${({ theme, color }) => color || theme.colors.primary};
`;

export const RideDetailsChipsWrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${moderateScale(8)}px;
`;

export const RideDetailsPreferenceChip = styled.View<{ accent?: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme, accent }) =>
    accent ? `${theme.colors.primary}18` : theme.colors.surface_container_low};
`;

export const RideDetailsFixedFooter = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(34)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  elevation: 8;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px -4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
`;
