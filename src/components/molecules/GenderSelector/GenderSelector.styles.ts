import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, scale } from '@/styles';

export const Container = styled(Box)`
  width: 100%;
`;

export const StyledLabel = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const ButtonRow = styled(Box)<{ disabled?: boolean }>`
  flex-direction: row;
  margin-horizontal: -${scale(4)}px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const OptionWrapper = styled(Box)`
  flex: 1;
  margin-horizontal: ${scale(4)}px;
`;

export const StyledButtonWrapper = styled(Box)`
  height: ${moderateScale(48)}px;
`;
