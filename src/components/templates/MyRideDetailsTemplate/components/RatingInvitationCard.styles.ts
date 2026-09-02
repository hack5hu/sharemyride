import styled from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { verticalScale } from '@/styles';
import { SectionCard, SectionLabelRow, SectionDot } from '../MyRideDetailsTemplate.styles';

export const RatingCardContainer = styled(SectionCard)`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  elevation: 0;
  shadow-opacity: 0;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant}40;
`;

export const RatingLabelRow = styled(SectionLabelRow)`
  margin-bottom: ${verticalScale(12)}px;
`;

export const RatingDot = styled(SectionDot)`
  background-color: ${({ theme }) => theme.colors.warning};
`;

export const SubtitleText = styled(Typography)`
  margin-bottom: ${verticalScale(16)}px;
`;
