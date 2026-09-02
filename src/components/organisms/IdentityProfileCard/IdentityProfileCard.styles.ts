import styled from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';

export const HeaderRow = styled.View<{ $disabledOpacity?: number }>`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${moderateScale(20)}px;
  gap: ${moderateScale(16)}px;
  opacity: ${({ $disabledOpacity }) => $disabledOpacity ?? 1};
`;

export const InfoContainer = styled.View`
  flex: 1;
  gap: ${moderateScale(4)}px;
`;

export const FormContainer = styled.View`
  gap: ${moderateScale(18)}px;
`;

export const PresenceText = styled(Typography)`
  text-transform: uppercase;
  letter-spacing: 1.2px;
  opacity: 0.8;
`;
