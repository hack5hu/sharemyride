import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

export const RecentItemContainer = styled.View`
  padding-horizontal: ${moderateScale(24)}px;
`;

export const RecentItem = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${verticalScale(16)}px;
  border-width: 1.5px;
  border-color: ${({ theme }) => `${theme.colors.outline_variant}10`};
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.03;
  shadow-radius: 8px;
  elevation: 2;
`;

export const RecentLeft = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  gap: ${scale(14)}px;
`;

export const RecentIconBox = styled.View`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  border-radius: ${moderateScale(24)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  align-items: center;
  justify-content: center;
`;

export const RecentContent = styled.View`
  flex: 1;
  padding-right: ${scale(8)}px;
`;

export const RecentTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const RecentSub = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(2)}px;
`;
