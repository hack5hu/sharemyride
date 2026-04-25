import { Typography } from '@/components/atoms/Typography';
import { verticalScale, scale, moderateScale } from '@/styles';
import styled from 'styled-components/native';

export const ScreenWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
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

export const SettingInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(16)}px;
`;

export const IconBox = styled.View<{ color?: string }>`
  background-color: ${({ theme, color }) => (color || theme.colors.primary) + '20'};
  padding: ${moderateScale(12)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const SettingLabelGroup = styled.View``;

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

export const ThemeInfo = styled.View`
  margin-top: ${verticalScale(24)}px;
`;

export const ThemeToggleRow = styled.View`
  align-items: flex-end;
`;

export const ThemeSwitchLabel = styled.View`
  margin-top: ${verticalScale(24)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

export const AlignmentRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const Badge = styled.View`
  background-color: ${({ theme }) => theme.colors.secondary_container};
  padding-horizontal: ${scale(12)}px;
  padding-vertical: ${verticalScale(4)}px;
  border-radius: 20px;
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

export const FooterVersion = styled.View`
  align-items: center;
  marginTop: ${verticalScale(24)}px;
`;

export const BadgeText = styled(Typography).attrs({
  variant: 'label',
  size: 'xs',
  weight: 'bold',
})`
  text-transform: uppercase;
`;

export const DisabledEmailCard = styled(EmailCard)`
  opacity: 0.5;
`;

export const AccountSection = styled(Section)`
  padding-top: ${verticalScale(16)}px;
  padding-bottom: ${verticalScale(32)}px;
`;

export const VersionText = styled(Typography).attrs({
  variant: 'body',
  size: 'xs',
  weight: 'medium',
})`
  opacity: 0.5;
`;

