import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const StopCard = styled.View<{ $isNested?: boolean }>`
  background-color: ${({ theme, $isNested }) =>
    $isNested
      ? theme.colors.surface_container || '#f8fafc'
      : theme.colors.surface_container_lowest || theme.colors.surface};
  padding: ${moderateScale(10)}px ${moderateScale(12)}px;
  border-radius: ${moderateScale(14)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 2px;
  shadow-opacity: ${({ $isNested }) => ($isNested ? 0 : 0.06)};
  shadow-radius: 8px;
  elevation: ${({ $isNested }) => ($isNested ? 0 : 2)};
  gap: ${verticalScale(8)}px;
  border-width: 1px;
  border-color: ${({ theme, $isNested }) =>
    $isNested
      ? `${theme.colors.outline_variant || '#e2e2e2'}20`
      : `${theme.colors.outline_variant || '#e2e2e2'}30`};
`;

export const CardTopRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(10)}px;
`;

export const AvatarWrapper = styled.View`
  position: relative;
`;

export const PassengerInfo = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const NameRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const PassengerNameText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const SeatTag = styled.View`
  background-color: ${({ theme }) => `${theme.colors.primary}12`};
  padding-horizontal: ${scale(6)}px;
  padding-vertical: ${verticalScale(1.5)}px;
  border-radius: ${moderateScale(4)}px;
`;

export const SeatTagText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(9)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const MetricsInlineRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(10)}px;
  margin-top: ${verticalScale(1)}px;
`;

export const MetricItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(3)}px;
`;

export const MetricItemText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const MetricHighlight = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ActionButtonsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
`;

export const ChatIconButton = styled.TouchableOpacity`
  width: ${moderateScale(34)}px;
  height: ${moderateScale(34)}px;
  border-radius: ${moderateScale(10)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
  align-items: center;
  justify-content: center;
`;

export const CallIconButton = styled.TouchableOpacity`
  width: ${moderateScale(34)}px;
  height: ${moderateScale(34)}px;
  border-radius: ${moderateScale(10)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 2px;
  shadow-opacity: 0.25;
  shadow-radius: 4px;
  elevation: 2;
`;
