import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { scale, verticalScale, moderateScale } from '@/styles';

export const Wrapper = styled.View`
  flex: 1;
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
  padding-horizontal: ${scale(24)}px;
  padding-top: ${verticalScale(24)}px;
  gap: ${moderateScale(24)}px;
  padding-bottom: ${verticalScale(20)}px;
`;

export const FooterContainer = styled.View<{ insetsBottom: number }>`
  padding-horizontal: ${scale(30)}px;
  padding-bottom: ${({ insetsBottom }) =>
    insetsBottom > 0 ? insetsBottom + verticalScale(12) : verticalScale(24)}px;
  padding-top: ${verticalScale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface};
`;
