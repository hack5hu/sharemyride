import styled from 'styled-components/native';
import { scale, verticalScale, moderateScale, responsiveFont } from '@/styles';
import { SafeAreaView } from 'react-native-safe-area-context';

export const OverlayContainer = styled.View`
  padding: 0 ${verticalScale(16)}px ${verticalScale(5)}px;
  z-index: 30;
`;

export const TopBarMockup = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => `${theme.colors.surface}CC`}; /* 80% opacity */
  border-radius: 9999px;
  padding: ${moderateScale(8)}px;
  shadow-color: ${({ theme }) => theme.colors.on_surface};
  shadow-offset: 0px 4px;
  shadow-opacity: 0.04;
  shadow-radius: 24px;
  elevation: 3;
  margin-bottom: ${verticalScale(16)}px;
  /* backdrop-blur doesn't translate perfectly cleanly in native without extra libs, basic opacity works visually */
`;

export const BackButton = styled.TouchableOpacity`
  width: ${moderateScale(40)}px;
  height: ${moderateScale(40)}px;
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
`;

export const Spacer = styled.View`
  width: ${moderateScale(40)}px;
`;

export const SearchInputContainer = styled.View<{ $isFocused?: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(12)}px;
  padding-horizontal: ${scale(16)}px;
  height: ${verticalScale(56)}px;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 8px;
  shadow-opacity: 0.04;
  shadow-radius: 30px;
  elevation: 4;
  border-width: 1px;
  border-color: ${({ theme, $isFocused }) => 
    $isFocused ? `${theme.colors.primary}33` : `${theme.colors.outline_variant}26`};
`;

export const SearchInput = styled.TextInput.attrs(({ theme }) => ({
  placeholderTextColor: theme.colors.outline,
}))`
  flex: 1;
  height: 100%;
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(16)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  padding-horizontal: ${scale(12)}px;
`;

export const LocationButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const SearchResultsBox = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: ${moderateScale(12)}px;
  margin-top: ${verticalScale(8)}px;
  shadow-color: rgb(0,0,0);
  shadow-offset: 0px 8px;
  shadow-opacity: 0.1;
  shadow-radius: 20px;
  elevation: 5;
  overflow: hidden;
`;

export const ResultItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${moderateScale(16)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.surface_container_high};
  gap: ${scale(12)}px;
`;

export const ResultIconBox = styled.View`
  width: ${moderateScale(32)}px;
  height: ${moderateScale(32)}px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  align-items: center;
  justify-content: center;
`;

export const ResultTextContainer = styled.View`
  flex: 1;
`;

export const ResultTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-weight: 600;
  font-size: ${responsiveFont(14)}px;
  color: ${({ theme }) => theme.colors.on_surface};
  margin-bottom: ${verticalScale(2)}px;
`;

export const ResultSubtitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: ${responsiveFont(12)}px;
  color: ${({ theme }) => theme.colors.on_surface_variant};
`;
