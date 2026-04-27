import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

export const GridRow = styled.View`
  flex-direction: row;
  gap: ${scale(12)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const GridCard = styled.View`
  flex: 1;
  background-color: ${({ theme }) => `${theme.colors.surface_container_lowest}99`};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.on_surface}1A`};
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const SectionLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const EditButton = styled.TouchableOpacity`
  padding: ${moderateScale(6)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: 9999px;
`;

export const GridCardValue = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const GridCardSub = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(2)}px;
`;

export const EmptyStateWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  padding-vertical: ${verticalScale(4)}px;
`;

export const EmptyStateText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`;
