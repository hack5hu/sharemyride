import styled from 'styled-components/native';
import { moderateScale } from '@/styles';
import { InfoBarProps, InfoBarVariant } from './types';

export const StyledInfoBar = styled.View<{ variant: InfoBarVariant; colors: any }>`
  flex-direction: row;
  align-items: flex-start;
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ colors }) => colors.bg};
  border-width: 1px;
  border-color: ${({ colors }) => colors.border};
`;

export const IconContainer = styled.View`
  margin-right: ${moderateScale(12)}px;
  margin-top: ${moderateScale(1)}px;
`;

export const TextContainer = styled.View`
  flex: 1;
`;
