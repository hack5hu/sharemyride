import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${verticalScale(12)}px;
  gap: ${scale(16)}px;
`;

export const IconBox = styled.View<{ isCurrent?: boolean }>`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme, isCurrent }) => 
    isCurrent ? theme.colors.secondary_container : theme.colors.surface_container_highest};
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
  font-weight: 400;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;
