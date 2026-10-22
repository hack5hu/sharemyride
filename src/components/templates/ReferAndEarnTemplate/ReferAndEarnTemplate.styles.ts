import styled from 'styled-components/native';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: scale(18),
    paddingBottom: verticalScale(40),
  },
})`
  flex: 1;
`;

export const BalanceCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${moderateScale(16)}px;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(14)}px;
  margin-top: ${verticalScale(12)}px;
  margin-bottom: ${verticalScale(16)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant};
`;

export const BalanceLeft = styled.View`
  flex-direction: column;
`;

export const BalanceLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-bottom: ${verticalScale(2)}px;
`;

export const BalanceValueRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HelpLink = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding-vertical: ${verticalScale(6)}px;
  padding-horizontal: ${scale(10)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme }) =>
    theme.name === 'dark' ? 'rgba(255, 255, 255, 0.08)' : '#F1F5F9'};
`;

export const HelpLinkText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.primary};
  margin-left: ${scale(4)}px;
`;

export const HeroCard = styled.View`
  background-color: ${({ theme }) =>
    theme.name === 'dark' ? 'rgba(0, 88, 188, 0.18)' : '#EFF6FF'};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(20)}px;
  align-items: center;
  border-width: 1px;
  border-color: ${({ theme }) =>
    theme.name === 'dark' ? 'rgba(0, 88, 188, 0.35)' : '#BFDBFE'};
  margin-bottom: ${verticalScale(18)}px;
`;

export const HeroIconCircle = styled.View`
  width: ${moderateScale(64)}px;
  height: ${moderateScale(64)}px;
  border-radius: ${moderateScale(32)}px;
  background-color: #F59E0B;
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(12)}px;
`;

export const HeroTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  text-align: center;
  margin-bottom: ${verticalScale(6)}px;
  letter-spacing: -0.3px;
`;

export const HeroSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-align: center;
  line-height: ${responsiveFont(18)}px;
`;

export const FaqTeaserCard = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${moderateScale(14)}px;
  padding-horizontal: ${scale(16)}px;
  padding-vertical: ${verticalScale(14)}px;
  margin-top: ${verticalScale(14)}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant};
`;

export const FaqTeaserText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;
