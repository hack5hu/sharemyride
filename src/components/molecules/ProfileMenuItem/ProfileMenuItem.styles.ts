import styled from 'styled-components/native';
import { moderateScale } from '@/styles';

export interface IconBoxProps {
  bgcolor?: string;
  color?: string;
}

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${moderateScale(16)}px;
  gap: ${moderateScale(16)}px;
  border-radius: ${moderateScale(16)}px;
`;

export const IconBox = styled.View<IconBoxProps>`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme, bgcolor }) => bgcolor || theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
`;
