import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Typography } from '@/components/atoms/Typography';
import { Toggle } from '@/components/atoms/Toggle';
import { Checkbox } from '@/components/atoms/Checkbox';
import { useSettings } from './useSettings';
import {
  ContentContainer,
  Section,
  SectionTitle,
  SettingCard,
  ThemeGrid,
  ThemeCard,
  OptionsList,
  OptionRow,
  EmailCard,
  LogoutButton,
} from './Settings.styles';

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
    <ScreenShell
      title={t.headerTitle}
      onBack={goBack}
      rightElement={
        <Typography variant="title" size="md" weight="bold" color={theme.colors.primary}>
          {t.appName}
        </Typography>
      }
    >
      <ContentContainer showsVerticalScrollIndicator={false}>
        {/* Notifications */}
        <Section>
          <SectionTitle>{t.notifications}</SectionTitle>
          <SettingCard>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <View style={{ backgroundColor: theme.colors.primary_container + '20', padding: 12, borderRadius: 12 }}>
                <Icon name="notifications" size={24} color={theme.colors.primary} />
              </View>
              <View>
                <Typography variant="label" size="md" weight="bold">{t.pushNotifications}</Typography>
                <Typography variant="body" size="xs" color="on_surface_variant">{t.pushNotificationsDesc}</Typography>
              </View>
            </View>
            <Toggle value={pushNotifications} onValueChange={togglePushNotifications} />
          </SettingCard>
        </Section>

        {/* Appearance */}
        <Section>
          <SectionTitle>{t.appearance}</SectionTitle>
          <ThemeGrid>
            <ThemeCard isCurrent={themeMode === 'light' || themeMode === 'dark'}>
              <Icon name="palette" size={32} color={theme.colors.primary} />
              <View style={{ marginTop: 24 }}>
                <Typography variant="title" size="sm" weight="bold">{t.theme}</Typography>
                <Typography variant="body" size="xs" color="on_surface_variant">
                  {themeMode === 'light' ? t.lightMode : t.darkMode}
                </Typography>
              </View>
            </ThemeCard>
            <ThemeCard>
              <View style={{ alignItems: 'flex-end' }}>
                 <Toggle value={themeMode === 'dark'} onValueChange={toggleTheme} />
              </View>
              <View style={{ marginTop: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="title" size="sm" weight="bold">{t.darkModeToggle}</Typography>
                <Icon name={themeMode === 'dark' ? 'dark-mode' : 'light-mode'} size={24} color={theme.colors.on_surface_variant} />
              </View>
            </ThemeCard>
          </ThemeGrid>
        </Section>

        {/* Preferences */}
        <Section>
          <SectionTitle>{t.preferences}</SectionTitle>
          <OptionsList>
            <OptionRow onPress={handleToggleLanguage}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <Icon name="language" size={24} color={theme.colors.secondary} />
                <Typography variant="label" size="md" weight="medium">{t.language}</Typography>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Typography variant="label" size="sm" weight="bold" color={theme.colors.primary}>
                  {language === 'en' ? t.languageEn : t.languageHi}
                </Typography>
                <Icon name="chevron-right" size={20} color={theme.colors.on_surface_variant} />
              </View>
            </OptionRow>
            
            <OptionRow disabled>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                <Icon name="public" size={24} color={theme.colors.secondary} />
                <Typography variant="label" size="md" weight="medium">{t.region}</Typography>
              </View>
              <View style={{ backgroundColor: theme.colors.secondary_container, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 }}>
                <Typography variant="label" size="xs" weight="bold" color={theme.colors.on_secondary_container} style={{ textTransform: 'uppercase' }}>
                  {region}
                </Typography>
              </View>
            </OptionRow>
          </OptionsList>
        </Section>

        {/* Email Settings */}
        <Section>
          <SectionTitle>{t.emailSettings}</SectionTitle>
          
          <EmailCard>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Icon name="campaign" size={24} color={theme.colors.tertiary} />
              <Typography variant="label" size="md" weight="semibold">{t.promotions}</Typography>
            </View>
            <Checkbox checked={promoEmails} onToggle={togglePromoEmails} />
          </EmailCard>

          <EmailCard>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Icon name="receipt-long" size={24} color={theme.colors.tertiary} />
              <Typography variant="label" size="md" weight="semibold">{t.rideReceipts}</Typography>
            </View>
            <Checkbox checked={rideReceipts} onToggle={toggleRideReceipts} />
          </EmailCard>

          <EmailCard style={{ opacity: 0.5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Icon name="shield" size={24} color={theme.colors.tertiary} />
              <Typography variant="label" size="md" weight="semibold">{t.accountSecurity}</Typography>
            </View>
            <Checkbox checked={accountSecurity} onToggle={() => {}} />
          </EmailCard>
        </Section>

        {/* Account Section */}
        <Section style={{ paddingTop: 16, paddingBottom: 32 }}>
          <LogoutButton onPress={handleLogout}>
            <Icon name="logout" size={24} color={theme.colors.error} />
            <Typography variant="title" size="sm" weight="bold" color={theme.colors.error}>
              {t.logout}
            </Typography>
          </LogoutButton>
          
          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <Typography variant="body" size="xs" weight="medium" color={theme.colors.on_surface_variant} style={{ opacity: 0.5 }}>
              {t.version}
            </Typography>
          </View>
        </Section>

      </ContentContainer>
    </ScreenShell>
  );
};
