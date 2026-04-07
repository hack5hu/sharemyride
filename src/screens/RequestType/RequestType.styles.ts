import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { moderateScale, scale, verticalScale, responsiveFont } from '@/styles';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${scale(24)}px;
  padding-vertical: ${verticalScale(14)}px;
`;

export const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
`;

export const BackButton = styled.TouchableOpacity`
  padding: ${moderateScale(4)}px;
`;

export const HeaderTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const SaveButton = styled.TouchableOpacity`
  padding: ${moderateScale(4)}px;
`;

export const SaveText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: scale(24),
    paddingBottom: verticalScale(140),
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  margin-top: ${verticalScale(16)}px;
`;

export const TitleSection = styled.View`
  margin-bottom: ${verticalScale(32)}px;
`;

export const PageTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(28)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  letter-spacing: -0.5px;
  margin-bottom: ${verticalScale(8)}px;
`;

export const PageSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(22)}px;
`;

export const OptionsContainer = styled.View`
  gap: ${verticalScale(20)}px;
`;

export const OptionCard = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: ${({ theme, selected }) =>
    selected ? `${theme.colors.primary_container}30` : `${theme.colors.surface_container_lowest}99`};
  border-width: 1.5px;
  border-color: ${({ theme, selected }) =>
    selected ? theme.colors.primary : 'transparent'};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(20)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const OptionContent = styled.View`
  flex-direction: row;
  gap: ${scale(16)}px;
  flex: 1;
  padding-right: ${scale(12)}px;
`;

export const IconContainer = styled.View<{ type: 'instant' | 'review' }>`
  width: ${moderateScale(48)}px;
  height: ${moderateScale(48)}px;
  border-radius: ${moderateScale(16)}px;
  background-color: ${({ theme, type }) =>
    type === 'instant' ? `${theme.colors.primary}1A` : `${theme.colors.secondary}1A`};
  align-items: center;
  justify-content: center;
`;

export const OptionTextWrapper = styled.View`
  flex: 1;
`;

export const OptionTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-bottom: ${verticalScale(4)}px;
`;

export const OptionDescription = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(20)}px;
`;

export const RadioOuter = styled.View<{ selected: boolean }>`
  width: ${moderateScale(24)}px;
  height: ${moderateScale(24)}px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${({ theme, selected }) => (selected ? theme.colors.primary : theme.colors.outline_variant)};
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, selected }) => (selected ? theme.colors.primary : 'transparent')};
`;

export const RadioInner = styled.View<{ selected: boolean }>`
  width: ${moderateScale(10)}px;
  height: ${moderateScale(10)}px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.on_primary};
  opacity: ${({ selected }) => (selected ? 1 : 0)};
`;

export const ProTipCard = styled.View`
  margin-top: ${verticalScale(32)}px;
  background-color: ${({ theme }) => `${theme.colors.surface_container_low}80`};
  border-radius: ${moderateScale(24)}px;
  padding: ${moderateScale(20)}px;
  border-width: 1px;
  border-color: ${({ theme }) => `${theme.colors.on_surface}10`};
`;

export const ProTipHeader = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
  margin-bottom: ${verticalScale(12)}px;
`;

export const ProTipTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(11)}px;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

export const ProTipText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(13)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  font-style: italic;
  line-height: ${responsiveFont(22)}px;
`;

export const FloatingFooter = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding-horizontal: ${scale(24)}px;
  padding-bottom: ${verticalScale(32)}px;
`;

export const FooterGradient = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: -${verticalScale(48)}px;
`;

export const ContinueButton = styled.TouchableOpacity`
  width: 100%;
`;

export const ContinueGradient = styled(LinearGradient)`
  width: 100%;
  height: ${moderateScale(56)}px;
  border-radius: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-offset: 0px 8px;
  shadow-opacity: 0.2;
  shadow-radius: 20px;
  elevation: 6;
`;

export const ContinueText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_primary};
  letter-spacing: 0.3px;
`;
