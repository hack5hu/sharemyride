import styled from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { verticalScale, scale, moderateScale } from '@/styles';

export const ScreenWrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export const ContentContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: scale(16),
    paddingBottom: verticalScale(100),
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const Section = styled.View`
  margin-bottom: ${verticalScale(20)}px;
`;

export const SectionTitle = styled(Typography).attrs({
  variant: 'label',
  size: 'sm',
  weight: 'bold',
  color: 'on_surface_variant',
})`
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: ${verticalScale(10)}px;
  margin-left: ${scale(4)}px;
`;

export const SettingCard = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(16)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  elevation: 1;
`;

export const SettingInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(12)}px;
  flex: 1;
`;

export const IconBox = styled.View<{ color?: string }>`
  width: ${scale(40)}px;
  height: ${scale(40)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
`;

export const SettingLabelGroup = styled.View`
  flex: 1;
  gap: ${verticalScale(2)}px;
`;

export const ThemeGrid = styled.View`
  flex-direction: row;
  gap: ${scale(12)}px;
`;

export const ThemeCard = styled.TouchableOpacity<{ isSelected: boolean }>`
  flex: 1;
  padding: ${moderateScale(16)}px;
  border-radius: ${moderateScale(20)}px;
  background-color: ${({ theme, isSelected }) =>
    isSelected
      ? theme.colors.primary_container
      : theme.colors.surface_container_low};
  elevation: ${({ isSelected }) => (isSelected ? 3 : 1)};
  justify-content: space-between;
  min-height: ${verticalScale(110)}px;
`;

export const ThemeCardTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ThemeIconCircle = styled.View<{ isSelected: boolean }>`
  width: ${scale(40)}px;
  height: ${scale(40)}px;
  border-radius: ${scale(20)}px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? 'rgba(255, 255, 255, 0.25)' : theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
`;

export const ThemeCheckmark = styled.View`
  width: ${scale(22)}px;
  height: ${scale(22)}px;
  border-radius: ${scale(11)}px;
  background-color: rgba(255, 255, 255, 0.3);
  align-items: center;
  justify-content: center;
`;

export const ThemeCardBottom = styled.View`
  margin-top: ${verticalScale(10)}px;
  gap: ${verticalScale(2)}px;
`;

export const OptionsList = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_low};
  border-radius: ${moderateScale(20)}px;
  padding: ${moderateScale(4)}px;
  elevation: 1;
`;

export const OptionRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${moderateScale(14)}px ${moderateScale(12)}px;
  border-radius: ${moderateScale(16)}px;
`;

export const OptionIconBox = styled.View`
  width: ${scale(38)}px;
  height: ${scale(38)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  align-items: center;
  justify-content: center;
`;

export const AlignmentRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${scale(8)}px;
`;

export const Badge = styled.View`
  background-color: ${({ theme }) => theme.colors.surface_container_high};
  padding: ${verticalScale(4)}px ${scale(12)}px;
  border-radius: ${moderateScale(12)}px;
`;

export const LogoutButton = styled.TouchableOpacity`
  width: 100%;
  padding: ${verticalScale(14)}px;
  background-color: ${({ theme }) => theme.colors.error_container}33;
  border-radius: ${moderateScale(18)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(10)}px;
  margin-top: ${verticalScale(8)}px;
`;

export const DeleteAccountButton = styled.TouchableOpacity`
  width: 100%;
  padding: ${verticalScale(12)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
  margin-top: ${verticalScale(4)}px;
`;

export const FooterVersion = styled.View`
  align-items: center;
  margin-top: ${verticalScale(16)}px;
`;

export const VersionPill = styled.View`
  padding: ${verticalScale(4)}px ${scale(12)}px;
  border-radius: ${moderateScale(12)}px;
  background-color: ${({ theme }) => theme.colors.surface_container_high};
`;

export const AccountSection = styled(Section)`
  padding-top: ${verticalScale(8)}px;
  padding-bottom: ${verticalScale(8)}px;
`;

