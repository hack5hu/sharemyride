import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { verticalScale, scale, moderateScale } from '@/styles';

export const SafeAreaContainer = styled(SafeAreaView)`
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
