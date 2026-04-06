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
  padding-vertical: ${verticalScale(8)}px;
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
`;

export const StepSection = styled.View`
  align-items: flex-end;
  gap: ${verticalScale(4)}px;
`;

export const StepLabel = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.outline};
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const StepDots = styled.View`
  flex-direction: row;
  gap: ${scale(4)}px;
  align-items: center;
`;

export const StepDot = styled.View<{ variant: 'active' | 'done' | 'inactive' }>`
  height: ${moderateScale(4)}px;
  width: ${({ variant }) => variant === 'active' ? moderateScale(32) : moderateScale(16)}px;
  border-radius: 9999px;
  background-color: ${({ theme, variant }) => {
    if (variant === 'active') return theme.colors.primary;
    if (variant === 'done') return theme.colors.primary_container;
    return `${theme.colors.outline_variant}4D`;
  }};
`;

export const ScrollContent = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(32),
    paddingBottom: verticalScale(90),
  },
})`flex: 1;`;

export const TitleSection = styled.View`
  margin-bottom: ${verticalScale(24)}px;
`;

export const TitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(32)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -1px;
  line-height: ${responsiveFont(40)}px;
`;

export const TitleHighlight = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
`;

export const SubtitleText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(8)}px;
  line-height: ${responsiveFont(20)}px;
`;

/* Floating footer */
export const FloatingFooter = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(32)}px;
  padding-top: ${verticalScale(24)}px;
`;

export const FooterGradient = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: -${verticalScale(40)}px;
`;

export const ContinueButton = styled.TouchableOpacity`
  width: 100%;
`;

export const ContinueGradient = styled(LinearGradient)`
  width: 100%;
  padding-vertical: ${verticalScale(16)}px;
  border-radius: ${moderateScale(12)}px;
  align-items: center;
  justify-content: center;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 12px;
  shadow-opacity: 0.3;
  shadow-radius: 24px;
  elevation: 8;
  margin-bottom: ${verticalScale(12)}px;
`;

export const ContinueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const ArrivalNote = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-align: center;
  padding-horizontal: ${scale(16)}px;
  line-height: ${responsiveFont(18)}px;
`;
