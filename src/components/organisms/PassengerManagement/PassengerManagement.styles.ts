import styled from 'styled-components/native';
import { IconButton } from '@/components/atoms/IconButton';
import { scale, verticalScale, moderateScale } from '@/styles';

export const SectionCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(18)}px ${moderateScale(20)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 16px;
  elevation: 3;
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
  padding: ${moderateScale(14)}px ${moderateScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(16)}px;
  gap: ${scale(12)}px;
`;

export const PassengerInfo = styled.View`
  flex: 1;
  gap: ${verticalScale(4)}px;
`;

export const RightActionsGroup = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const SegmentRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const SeatBadge = styled.View`
  align-self: flex-start;
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(3)}px;
  border-radius: ${moderateScale(6)}px;
  margin-top: ${verticalScale(2)}px;
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

export const RemoveButton = styled.TouchableOpacity`
  width: ${moderateScale(36)}px;
  height: ${moderateScale(36)}px;
  border-radius: ${moderateScale(18)}px;
  background-color: ${({ theme }) => `${theme.colors.error}14`};
  align-items: center;
  justify-content: center;
`;

export const RateButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.warning};
  background-color: ${({ theme }) => `${theme.colors.warning}1A`};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const RatedBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
  background-color: ${({ theme }) => `${theme.colors.on_surface_variant}12`};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: ${moderateScale(12)}px;
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
