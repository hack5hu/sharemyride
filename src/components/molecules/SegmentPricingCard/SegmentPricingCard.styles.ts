import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

/* ──── Styles ──── */
export const Card = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(16)}px;
  gap: ${verticalScale(12)}px;
`;

export const HeaderRow = styled(Box)`
  flex-direction: column;
  align-items: flex-start;
  gap: ${scale(10)}px;
`;

export const SegmentBadge = styled(Box)`
  background-color: ${({ theme }) => theme.colors.primary_container};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(6)}px;
`;

export const SegmentBadgeText = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(9)}px;
  color: ${({ theme }) => theme.colors.on_primary_container};
  text-transform: uppercase;
`;

export const RouteContainer = styled(Box)`
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`;

export const RouteItem = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;
export const Line = styled(Box)`
  width: ${scale(2)}px;
  height: ${verticalScale(20)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-left: ${scale(6)}px;
`;
export const RouteText = styled(Typography)`
  flex: 1;
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const PriceSection = styled(Box)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding: ${moderateScale(12)}px ${moderateScale(4)}px;
  border-radius: ${moderateScale(12)}px;
  gap: ${scale(10)}px;
`;

/* Front seat section — Using 'No-Line' rule with subtle surface variance */
export const FrontSeatSection = styled(Box)`
  padding: ${moderateScale(14)}px;
  background-color: ${({ theme }) => `${theme.colors.secondary_container}20`};
  border-radius: ${moderateScale(12)}px;
  gap: ${verticalScale(4)}px;
`;

export const FrontSeatTop = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FrontSeatLabelRow = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const FrontSeatLabel = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
`;

export const MathBreakdown = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  letter-spacing: 0.2px;
`;

export const TotalFrontSeatPrice = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const HelperText = styled(Typography)`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.outline};
  font-style: italic;
`;
