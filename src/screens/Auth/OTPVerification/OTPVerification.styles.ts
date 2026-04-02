import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, responsiveFont } from '../../../styles';
import { Platform, KeyboardAvoidingView } from 'react-native';

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const KeyboardContainer = styled(KeyboardAvoidingView).attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'height',
})`
  flex: 1;
  align-self: center;
  background-color: #ffffff;
  border-radius: ${scale(16)}px;
  margin: ${scale(20)}px;
  margin-top: ${verticalScale(30)}px;
  elevation: 2;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.surface_container_highest};
  position: relative;
  overflow: hidden;
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1, padding: scale(24) },
  keyboardShouldPersistTaps: 'handled',
})`
  flex: 1;
`;

export const BackgroundBlob = styled.View`
  position: absolute;
  top: ${verticalScale(-100)}px;
  right: ${scale(-100)}px;
  width: ${scale(256)}px;
  height: ${scale(256)}px;
  border-radius: ${scale(128)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  opacity: 0.05;
`;

export const IconContainer = styled.View`
  width: ${scale(56)}px;
  height: ${scale(56)}px;
  border-radius: ${({ theme }) => theme.roundness.sm}px;
  background-color: ${({ theme }) => theme.colors.primary_container};
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(24)}px;
`;

export const Title = styled.Text`
  font-family: 'PlusJakartaSans-ExtraBold';
  font-size: ${responsiveFont(32)}px;
  color: ${({ theme }) => theme.colors.on_background};
  margin-bottom: ${verticalScale(16)}px;
  line-height: ${responsiveFont(40)}px;
`;

export const Subtitle = styled.Text`
  font-family: 'PlusJakartaSans-Regular';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(20)}px;
`;

export const PhoneRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${verticalScale(12)}px;
  margin-bottom: ${verticalScale(40)}px;
`;

export const PhoneText = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_background};
  margin-right: ${scale(8)}px;
`;

export const EditButton = styled.TouchableOpacity`
  padding: ${scale(4)}px;
  border-radius: ${({ theme }) => theme.roundness.full}px;
`;

export const VerifyButton = styled.TouchableOpacity`
  width: 100%;
  height: ${verticalScale(56)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.roundness.sm}px;
  align-items: center;
  justify-content: center;
  margin-top: ${verticalScale(40)}px;
  box-shadow: 0px 4px 12px rgba(0, 135, 90, 0.2);
  elevation: 4;
`;

export const VerifyButtonText = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(18)}px;
  color: ${({ theme }) => theme.colors.on_primary};
`;

export const ResendContainer = styled.View`
  align-items: center;
  margin-top: ${verticalScale(24)}px;
`;

export const ResendHintText = styled.Text`
  font-family: 'PlusJakartaSans-Regular';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-bottom: ${verticalScale(8)}px;
`;

export const ResendActionRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ResendActionText = styled.Text<{ active: boolean }>`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.on_surface_variant};
  margin-left: ${scale(4)}px;
`;

export const FooterContainer = styled.View`
  margin-top: auto;
  padding-top: ${verticalScale(32)}px;
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.surface_container_highest};
  align-items: center;
`;

export const SupportRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${verticalScale(24)}px;
`;

export const AvatarImage = styled.Image`
  width: ${scale(40)}px;
  height: ${scale(40)}px;
  border-radius: ${scale(20)}px;
  margin-right: ${scale(16)}px;
  opacity: 0.8;
`;

export const SupportTextCol = styled.View``;

export const SupportLabel = styled.Text`
  font-family: 'PlusJakartaSans-Bold';
  font-size: ${responsiveFont(10)}px;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const SupportSub = styled.Text`
  font-family: 'PlusJakartaSans-Medium';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  margin-top: ${verticalScale(2)}px;
`;

export const LinksRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${verticalScale(30)}px;
  width: 100%;
`;

export const LinkText = styled.Text`
  font-family: 'PlusJakartaSans-Medium';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;

export const DotSeparator = styled.View`
  width: ${scale(4)}px;
  height: ${scale(4)}px;
  border-radius: ${scale(2)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_highest};
  margin: 0 ${scale(16)}px;
`;
