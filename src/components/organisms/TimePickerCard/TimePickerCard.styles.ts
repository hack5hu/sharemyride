import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const CardContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(32)}px ${scale(24)}px;
  margin-bottom: ${verticalScale(32)}px;
  align-items: center;
`;

export const SelectedTimeLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: ${verticalScale(8)}px;
`;

export const BigTimeRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const BigTimeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(60)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -2px;
`;

export const ColonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 900;
  font-size: ${responsiveFont(60)}px;
  color: ${({ theme }) => theme.colors.primary_container};
  margin-horizontal: ${scale(4)}px;
`;

export const FormatBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  background-color: ${({ theme }) => theme.colors.primary_fixed};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: 9999px;
  margin-bottom: ${verticalScale(32)}px;
`;

export const FormatBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_primary_fixed_variant};
`;

export const DialRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(12)}px;
  position: relative;
`;

export const DialSeparator = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 900;
  font-size: ${responsiveFont(36)}px;
  color: ${({ theme }) => `${theme.colors.outline_variant}4D`};
`;
