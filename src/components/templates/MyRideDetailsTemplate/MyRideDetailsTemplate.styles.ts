import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export {
  RideDetailsActivityIndicator as ActivityIndicator,
  RideDetailsRoot as Root,
  RideDetailsReportButton as ReportButton,
  RideDetailsScrollContent as ScrollContent,
  RideDetailsContentPadding as ContentPadding,
  RideDetailsSectionCard as SectionCard,
  RideDetailsSectionLabelRow as SectionLabelRow,
  RideDetailsTimelineLabelRow as TimelineLabelRow,
  RideDetailsSectionDot as SectionDot,
  RideDetailsChipsWrap as ChipsWrap,
  RideDetailsPreferenceChip as PreferenceChip,
  RideDetailsFixedFooter as FixedFooter,
} from '@/styles/RideDetailsStyles';

export const PassengerSummaryGrid = styled.View`
  gap: ${verticalScale(8)}px;
  margin-top: ${verticalScale(4)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: ${scale(8)}px;
`;

export const SummaryTile = styled.View`
  flex: 1;
  align-items: center;
  padding: ${verticalScale(12)}px ${scale(6)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(16)}px;
  elevation: 3;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.06;
  shadow-radius: 12px;
  gap: ${verticalScale(2)}px;
`;

export const SummaryTileIcon = styled.View`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: ${moderateScale(10)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}14`};
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(4)}px;
`;
