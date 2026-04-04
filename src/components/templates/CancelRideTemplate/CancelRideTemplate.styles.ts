import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont, responsiveSize } from '@/styles';
import { KeyboardAvoidingView, Platform, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const OverlayContext = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const Backdrop = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => `${theme.colors.on_surface}66`}; /* 40% opacity blur effect approx */
`;

export const BottomSheetContainer = styled(KeyboardAvoidingView).attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : 'padding',
})`
  width: 100%;
  max-height: ${height * 0.9}px;
`;

export const BottomSheetSurface = styled.View`
  flex-shrink: 1;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-top-left-radius: ${moderateScale(32)}px;
  border-top-right-radius: ${moderateScale(32)}px;
  padding: ${moderateScale(16)}px ${moderateScale(32)}px;
  shadow-color: ${({ theme }) => theme.colors.on_surface};
  shadow-offset: 0px -12px;
  shadow-opacity: 0.12;
  shadow-radius: 48px;
  elevation: 20;
`;

export const DragHandle = styled.View`
  width: ${scale(48)}px;
  height: ${verticalScale(6)}px;
  background-color: ${({ theme }) => `${theme.colors.outline_variant}4D`}; /* 30% opacity */
  border-radius: 9999px;
  align-self: center;
  margin-bottom: ${verticalScale(32)}px;
`;

export const HeaderContent = styled.View`
  margin-bottom: ${verticalScale(32)}px;
`;

export const Title = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 800;
  font-size: ${responsiveFont(24)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-bottom: ${verticalScale(8)}px;
`;

export const Subtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  line-height: ${responsiveFont(22)}px;
`;

export const ChoicesScroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: verticalScale(32),
  }
})`
  flex-shrink: 1;
  margin-bottom: ${verticalScale(16)}px;
`;

export const OtherInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.outline_variant,
}))`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(16)}px;
  padding: ${moderateScale(16)}px;
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(15)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-bottom: ${verticalScale(12)}px;
`;

export const ActionsContainer = styled.View`
  gap: ${verticalScale(8)}px;
`;

export const GhostButton = styled.TouchableOpacity`
  width: 100%;
  paddingVertical: ${verticalScale(12)}px;
  border-radius: ${moderateScale(16)}px;
  align-items: center;
  justify-content: center;
`;

export const GhostButtonText = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 700;
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.primary};
`;
