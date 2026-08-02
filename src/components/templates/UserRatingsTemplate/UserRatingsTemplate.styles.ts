import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled(Box)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ContentContainer = styled(Box)`
  flex: 1;
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(16)}px;
`;

export const ReviewCard = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  margin-bottom: ${verticalScale(12)}px;
`;

export const ReviewHeader = styled(Box)`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${verticalScale(12)}px;
`;

export const ReviewerInfo = styled(Box)`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const StarsRow = styled(Box)`
  flex-direction: row;
  gap: ${scale(2)}px;
`;
