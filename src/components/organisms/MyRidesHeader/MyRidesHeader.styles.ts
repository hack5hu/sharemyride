import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  padding-top: ${verticalScale(16)}px;
  z-index: 40;
`;

export const TopSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(24)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const LeftActions = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
`;

export const MenuButton = styled.TouchableOpacity`
  padding: ${moderateScale(8)}px;
  border-radius: ${moderateScale(24)}px;
`;

export const TitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(24)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -0.5px;
`;

export const ProfileWrapper = styled.TouchableOpacity`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: ${moderateScale(20)}px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.primary_container};
  overflow: hidden;
`;

export const AvatarImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const TabNavigation = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: scale(24),
    gap: scale(32),
  },
})`
  flex-grow: 0;
  margin-bottom: ${verticalScale(4)}px;
`;

export const TabButton = styled.TouchableOpacity<{ isActive: boolean }>`
  padding-bottom: ${verticalScale(8)}px;
  border-bottom-width: 2px;
  border-bottom-color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : 'transparent'};
`;

export const TabLabel = styled.Text<{ isActive: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-size: ${moderateScale(14)}px;
  font-weight: ${({ isActive }) => (isActive ? '800' : '500')};
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.on_surface_variant + '99'};
`;
