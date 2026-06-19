import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';

export const Container = styled(Box)`
  width: 100%;
`;

export const StyledLabel = styled(Typography)`
  margin-bottom: ${({ theme }) => theme.spacing.sm}px;
  text-transform: uppercase;
`;

export const ButtonRow = styled(Box)<{ disabled?: boolean }>`
  flex-direction: row;
  margin-horizontal: -4px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const OptionWrapper = styled(Box)`
  flex: 1;
  margin-horizontal: 4px;
`;

export const StyledButtonWrapper = styled(Box)`
  height: 48px;
`;
