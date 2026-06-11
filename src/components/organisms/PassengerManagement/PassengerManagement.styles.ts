import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';
import { IconButton } from '@/components/atoms/IconButton';

export const SectionCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(20)}px;
  margin-bottom: ${verticalScale(16)}px;
  elevation: 2;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.04;
  shadow-radius: 12px;
`;

export const SectionLabelRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
`;

export const SectionDot = styled.View<{ color?: string }>`
  width: ${moderateScale(8)}px;
  height: ${moderateScale(8)}px;
  border-radius: ${moderateScale(4)}px;
  background-color: ${({ theme, color }) => color || theme.colors.primary};
  margin-right: ${scale(8)}px;
`;

export const PassengerList = styled.View`
  gap: ${verticalScale(10)}px;
`;

export const PassengerCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${moderateScale(14)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(16)}px;
`;

export const PassengerInfo = styled.View`
  flex: 1;
  margin-left: ${scale(12)}px;
  gap: ${verticalScale(4)}px;
`;

export const SeatBadge = styled.View`
  align-self: flex-start;
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(8)}px;
`;

export const CoRidersList = styled.ScrollView`
  width: auto;
  margin-horizontal: -20px;
`;

export const CoRiderCapsule = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding-left: ${scale(14)}px;
  padding-right: ${scale(14)}px;
  padding-vertical: ${verticalScale(8)}px;
  border-radius: ${moderateScale(16)}px;
`;

export const RemoveButton = styled(IconButton)`
  border-color: ${({ theme }) => theme.colors.error};
  background-color: ${({ theme }) => `${theme.colors.error}08`};
`;

export const RateButton = styled(IconButton)`
  border-color: ${({ theme }) => theme.colors.warning};
  background-color: ${({ theme }) => `${theme.colors.warning}1A`};
`;

// Empty State Styles
export const EmptyStateContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: ${verticalScale(20)}px;
  gap: ${verticalScale(12)}px;
`;

export const EmptyIconCircle = styled.View`
  width: ${moderateScale(64)}px;
  height: ${moderateScale(64)}px;
  border-radius: ${moderateScale(32)}px;
  background-color: ${({ theme }) => `${theme.colors.tertiary}12`};
  align-items: center;
  justify-content: center;
`;
