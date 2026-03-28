import styled from 'styled-components/native';
import { scale, verticalScale } from '@/styles';

export const StyledSocialButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  height: ${verticalScale(52)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${({ theme }) => theme.roundness.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant};
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
`;

export const IconImage = styled.Image`
  width: ${scale(20)}px;
  height: ${scale(20)}px;
`;
