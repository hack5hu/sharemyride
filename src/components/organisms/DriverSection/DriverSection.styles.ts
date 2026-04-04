import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles/scale';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  padding: ${moderateScale(24)}px;
  border-radius: ${moderateScale(24)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const InfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const AvatarWrapper = styled.View`
  position: relative;
`;

export const AvatarImage = styled.Image`
  width: ${moderateScale(64)}px;
  height: ${moderateScale(64)}px;
  border-radius: ${moderateScale(32)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_highest};
`;

export const VerifiedBadge = styled.View`
  position: absolute;
  bottom: -${moderateScale(4)}px;
  right: -${moderateScale(4)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-width: 2px;
  border-color: white;
  border-radius: ${moderateScale(12)}px;
  padding: ${moderateScale(2)}px;
`;

export const TextContent = styled.View`
  margin-left: ${scale(16)}px;
  flex: 1;
`;

export const Name = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const MetaRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${verticalScale(2)}px;
`;

export const RatingBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary_container};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: ${moderateScale(12)}px;
  flex-direction: row;
  align-items: center;
  margin-right: ${scale(8)}px;
`;

export const RatingText = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_secondary_container};
  margin-left: ${scale(2)}px;
`;

export const CarInfo = styled.Text`
  font-family: 'PlusJakartaSans-Medium';
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.outline};
  flex: 1;
`;

export const ChatButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding-horizontal: ${scale(20)}px;
  padding-vertical: ${verticalScale(12)}px;
  border-radius: ${moderateScale(24)}px;
  flex-direction: row;
  align-items: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

export const ChatText = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_primary};
  margin-left: ${scale(4)}px;
`;
