import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { 
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(100),
    paddingTop: verticalScale(16),
  },
  showsVerticalScrollIndicator: false,
}))`
  flex: 1;
`;

export const EmptyState = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: ${verticalScale(100)}px;
  gap: ${verticalScale(16)}px;
`;

export const ListHeader = styled.View`
  margin-bottom: ${verticalScale(24)}px;
`;

export const ListContainer = styled.View`
  gap: ${moderateScale(16)}px;
  width: 100%;
`;

export const FloatingButtonContainer = styled.View`
  position: absolute;
  bottom: ${verticalScale(32)}px;
  left: ${scale(20)}px;
  right: ${scale(20)}px;
`;
