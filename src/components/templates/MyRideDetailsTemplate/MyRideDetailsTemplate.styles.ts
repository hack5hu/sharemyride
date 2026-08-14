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
  RideDetailsSectionDot as SectionDot,
  RideDetailsChipsWrap as ChipsWrap,
  RideDetailsPreferenceChip as PreferenceChip,
  RideDetailsFixedFooter as FixedFooter,
} from '@/styles/RideDetailsStyles';

export const PassengerSummaryCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(28)}px;
  padding: ${moderateScale(20)}px;
  elevation: 1;
  gap: ${verticalScale(16)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 1px;
  shadow-opacity: 0.05;
  shadow-radius: 4px;
`;

export const SummaryRow = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const SummaryItem = styled.View`
  flex: 1;
  align-items: center;
  gap: ${verticalScale(6)}px;
`;

export const SummaryDivider = styled.View`
  width: 1px;
  height: ${verticalScale(32)}px;
  background-color: ${({ theme }) => theme.colors.outline_variant};
`;

export const HorizontalDivider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.outline_variant};
  margin-horizontal: ${scale(10)}px;
`;
