import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const TopHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface};
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

export const StepBadge = styled.View`
  background-color: ${({ theme }) => `${theme.colors.primary_fixed}4D`};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: 9999px;
`;

export const StepBadgeText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ProgressSection = styled.View`
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(24)}px;
`;

export const ProgressTitleRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: ${verticalScale(8)}px;
`;

export const TitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(24)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -0.5px;
`;

export const SubtitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const ProgressBarContainer = styled.View`
  height: ${moderateScale(6)}px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface_container};
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressBar = styled.View`
  height: 100%;
  width: 44%;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 9999px;
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(160),
  },
})`
  flex: 1;
`;

/* Floating footer */
export const FloatingFooter = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(24)}px;
  padding-top: ${verticalScale(16)}px;
`;

export const FooterGradient = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: -${verticalScale(32)}px;
`;

export const NextButton = styled.TouchableOpacity<{ disabled: boolean }>`
  width: 100%;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

export const NextGradient = styled(LinearGradient)`
  width: 100%;
  padding-vertical: ${verticalScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.25;
  shadow-radius: 20px;
  elevation: 6;
`;

export const NextButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;
