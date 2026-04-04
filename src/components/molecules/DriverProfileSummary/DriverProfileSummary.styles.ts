import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const AvatarWrapper = styled.View`
  position: relative;
`;

export const Avatar = styled.Image`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  border-radius: ${moderateScale(24)}px;
`;

export const InfoSection = styled.View`
  gap: ${verticalScale(2)}px;
`;

export const Name = styled.Text<{ variant: string }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(16)}px;
  font-weight: 800;
  color: ${({ theme, variant }) => 
    variant === 'bento' ? theme.colors.on_primary_fixed_variant : theme.colors.on_surface};
`;

export const RatingRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
`;

export const SubInfo = styled.Text<{ variant: string }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(10)}px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${({ theme, variant }) => 
    variant === 'bento' ? theme.colors.on_primary_fixed_variant : theme.colors.on_surface_variant};
  opacity: ${({ variant }) => (variant === 'bento' ? 0.7 : 1)};
`;

export const PriceText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(20)}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
`;
