import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.TouchableOpacity<{ isDraft: boolean }>`
  flex-direction: row;
  align-items: center;
  padding: ${moderateScale(16)}px;
  background-color: ${({ theme, isDraft }) => 
    isDraft ? theme.colors.surface_container + '80' : theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(12)}px;
  gap: ${scale(12)}px;
  ${({ isDraft, theme }) => isDraft && `
    border-width: 1px;
    border-style: dashed;
    border-color: ${theme.colors.outline_variant};
  `}
`;

export const IconBox = styled.View<{ bgColor?: string }>`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme, bgColor }) => bgColor || theme.colors.surface_container_highest};
  align-items: center;
  justify-content: center;
`;

export const TextContent = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const Title = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(14)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const SubAddress = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(12)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const PriceText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(14)}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.on_surface};
`;
