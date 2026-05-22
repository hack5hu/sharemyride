import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export const Root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContent = styled.ScrollView`
  flex: 1;
`;

export const ContentPadding = styled.View`
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(16)}px;
  gap: ${verticalScale(24)}px;
  align-items: center;
`;

/* ── Vehicle meta strip ─────────────────────────────────────────── */
export const MetaStrip = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(16)}px;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(12)}px;
`;

export const MetaItem = styled.View`
  align-items: center;
  gap: ${verticalScale(2)}px;
`;

/* ── Fixed Footer ────────────────────────────────────────────────── */
export const FixedFooter = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(34)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  elevation: 8;
  shadow-color: #000;
  shadow-offset: 0px -4px;
  shadow-opacity: 0.08;
  shadow-radius: 12px;
  z-index: 50;
  gap: ${verticalScale(12)}px;
  align-items: stretch;
`;

export const SummaryRow = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PillBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.primary + '15'};
  border-radius: ${moderateScale(12)}px;
  padding: ${verticalScale(6)}px ${scale(12)}px;
`;

export const CoRiderList = styled.View`
  gap: ${verticalScale(12)}px;
`;

export const CoRiderCard = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(12)}px;
  elevation: 1;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 1px;
  shadow-opacity: 0.02;
  shadow-radius: 4px;
`;

export const PassengerAvatar = styled.Image`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
`;

export const HeaderIntro = styled.View`
  width: 100%;
  gap: ${verticalScale(4)}px;
  margin-bottom: ${verticalScale(8)}px;
`;

export const LegendWrapper = styled.View`
  width: 100%;
  margin-top: ${verticalScale(8)}px;
`;

export const CarPlanWrapper = styled.View`
  margin-top: ${verticalScale(16)}px;
`;

export const CoRidersSection = styled.View`
  width: 100%;
  margin-top: ${verticalScale(24)}px;
`;

import { Typography } from '@/components/atoms/Typography';
export const CoRidersTitle = styled(Typography)`
  margin-bottom: ${verticalScale(12)}px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const PassengerInfo = styled.View`
  flex: 1;
  margin-left: ${moderateScale(12)}px;
`;

