import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(24)}px;
`;

export const TitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(28)}px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -0.5px;
  margin-bottom: ${verticalScale(8)}px;
  line-height: ${responsiveFont(34)}px;
`;

export const Subtext = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-bottom: ${verticalScale(24)}px;
  line-height: ${responsiveFont(20)}px;
`;

export const SearchInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  margin-bottom: ${verticalScale(32)}px;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-left: ${scale(12)}px;
`;

export const SectionHeader = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.outline};
  letter-spacing: 1px;
  margin-bottom: ${verticalScale(16)}px;
  text-transform: uppercase;
`;

export const GridContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: ${scale(12)}px;
  margin-bottom: ${verticalScale(32)}px;
`;

export const GridCard = styled.TouchableOpacity<{ isPopular?: boolean }>`
  flex: 1;
  background-color: ${({ theme, isPopular }) => isPopular ? theme.colors.surface_container_lowest : theme.colors.surface_container_low};
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.outline_variant}1A`};
  min-height: ${verticalScale(120)}px;
  justify-content: space-between;
`;

export const BadgeRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${verticalScale(8)}px;
`;

export const CardBadge = styled.View<{ isPopular?: boolean }>`
  background-color: ${({ theme, isPopular }) => isPopular ? `${theme.colors.primary_container}4D` : `${theme.colors.secondary_container}4D`};
  padding-horizontal: ${scale(8)}px;
  padding-vertical: ${verticalScale(2)}px;
  border-radius: 9999px;
`;

export const CardBadgeText = styled.Text<{ isPopular?: boolean }>`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme, isPopular }) => isPopular ? theme.colors.primary : theme.colors.secondary};
`;

export const CardTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  line-height: ${responsiveFont(22)}px;
  margin-bottom: ${verticalScale(4)}px;
`;

export const CardSubtext = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

/* History */
export const HistoryItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${moderateScale(16)}px;
  background-color: ${({ theme }) => `${theme.colors.surface_container_low}80`};
  border-radius: ${moderateScale(12)}px;
  margin-bottom: ${verticalScale(8)}px;
`;

export const HistoryLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
`;

export const HistoryText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;
