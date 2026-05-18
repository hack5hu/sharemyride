import styled from 'styled-components/native';
import { verticalScale, moderateScale } from '@/styles';
import { Typography } from '@/components/atoms/Typography';

export const Container = styled.View`
  flex: 1;
`;

export const TitleContainer = styled.View`
  padding-bottom: ${verticalScale(16)}px;
  padding-left: ${moderateScale(4)}px;
`;


export const SectionTitle = styled(Typography)`
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

