import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  background-color: ${({ theme }) =>
    theme.colors.surface_container_lowest || theme.colors.surface};
  padding: ${moderateScale(12)}px ${moderateScale(14)}px;
  border-radius: ${moderateScale(20)}px;
  shadow-color: ${({ theme }) => theme.colors.shadow};
  shadow-offset: 0px 3px;
  shadow-opacity: 0.06;
  shadow-radius: 10px;
  elevation: 2;
  gap: ${verticalScale(10)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.outline_variant || '#e2e2e2'}30`};
  margin-bottom: ${verticalScale(12)}px;
`;

export const HeaderTopRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StopBadge = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}15`};
  padding-horizontal: ${scale(7)}px;
  padding-vertical: ${verticalScale(2.5)}px;
  border-radius: ${moderateScale(6)}px;
`;

export const StopBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(9.5)}px;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

export const SummaryBadge = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container || '#f0f4f9'};
  padding-horizontal: ${scale(7)}px;
  padding-vertical: ${verticalScale(2.5)}px;
  border-radius: ${moderateScale(6)}px;
`;

export const SummaryBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(9.5)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const AddressRow = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${scale(8)}px;
`;

export const PinIconBox = styled.View`
  width: ${moderateScale(28)}px;
  height: ${moderateScale(28)}px;
  border-radius: ${moderateScale(8)}px;
  background-color: ${({ theme }) => `${theme.colors.primary}14`};
  align-items: center;
  justify-content: center;
`;

export const StopNameText = styled.Text`
  flex: 1;
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(13)}px;
  line-height: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const ActionsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(6)}px;
  padding-left: ${scale(36)}px;
`;

export const ActionPill = styled.TouchableOpacity<{ $copied?: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${scale(4)}px;
  background-color: ${({ theme, $copied }) =>
    $copied ? '#22c55e18' : `${theme.colors.primary}12`};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: ${moderateScale(8)}px;
`;

export const ActionPillText = styled.Text<{ $copied?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme, $copied }) => ($copied ? '#15803d' : theme.colors.primary)};
`;

export const SectionDivider = styled.View`
  height: 1px;
  background-color: ${({ theme }) => `${theme.colors.outline_variant || '#e2e2e2'}30`};
  margin-vertical: ${verticalScale(1)}px;
`;

export const SectionHeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(5)}px;
`;

export const SectionHeaderText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  letter-spacing: 0.8px;
  text-transform: uppercase;
  opacity: 0.8;
`;

export const PassengersList = styled.View`
  gap: ${verticalScale(6)}px;
`;
