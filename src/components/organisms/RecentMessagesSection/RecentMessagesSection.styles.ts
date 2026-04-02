import styled from 'styled-components/native';
import { verticalScale, moderateScale } from '@/styles';

export const Container = styled.View`
  flex: 1;
`;

export const TitleContainer = styled.View`
  padding-bottom: ${verticalScale(16)}px;
  padding-left: ${moderateScale(4)}px;
`;
