import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { verticalScale } from '@/styles';

export const Container = styled(Box)`
  gap: ${verticalScale(20)}px;
  margin-bottom: ${verticalScale(16)}px;
`;
