import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const StyledKeyboardScrollView = styled(KeyboardAwareScrollView).attrs({
  showsVerticalScrollIndicator: false,
  keyboardShouldPersistTaps: 'handled',
  keyboardDismissMode: 'on-drag',
  scrollEventThrottle: 16,
  contentContainerStyle: { flexGrow: 1 },
})`
  flex: 1;
`;

export const ScrollContainer = styled.View`
  flex: 1;
`;

export const MainContent = styled.View`
  flex: 1;
  padding-horizontal: ${scale(20)}px;
  padding-top: ${verticalScale(16)}px;
  gap: ${moderateScale(18)}px;
  padding-bottom: ${verticalScale(24)}px;
`;

export const FooterContainer = styled.View<{ insetsBottom: number }>`
  padding-horizontal: ${scale(20)}px;
  padding-bottom: ${({ insetsBottom }) =>
    insetsBottom > 0 ? insetsBottom + verticalScale(8) : verticalScale(16)}px;
  padding-top: ${verticalScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.outline_variant}40;
`;
