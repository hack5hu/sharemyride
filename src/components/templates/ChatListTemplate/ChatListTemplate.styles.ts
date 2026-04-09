import styled from 'styled-components/native';
import { View } from 'react-native';
import { verticalScale, moderateScale, scale } from '@/styles';

export const SafeAreaContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: verticalScale(120), // Height for BottomNav + FAB
  },
})`
  flex: 1;
  padding-horizontal: ${scale(20)}px;
`;

export const SearchWrapper = styled.View`
  margin-top: ${verticalScale(16)}px;
  margin-bottom: ${verticalScale(8)}px;
`;

export const FABContainer = styled.View`
  position: absolute;
  right: ${scale(24)}px;
  bottom: ${verticalScale(110)}px;
  z-index: 40;
`;
