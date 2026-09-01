import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export interface IconBoxProps {
  bgcolor?: string;
}

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${moderateScale(12)}px ${moderateScale(14)}px;
  gap: ${scale(14)}px;
  border-radius: ${moderateScale(16)}px;
`;

export const IconBox = styled.View<IconBoxProps>`
  width: ${scale(42)}px;
  height: ${scale(42)}px;
  border-radius: ${moderateScale(14)}px;
  background-color: ${({ theme, bgcolor }) =>
    bgcolor || theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const ChevronCircle = styled.View`
  width: ${scale(28)}px;
  height: ${scale(28)}px;
  border-radius: ${scale(14)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
`;

