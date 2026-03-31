import styled from 'styled-components/native';
import { moderateScale } from '@/styles';

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${moderateScale(24)}px;
  gap: ${moderateScale(16)}px;
`;

export const InfoContainer = styled.View`
  flex: 1;
`;

export const FormContainer = styled.View`
  gap: ${moderateScale(24)}px;
`;
