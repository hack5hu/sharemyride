import styled from 'styled-components/native';
import { moderateScale } from '@/styles';
import { Typography } from '@/components/atoms/Typography';

export const HeaderRow = styled.View<{ $disabledOpacity?: number }>`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${moderateScale(24)}px;
  gap: ${moderateScale(16)}px;
  opacity: ${({ $disabledOpacity }) => $disabledOpacity ?? 1};
`;

export const InfoContainer = styled.View`
  flex: 1;
`;

export const FormContainer = styled.View`
  gap: ${moderateScale(24)}px;
`;

export const PresenceText = styled(Typography)`
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;
