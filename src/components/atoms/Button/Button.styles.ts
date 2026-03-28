import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale } from '@/styles';
import { ButtonVariant } from './types';

export const StyledButton = styled.TouchableOpacity`
  width: 100%;
  height: ${verticalScale(52)}px;
  border-radius: ${({ theme }) => theme.roundness.md}px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const GradientBackground = styled(LinearGradient)`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: ${scale(8)}px;
`;

export const OutlineContainer = styled.View<{ variant: ButtonVariant }>`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: ${scale(8)}px;
  border-width: ${({ variant }) => (variant === 'outline' ? 1.5 : 0)}px;
  border-color: ${({ theme, variant }) => variant === 'outline' ? theme.colors.outline_variant : 'transparent'};
  border-radius: ${({ theme }) => theme.roundness.md}px;
  background-color: ${({ theme, variant }) => variant === 'secondary' ? theme.colors.surface_container : 'transparent'};
`;

export const ButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
`;
