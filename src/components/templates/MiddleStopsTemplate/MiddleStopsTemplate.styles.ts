import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const TopHeader = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container};
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
`;

export const BackButton = styled.TouchableOpacity`
  padding: ${moderateScale(8)}px;
  border-radius: 9999px;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: -0.5px;
`;

export const StepIndicatorText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const StepIndicatorSecondary = styled.Text`
  color: ${({ theme }) => `${theme.colors.on_surface_variant}99`};
  font-weight: 500;
`;

/* Content Area */
export const ContentLayer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(32),
    paddingBottom: verticalScale(140), // Leave room for footer
  }
})`
  flex: 1;
`;

export const TitleSection = styled.View`
  margin-bottom: ${verticalScale(32)}px;
`;

export const TitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(28)}px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -1.2px;
  line-height: ${responsiveFont(34)}px;
  margin-bottom: ${verticalScale(4)}px;
`;

export const SubtitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(20)}px;
`;

/* Footer */
export const FooterContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(32)}px;
  padding-top: ${verticalScale(24)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.outline_variant}33;
  z-index: 50;
`;

export const ContinueGradient = styled(LinearGradient)`
  width: 100%;
  padding-vertical: ${verticalScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.3;
  shadow-radius: 24px;
  elevation: 6;
`;

export const ContinueButton = styled.TouchableOpacity`
  width: 100%;
`;

export const ContinueButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;
