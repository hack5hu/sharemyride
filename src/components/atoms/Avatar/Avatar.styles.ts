import styled from 'styled-components/native';
import { moderateScale } from '@/styles';
import { AvatarProps, AvatarSize } from './types';

const sizes: Record<AvatarSize, number> = {
  sm: 40,
  md: 64,
  lg: 80,
  xl: 120,
};

export const StyledAvatar = styled.View<{ size: AvatarSize; border?: boolean }>`
  width: ${({ size }) => moderateScale(sizes[size])}px;
  height: ${({ size }) => moderateScale(sizes[size])}px;
  border-radius: ${({ size }) => moderateScale(sizes[size] / 2)}px;
  background-color: ${({ theme }) => theme.colors.surface_container};
  overflow: hidden;
  ${({ border, theme }) =>
    border &&
    `
    border-width: 2px;
    border-color: ${theme.colors.primary_container};
  `}
  justify-content: center;
  align-items: center;
`;

export const AvatarImage = styled.Image<{ size: AvatarSize }>`
  width: 100%;
  height: 100%;
`;

export const PlaceholderContainer = styled.View<{ size: AvatarSize }>`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container};
`;
