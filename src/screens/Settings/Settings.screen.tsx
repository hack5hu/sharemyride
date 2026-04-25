import React from 'react';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Typography } from '@/components/atoms/Typography';
import { Toggle } from '@/components/atoms/Toggle';
import { Checkbox } from '@/components/atoms/Checkbox';
import { useSettings } from './useSettings';
import * as S from './Settings.styles';

export const SettingsScreen: React.FC = () => {
  const theme = useTheme();
  const {
    t,
    themeMode,
    toggleTheme,
    language,
    region,
    handleToggleLanguage,
    pushNotifications,
    togglePushNotifications,
    promoEmails,
    togglePromoEmails,
    rideReceipts,
    toggleRideReceipts,
    accountSecurity,
    goBack,
    handleLogout,
  } = useSettings();

  return (
    <S.ScreenWrapper>
      <ScreenShell
        title={t.headerTitle}
        onBack={goBack}
        rightElement={
          <Typography variant="title" size="md" weight="bold" color={theme.colors.primary}>
            {t.appName}
          </Typography>
        }
      >
        <S.ContentContainer showsVerticalScrollIndicator={false}>
          {/* Notifications */}
          <S.Section>
            <S.SectionTitle>{t.notifications}</S.SectionTitle>
            <S.SettingCard>
              <S.SettingInfo>
                <S.IconBox color={theme.colors.primary}>
                  <Icon name="notifications" size={24} color={theme.colors.primary} />
                </S.IconBox>
                <S.SettingLabelGroup>
                  <Typography variant="label" size="md" weight="bold">{t.pushNotifications}</Typography>
                  <Typography variant="body" size="xs" color="on_surface_variant">{t.pushNotificationsDesc}</Typography>
                </S.SettingLabelGroup>
              </S.SettingInfo>
              <Toggle value={pushNotifications} onValueChange={togglePushNotifications} />
            </S.SettingCard>
          </S.Section>

          {/* Appearance */}
          <S.Section>
            <S.SectionTitle>{t.appearance}</S.SectionTitle>
            <S.ThemeGrid>
              <S.ThemeCard isCurrent={themeMode === 'light' || themeMode === 'dark'}>
                <Icon name="palette" size={32} color={theme.colors.primary} />
                <S.ThemeInfo>
                  <Typography variant="title" size="sm" weight="bold">{t.theme}</Typography>
                  <Typography variant="body" size="xs" color="on_surface_variant">
                    {themeMode === 'light' ? t.lightMode : t.darkMode}
                  </Typography>
                </S.ThemeInfo>
              </S.ThemeCard>
              <S.ThemeCard>
                <S.ThemeToggleRow>
                   <Toggle value={themeMode === 'dark'} onValueChange={toggleTheme} />
                </S.ThemeToggleRow>
                <S.ThemeSwitchLabel>
                  <Typography variant="title" size="sm" weight="bold">{t.darkModeToggle}</Typography>
                  <Icon name={themeMode === 'dark' ? 'dark-mode' : 'light-mode'} size={24} color={theme.colors.on_surface_variant} />
                </S.ThemeSwitchLabel>
              </S.ThemeCard>
            </S.ThemeGrid>
          </S.Section>

          {/* Preferences */}
          <S.Section>
            <S.SectionTitle>{t.preferences}</S.SectionTitle>
            <S.OptionsList>
              <S.OptionRow onPress={handleToggleLanguage}>
                <S.SettingInfo>
                  <Icon name="language" size={24} color={theme.colors.secondary} />
                  <Typography variant="label" size="md" weight="medium">{t.language}</Typography>
                </S.SettingInfo>
                <S.AlignmentRow>
                  <Typography variant="label" size="sm" weight="bold" color={theme.colors.primary}>
                    {language === 'en' ? t.languageEn : t.languageHi}
                  </Typography>
                  <Icon name="chevron-right" size={20} color={theme.colors.on_surface_variant} />
                </S.AlignmentRow>
              </S.OptionRow>
              
              <S.OptionRow disabled>
                <S.SettingInfo>
                  <Icon name="public" size={24} color={theme.colors.secondary} />
                  <Typography variant="label" size="md" weight="medium">{t.region}</Typography>
                </S.SettingInfo>
                <S.Badge>
                  <S.BadgeText color={theme.colors.on_secondary_container}>
                    {region}
                  </S.BadgeText>
                </S.Badge>
              </S.OptionRow>
            </S.OptionsList>
          </S.Section>

          {/* Email Settings */}
          <S.Section>
            <S.SectionTitle>{t.emailSettings}</S.SectionTitle>
            
            <S.EmailCard>
              <S.AlignmentRow>
                <Icon name="campaign" size={24} color={theme.colors.tertiary} />
                <Typography variant="label" size="md" weight="semibold">{t.promotions}</Typography>
              </S.AlignmentRow>
              <Checkbox checked={promoEmails} onToggle={togglePromoEmails} />
            </S.EmailCard>

            <S.EmailCard>
              <S.AlignmentRow>
                <Icon name="receipt-long" size={24} color={theme.colors.tertiary} />
                <Typography variant="label" size="md" weight="semibold">{t.rideReceipts}</Typography>
              </S.AlignmentRow>
              <Checkbox checked={rideReceipts} onToggle={toggleRideReceipts} />
            </S.EmailCard>

            <S.DisabledEmailCard>
              <S.AlignmentRow>
                <Icon name="shield" size={24} color={theme.colors.tertiary} />
                <Typography variant="label" size="md" weight="semibold">{t.accountSecurity}</Typography>
              </S.AlignmentRow>
              <Checkbox checked={accountSecurity} onToggle={() => {}} />
            </S.DisabledEmailCard>
          </S.Section>

          {/* Account Section */}
          <S.AccountSection>
            <S.LogoutButton onPress={handleLogout}>
              <Icon name="logout" size={24} color={theme.colors.error} />
              <Typography variant="title" size="sm" weight="bold" color={theme.colors.error}>
                {t.logout}
              </Typography>
            </S.LogoutButton>
            
            <S.FooterVersion>
              <S.VersionText color={theme.colors.on_surface_variant}>
                {t.version}
              </S.VersionText>
            </S.FooterVersion>
          </S.AccountSection>

        </S.ContentContainer>
      </ScreenShell>
    </S.ScreenWrapper>
  );
};
