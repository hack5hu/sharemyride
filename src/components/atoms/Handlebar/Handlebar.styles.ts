import styled from 'styled-components/native';
import { moderateScale, verticalScale } from '@/styles';

export const Bar = styled.View`
  width: ${moderateScale(48)}px;
  height: ${verticalScale(6)}px;
  background-color: ${({ theme }) => theme.colors.outline_variant};
  border-radius: ${moderateScale(3)}px;
  align-self: center;
  margin-vertical: ${verticalScale(16)}px;
`;
