import styled from 'styled-components/native';
import { moderateScale, responsiveFont, scale, verticalScale } from '@/styles';

export const RowContainer = styled.Pressable<{ isCurrentUser?: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${props =>
    props.isCurrentUser
      ? props.theme.colors.primary_container
      : props.theme.colors.surface};
  border-radius: ${moderateScale(12)}px;
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(10)}px;
  margin-horizontal: ${scale(16)}px;
  margin-bottom: ${verticalScale(8)}px;
  border-width: ${props => (props.isCurrentUser ? moderateScale(1.5) : moderateScale(1))}px;
  border-color: ${props =>
    props.isCurrentUser
      ? props.theme.colors.primary
      : props.theme.colors.outline_variant};
`;

export const RankWrapper = styled.View`
  width: ${scale(32)}px;
  align-items: center;
  justify-content: center;
`;

export const RankText = styled.Text<{ isCurrentUser?: boolean }>`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(14)}px;
  color: ${props =>
    props.isCurrentUser
      ? props.theme.colors.primary
      : props.theme.colors.on_surface_variant};
  font-weight: 700;
`;

export const AvatarBox = styled.View`
  margin-horizontal: ${scale(8)}px;
`;

export const UserInfo = styled.View`
  flex: 1;
  justify-content: center;
`;

export const NameText = styled.Text<{ isCurrentUser?: boolean }>`
  font-family: 'PlusJakartaSans-SemiBold';
  font-size: ${responsiveFont(14)}px;
  color: ${props =>
    props.isCurrentUser
      ? props.theme.colors.on_primary_container
      : props.theme.colors.on_surface};
`;

export const SubtitleText = styled.Text`
  font-family: 'PlusJakartaSans-Regular';
  font-size: ${responsiveFont(11)}px;
  color: ${props => props.theme.colors.on_surface_variant};
  margin-top: ${verticalScale(2)}px;
`;

export const RidesPill = styled.View<{ isCurrentUser?: boolean }>`
  background-color: ${props =>
    props.isCurrentUser
      ? props.theme.colors.primary
      : props.theme.colors.surface_variant};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(12)}px;
  align-items: center;
`;

export const RidesPillText = styled.Text<{ isCurrentUser?: boolean }>`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(11)}px;
  color: ${props =>
    props.isCurrentUser
      ? props.theme.colors.on_primary
      : props.theme.colors.on_surface_variant};
  font-weight: 700;
`;
