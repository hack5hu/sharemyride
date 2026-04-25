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

/* ── Fixed Bottom Summary ───────────────────────────────────────── */
export const FixedBottom = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${moderateScale(20)}px ${scale(24)}px;
  padding-bottom: ${verticalScale(32)}px;
  gap: ${verticalScale(16)}px;
  elevation: 10;
  border-top-left-radius: ${moderateScale(24)}px;
  border-top-right-radius: ${moderateScale(24)}px;
  shadow-color: #000;
  shadow-offset: 0px -4px;
  shadow-opacity: 0.1;
  shadow-radius: 8px;
`;

export const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(4)}px;
`;

export const PillBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.primary + '15'};
  border-radius: ${moderateScale(12)}px;
  padding: ${verticalScale(6)}px ${scale(12)}px;
`;

export const ConfirmButton = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${({ theme, disabled }) => (disabled ? theme.colors.outline_variant : theme.colors.primary)};
  border-radius: ${moderateScale(16)}px;
  padding-vertical: ${verticalScale(16)}px;
  align-items: center;
  justify-content: center;
  elevation: ${({ disabled }) => (disabled ? 0 : 8)};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;
