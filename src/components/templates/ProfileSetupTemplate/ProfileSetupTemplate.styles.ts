import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const ScrollContainer = styled.View`
  flex: 1;
`;

export const MainContent = styled.View`
  flex: 1;
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(24)}px;
  gap: ${moderateScale(24)}px;
  padding-bottom: ${verticalScale(20)}px;
`;

export const FooterContainer = styled.View`
  padding-horizontal: ${scale(30)}px;
  padding-bottom: ${verticalScale(24)}px;
  padding-top: ${verticalScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;
