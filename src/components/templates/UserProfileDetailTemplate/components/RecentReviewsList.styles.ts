import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const ReviewItem = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding: ${moderateScale(14)}px;
  border-radius: ${moderateScale(14)}px;
  gap: ${verticalScale(8)}px;
`;

export const ReviewHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ReviewerMeta = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(10)}px;
`;

export const StarsRow = styled.View`
  flex-direction: row;
  gap: ${scale(2)}px;
`;

export const ReviewCommentText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(12)}px;
  font-style: italic;
  color: ${({ theme }) => theme.colors.on_surface};
`;

