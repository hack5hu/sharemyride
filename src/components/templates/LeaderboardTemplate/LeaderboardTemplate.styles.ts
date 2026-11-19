import styled from 'styled-components/native';
import { moderateScale, responsiveFont, scale, verticalScale } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(10)}px;
`;

export const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-right: ${scale(8)}px;
`;

export const BackButton = styled.Pressable`
  padding: ${moderateScale(4)}px;
  margin-right: ${scale(6)}px;
`;

export const HeaderTitle = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(17)}px;
  color: ${props => props.theme.colors.on_surface};
  font-weight: 700;
  flex-shrink: 1;
`;

export const HeaderRight = styled.View`
  flex-direction: row;
  align-items: center;
`;


export const TabBar = styled.View`
  flex-direction: row;
  background-color: ${props => props.theme.colors.surface_variant};
  border-radius: ${moderateScale(12)}px;
  margin-horizontal: ${scale(16)}px;
  margin-bottom: ${verticalScale(12)}px;
  padding: ${moderateScale(3)}px;
`;

export const TabButton = styled.Pressable<{ active: boolean }>`
  flex: 1;
  padding-vertical: ${verticalScale(8)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${moderateScale(10)}px;
  background-color: ${props =>
    props.active ? props.theme.colors.surface : 'transparent'};
`;

export const TabText = styled.Text<{ active: boolean }>`
  font-family: ${props =>
    props.active ? 'PlusJakartaSans-Bold' : 'PlusJakartaSans-Medium'};
  font-size: ${responsiveFont(12)}px;
  color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.on_surface_variant};
`;

export const RoleSwitchContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-horizontal: ${scale(16)}px;
  margin-bottom: ${verticalScale(12)}px;
`;

export const RolePill = styled.Pressable<{ active: boolean }>`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(6)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.surface};
  margin-horizontal: ${scale(6)}px;
  border-width: ${moderateScale(1)}px;
  border-color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.outline_variant};
`;

export const RoleText = styled.Text<{ active: boolean }>`
  font-family: 'PlusJakartaSans-SemiBold';
  font-size: ${responsiveFont(12)}px;
  color: ${props =>
    props.active ? props.theme.colors.on_primary : props.theme.colors.on_surface};
  margin-left: ${scale(4)}px;
`;

export const InfoBanner = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.colors.primary_container};
  border-radius: ${moderateScale(10)}px;
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(8)}px;
  margin-horizontal: ${scale(16)}px;
  margin-bottom: ${verticalScale(12)}px;
`;

export const InfoText = styled.Text`
  flex: 1;
  font-family: 'PlusJakartaSans-Medium';
  font-size: ${responsiveFont(11)}px;
  color: ${props => props.theme.colors.on_primary_container};
  margin-left: ${scale(8)}px;
`;

export const ScrollArea = styled.ScrollView`
  flex: 1;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${scale(16)}px;
  margin-top: ${verticalScale(8)}px;
  margin-bottom: ${verticalScale(8)}px;
`;

export const SectionTitle = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(14)}px;
  color: ${props => props.theme.colors.on_surface};
`;

export const EmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: ${verticalScale(40)}px;
  padding-horizontal: ${scale(24)}px;
`;

export const EmptyText = styled.Text`
  font-family: 'PlusJakartaSans-Medium';
  font-size: ${responsiveFont(13)}px;
  color: ${props => props.theme.colors.on_surface_variant};
  text-align: center;
  margin-top: ${verticalScale(12)}px;
  line-height: ${responsiveFont(18)}px;
`;
