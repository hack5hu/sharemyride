import styled from 'styled-components/native';
import { scale, moderateScale } from '@/styles';

export const ModalContainer = styled.View`
  width: ${scale(320)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.roundness.lg}px;
  overflow: hidden;
  padding: ${moderateScale(12)}px;
  gap: ${moderateScale(8)}px;
`;

export const TitleContainer = styled.View`
  padding: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
`;

export const OptionItem = styled.TouchableOpacity`
  padding: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.surface_container};
  border-radius: ${({ theme }) => theme.roundness.md}px;
  gap: ${moderateScale(8)}px;
`;
