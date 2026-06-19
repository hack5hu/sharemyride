import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { scale } from '@/styles';

export const Container = styled(Box)`
  margin-bottom: 24px;
`;

export const HeaderRow = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-horizontal: ${scale(24)}px;
  margin-bottom: 12px;
`;

export const StyledTitle = styled(Typography)`
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

export const StyledScrollView = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: scale(24), gap: scale(12) },
})``;
