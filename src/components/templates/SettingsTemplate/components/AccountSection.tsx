import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DeviceInfo from 'react-native-device-info';
import { DefaultTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { SettingsTranslations } from '@/constants/localization/types';
import * as S from '../SettingsTemplate.styles';

export interface AccountSectionProps {
  t: SettingsTranslations;
  theme: DefaultTheme;
  showLogoutConfirmation: () => void;
  showDeleteConfirmation: () => void;
}

export const AccountSection: React.FC<AccountSectionProps> = React.memo(
  ({ t, theme, showLogoutConfirmation, showDeleteConfirmation }) => {
    return (
      <S.AccountSection>
        <S.LogoutButton onPress={showLogoutConfirmation}>
          <Icon name="logout" size={24} color={theme.colors.error} />
          <Typography
            variant="title"
            size="sm"
            weight="bold"
            color={theme.colors.error}
          >
            {t.logout}
          </Typography>
        </S.LogoutButton>

        <S.DeleteAccountButton onPress={showDeleteConfirmation}>
          <Icon name="delete-outline" size={20} color={theme.colors.error} />
          <Typography
            variant="body"
            size="sm"
            weight="medium"
            color={theme.colors.error}
          >
            {t.deleteAccount}
          </Typography>
        </S.DeleteAccountButton>

        <S.FooterVersion>
          <S.VersionText color={theme.colors.on_surface_variant}>
            {t.version} {DeviceInfo.getVersion()}
          </S.VersionText>
        </S.FooterVersion>
      </S.AccountSection>
    );
  },
);

AccountSection.displayName = 'AccountSection';
