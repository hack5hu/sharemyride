import styled from 'styled-components/native';
import { moderateScale, responsiveFont, scale, verticalScale } from '@/styles';

export const PodiumContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  padding-horizontal: ${scale(12)}px;
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(8)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const PodiumColumn = styled.Pressable<{ isFirst?: boolean }>`
  flex: 1;
  align-items: center;
  margin-horizontal: ${scale(4)}px;
  transform: ${props =>
    props.isFirst
      ? 'translateY(0px)'
      : `translateY(${verticalScale(12)}px)`};
`;

export const CrownIconContainer = styled.View`
  margin-bottom: ${verticalScale(-6)}px;
  z-index: 2;
`;

export const AvatarWrapper = styled.View<{ borderColor: string; isFirst?: boolean }>`
  position: relative;
  align-items: center;
  justify-content: center;
  padding: ${moderateScale(3)}px;
  border-radius: ${moderateScale(999)}px;
  border-width: ${props =>
    props.isFirst ? moderateScale(3) : moderateScale(2)}px;
  border-color: ${props => props.borderColor};
  background-color: ${props => props.theme.colors.surface};
`;

export const RankBadge = styled.View<{ bgColor: string }>`
  position: absolute;
  bottom: ${verticalScale(-8)}px;
  width: ${moderateScale(22)}px;
  height: ${moderateScale(22)}px;
  border-radius: ${moderateScale(11)}px;
  background-color: ${props => props.bgColor};
  align-items: center;
  justify-content: center;
  border-width: ${moderateScale(1.5)}px;
  border-color: ${props => props.theme.colors.surface};
  z-index: 3;
`;

export const RankText = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(11)}px;
  color: ${props => props.theme.colors.on_primary};
  font-weight: 700;
`;

export const UserName = styled.Text`
  font-family: 'PlusJakartaSans-SemiBold';
  font-size: ${responsiveFont(12)}px;
  color: ${props => props.theme.colors.on_surface};
  margin-top: ${verticalScale(12)}px;
  text-align: center;
`;

export const RidesBadge = styled.View`
  background-color: ${props => props.theme.colors.surface_variant};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(8)}px;
  margin-top: ${verticalScale(4)}px;
`;

export const RidesText = styled.Text`
  font-family: 'PlusJakartaSans-Medium';
  font-size: ${responsiveFont(10)}px;
  color: ${props => props.theme.colors.on_surface_variant};
`;

export const PrizeCard = styled.View<{ bgColor: string }>`
  background-color: ${props => props.bgColor};
  border-radius: ${moderateScale(6)}px;
  padding-horizontal: ${scale(6)}px;
  padding-vertical: ${verticalScale(3)}px;
  margin-top: ${verticalScale(6)}px;
  align-items: center;
  max-width: ${scale(100)}px;
`;

export const PrizeText = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(9)}px;
  color: ${props => props.theme.colors.on_primary};
  text-align: center;
`;

export const Pedestal = styled.View<{ height: number; bgColor: string }>`
  width: 100%;
  height: ${props => verticalScale(props.height)}px;
  background-color: ${props => props.bgColor};
  border-top-left-radius: ${moderateScale(12)}px;
  border-top-right-radius: ${moderateScale(12)}px;
  margin-top: ${verticalScale(10)}px;
  align-items: center;
  justify-content: center;
  opacity: 0.92;
`;

export const PedestalRank = styled.Text`
  font-family: 'PlusJakartaSans-ExtraBold';
  font-size: ${responsiveFont(26)}px;
  color: ${props => props.theme.colors.on_primary};
  opacity: 0.45;
  font-weight: 800;
`;
