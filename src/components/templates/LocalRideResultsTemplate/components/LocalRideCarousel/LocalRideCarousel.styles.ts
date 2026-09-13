import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export const CarouselWrapper = styled.View`
  position: absolute;
  bottom: ${verticalScale(28)}px;
  left: 0;
  right: 0;
  z-index: 10;
`;

export const ContentContainer = styled.View`
  padding-left: ${scale(16)}px;
  padding-right: ${scale(8)}px;
`;

export const EmptyCard = styled.View`
  margin-horizontal: ${scale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(20)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 6px;
  shadow-opacity: 0.1;
  shadow-radius: ${moderateScale(12)}px;
  elevation: 6;
  align-items: center;
`;

export const EmptyIconCircle = styled.View`
  width: ${scale(48)}px;
  height: ${scale(48)}px;
  border-radius: ${scale(24)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(10)}px;
`;

export const EmptyTextContainer = styled.View`
  align-items: center;
  margin-bottom: ${verticalScale(14)}px;
`;

export const EmptySubtitleContainer = styled.View`
  margin-top: ${verticalScale(4)}px;
`;
