import styled from 'styled-components/native';
import { moderateScale, responsiveFont, scale, verticalScale } from '@/styles';

export const StickyContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.theme.colors.surface};
  border-top-width: ${moderateScale(1)}px;
  border-top-color: ${props => props.theme.colors.outline_variant};
  padding-horizontal: ${scale(16)}px;
  padding-top: ${verticalScale(10)}px;
  elevation: 8;
  shadow-color: #000000;
  shadow-offset: 0px -2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const InnerRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RankBadge = styled.View`
  background-color: ${props => props.theme.colors.primary};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(8)}px;
  margin-right: ${scale(10)}px;
`;

export const RankText = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(12)}px;
  color: ${props => props.theme.colors.on_primary};
  font-weight: 700;
`;

export const InfoCol = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-family: 'PlusJakartaSans-SemiBold';
  font-size: ${responsiveFont(13)}px;
  color: ${props => props.theme.colors.on_surface};
`;

export const Subtitle = styled.Text`
  font-family: 'PlusJakartaSans-Regular';
  font-size: ${responsiveFont(11)}px;
  color: ${props => props.theme.colors.on_surface_variant};
  margin-top: ${verticalScale(2)}px;
`;

export const RidesCountPill = styled.View`
  background-color: ${props => props.theme.colors.primary_container};
  padding-horizontal: ${scale(10)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const RidesCountText = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(11)}px;
  color: ${props => props.theme.colors.on_primary_container};
  font-weight: 700;
`;
