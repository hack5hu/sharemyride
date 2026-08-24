import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';

export const CardContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px ${moderateScale(18)}px;
  margin-bottom: ${verticalScale(14)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 16px;
  elevation: 3;
`;

export const TopMetaRow = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(14)}px;
`;

export const TimerPill = styled(Box)`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary + '14'};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(5)}px;
  border-radius: ${moderateScale(20)}px;
  gap: ${scale(6)}px;
`;

export const TimerPillText = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(12)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const HeaderRight = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const StatusBadge = styled(Box)<{ $status?: string }>`
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(3)}px;
  background-color: ${({ theme, $status }) =>
    $status === 'PENDING'
      ? theme.colors.warning + '18'
      : theme.colors.primary + '14'};
  border-radius: ${moderateScale(12)}px;
`;

export const StatusBadgeText = styled(Typography)<{ $status?: string }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(10)}px;
  font-weight: 800;
  text-transform: uppercase;
  color: ${({ theme, $status }) =>
    $status === 'PENDING' ? theme.colors.warning : theme.colors.primary};
  letter-spacing: 0.5px;
`;

export const PriceLabel = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(18)}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
`;

export const RouteSection = styled(Box)`
  margin-bottom: ${verticalScale(14)}px;
`;

export const RouteRow = styled(Box)`
  flex-direction: row;
  align-items: center;
`;

export const TimeColumn = styled(Box)`
  width: ${scale(68)}px;
`;

export const TimeText = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(13)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const TrackColumn = styled(Box)`
  align-items: center;
  width: ${scale(24)}px;
`;

export const OriginDot = styled(Box)`
  width: ${moderateScale(9)}px;
  height: ${moderateScale(9)}px;
  border-radius: ${moderateScale(5)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const TrackLine = styled(Box)`
  width: 2px;
  height: ${verticalScale(18)}px;
  background-color: ${({ theme }) => theme.colors.outline_variant + '44'};
  margin-vertical: ${verticalScale(2)}px;
`;

export const DestinationDot = styled(Box)`
  width: ${moderateScale(9)}px;
  height: ${moderateScale(9)}px;
  border-radius: ${moderateScale(2)}px;
  background-color: ${({ theme }) =>
    theme.colors.tertiary || theme.colors.on_surface_variant};
`;

export const LocationColumn = styled(Box)`
  flex: 1;
  padding-left: ${scale(6)}px;
`;

export const LocationText = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(14)}px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const FooterDivider = styled(Box)`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.outline_variant + '25'};
  margin-bottom: ${verticalScale(10)}px;
`;

export const FooterRow = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DriverInfoGroup = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(10)}px;
  flex: 1;
`;

export const DriverTextGroup = styled(Box)`
  flex: 1;
`;

export const DriverNameRow = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const DriverNameText = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(13)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const RatingBadge = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(2)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding-horizontal: ${scale(6)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(8)}px;
`;

export const RatingText = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(10)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const VehicleSubText = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(11)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(1)}px;
`;

export const ActionIconGroup = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;
