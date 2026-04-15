import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const SafeContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const MainContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(32),
    paddingBottom: verticalScale(120),
  },
  keyboardShouldPersistTaps: 'handled',
})`
  flex: 1;
`;

export const HeaderSection = styled.View`
  margin-bottom: ${verticalScale(40)};
`;

export const TitleContainer = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(36)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  line-height: ${verticalScale(44)}px;
`;

export const TitleHighlight = styled.Text`
  font-style: italic;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Subtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(12)}px;
  opacity: 0.8;
  line-height: ${verticalScale(22)}px;
`;

export const ContinueButtonSection = styled.View`
  margin-top: ${verticalScale(32)}px;
`;

export const ContinueGradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors: ['#45617f', '#bfddff'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
}))`
  width: 100%;
  height: ${verticalScale(64)}px;
  border-radius: ${moderateScale(12)}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.2;
  shadow-radius: 20px;
  elevation: 8;
`;

export const ContinueButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: ${scale(12)}px;
`;

export const ContinueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const ContextualInfoBox = styled.View`
  margin-top: ${verticalScale(48)}px;
  padding: ${moderateScale(24)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => `${theme.colors.primary_container}1A`};
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.primary_container}33`};
  flex-direction: row;
  align-items: flex-start;
  gap: ${scale(16)}px;
`;

export const ContextualInfoText = styled.Text`
  flex: 1;
  font-family: 'Plus Jakarta Sans';
  font-weight: 500;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.primary};
  line-height: ${verticalScale(20)}px;
`;
