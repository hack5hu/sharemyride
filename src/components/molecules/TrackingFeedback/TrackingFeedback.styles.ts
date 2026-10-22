import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, verticalScale } from '@/styles';

export const Container = styled(Box)`
  gap: ${verticalScale(6)}px;
`;
export const Label = styled(Typography)<{ $live: boolean }>`
  color: ${({ theme, $live }) => $live ? theme.colors.primary : theme.colors.on_surface_variant};
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding: ${moderateScale(6)}px;
  border-radius: ${moderateScale(8)}px;
  align-self: flex-start;
`;
