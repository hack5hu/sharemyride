import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale } from '@/styles';

export const HeaderCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(26)}px;
  padding: ${moderateScale(20)}px;
  flex-direction: column;
  align-items: center;
  gap: ${moderateScale(16)}px;
  elevation: 2;
  position: relative;
`;

export const SettingsButtonWrapper = styled.View`
  position: absolute;
  top: ${moderateScale(14)}px;
  right: ${scale(14)}px;
  z-index: 10;
`;

export const IdentitySection = styled.View`
  flex-direction: column;
  align-items: center;
  gap: ${moderateScale(12)}px;
`;

export const AvatarWrapper = styled.TouchableOpacity<{ isUpdating?: boolean }>`
  position: relative;
  opacity: ${({ isUpdating }) => (isUpdating ? 0.7 : 1)};
`;

export const AvatarOverlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 100px;
`;

export const CameraBadge = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  width: ${scale(32)}px;
  height: ${scale(32)}px;
  border-radius: ${scale(16)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  elevation: 3;
`;

export const InfoSection = styled.View`
  align-items: center;
  gap: ${moderateScale(6)}px;
`;

export const NameRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const VerifiedBadgePill = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  padding: ${verticalScale(4)}px ${scale(12)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
`;

export const VerifiedIcon = styled(Icon)`
  opacity: 0.9;
`;

export const StatsBentoCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: ${moderateScale(14)}px ${moderateScale(12)}px;
  border-radius: ${moderateScale(18)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
`;

export const StatDivider = styled.View`
  width: 1px;
  height: ${moderateScale(28)}px;
  background-color: ${({ theme }) => theme.colors.outline_variant}33;
`;

