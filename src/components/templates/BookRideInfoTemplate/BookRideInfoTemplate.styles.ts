import styled from 'styled-components/native';
import { scale, verticalScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: verticalScale(100),
  },
})`
  flex: 1;
`;

export const Header = styled.View<{ $paddingTop?: number }>`
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(16)}px;
  padding-top: ${({ $paddingTop }) => ($paddingTop !== undefined ? $paddingTop : verticalScale(16))}px;
  background-color: ${({ theme }) => `${theme.colors.surface}CC`};
`;

export const HeaderTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(20)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -1px;
`;

export const HeaderTitleHighlight = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
`;

/* Hero Section */
export const HeroSection = styled.View`
  padding-horizontal: ${scale(20)}px;
  margin-bottom: ${verticalScale(16)}px;
`;

export const HeroTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(28)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -0.5px;
  margin-bottom: ${verticalScale(4)}px;
`;

export const HeroSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

/* Recent Searches */
export const SectionContainer = styled.View`
  padding-horizontal: ${scale(16)}px;
  margin-top: ${verticalScale(24)}px;
  padding-bottom: ${verticalScale(8)}px;
`;

export const SectionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${verticalScale(20)}px;
`;

export const SectionTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(20)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -0.5px;
`;

export const ClearButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const RecentSearchesHeader = styled(SectionHeader)`
  margin-bottom: ${verticalScale(12)}px;
`;
