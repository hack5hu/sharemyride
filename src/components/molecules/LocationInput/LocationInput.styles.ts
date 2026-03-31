import styled from 'styled-components/native';
import { moderateScale } from '@/styles';

export const Container = styled.View`
  width: 100%;
`;

export const TagRow = styled.View`
  flex-direction: row;
  margin-top: ${moderateScale(12)}px;
  flex-wrap: wrap;
`;
