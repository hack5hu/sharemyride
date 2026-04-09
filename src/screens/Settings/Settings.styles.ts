import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { verticalScale, scale } from '@/styles/responsive';

export const ScreenWrapper = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${verticalScale(16)}px ${scale(16)}px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.outline_variant}30;
`;

export const ContentContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: scale(16),
    paddingBottom: verticalScale(100),
  },
})`
  flex: 1;
`;

export const Section = styled.View`
  margin-bottom: ${verticalScale(24)}px;
`;

export const SectionTitle = styled.Text`
  font-family: 'Plus Jakarta Sans';
  font-size: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.on_surface_variant};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-bottom: ${verticalScale(12)}px;
  margin-left: ${scale(4)}px;
`;

export const SettingCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container};
  border-radius: 16px;
  padding: ${verticalScale(16)}px ${scale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant}30;
`;

export const EmailCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_lowest};
  border-radius: 16px;
  padding: ${verticalScale(16)}px ${scale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.outline_variant}30;
  margin-bottom: ${verticalScale(8)}px;
`;

export const ThemeGrid = styled.View`
  flex-direction: row;
  gap: ${scale(12)}px;
`;

export const ThemeCard = styled.View<{ isCurrent?: boolean }>`
  flex: 1;
  aspect-ratio: 1;
  background-color: ${({ theme, isCurrent }) => 
    isCurrent ? theme.colors.surface_container_highest + '80' : theme.colors.surface_container};
  border-radius: 24px;
  padding: ${scale(20)}px;
  border-width: 1px;
  border-color: ${({ theme, isCurrent }) => 
    isCurrent ? theme.colors.primary_container + '40' : 'transparent'};
  justify-content: space-between;
`;

export const OptionsList = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container};
  border-radius: 16px;
  overflow: hidden;
`;

export const OptionRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${verticalScale(16)}px ${scale(16)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.outline_variant}20;
`;

export const LogoutButton = styled.TouchableOpacity`
  width: 100%;
  padding: ${verticalScale(16)}px;
  background-color: ${({ theme }) => theme.colors.error_container}30;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.error}20;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(12)}px;
  margin-top: ${verticalScale(16)}px;
`;
