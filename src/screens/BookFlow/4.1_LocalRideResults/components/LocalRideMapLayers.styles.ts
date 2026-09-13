import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export const DistanceBadge = styled.View<{ bgColor?: string }>`
  background-color: ${({ bgColor, theme }) =>
    bgColor || theme.colors.surface_container_lowest};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(12)}px;
  flex-direction: row;
  align-items: center;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: ${moderateScale(4)}px;
  elevation: 5;
  border-width: 1.5px;
  border-color: #ffffff;
`;

export const DistanceBadgeText = styled.View`
  margin-left: ${scale(3)}px;
`;
