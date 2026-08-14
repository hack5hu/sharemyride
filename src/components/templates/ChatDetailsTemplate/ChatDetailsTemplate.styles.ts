import styled from 'styled-components/native';
import { verticalScale, scale, moderateScale } from '@/styles';
import Animated from 'react-native-reanimated';

export const SafeAreaContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ScreenContainer = styled.View`
  flex: 1;
`;

export const ScrollLayout = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(16),
    paddingBottom: moderateScale(16),
  },
}))`
  flex: 1;
`;

export const AnimatedWrapper = styled(Animated.View)`
  flex: 1;
`;

export const ListContainer = styled.View`
  flex: 1;
`;

export const HeaderSpacer = styled.View`
  margin-bottom: ${moderateScale(16)}px;
`;

export const InputWrapper = styled.View``;
