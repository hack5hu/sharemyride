import styled from 'styled-components/native';
import { Box } from '@/components/atoms/Box';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled(Box)`
  gap: ${verticalScale(16)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const ReviewBanner = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.primary_container + '26'};
  border-left-width: 4px;
  border-left-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(14)}px ${scale(16)}px;
  margin-top: ${verticalScale(8)}px;
  gap: ${scale(12)}px;
`;

export const ReviewTextContainer = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const ReviewButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${moderateScale(8)}px;
  padding-horizontal: ${scale(14)}px;
  padding-vertical: ${verticalScale(8)}px;
`;
