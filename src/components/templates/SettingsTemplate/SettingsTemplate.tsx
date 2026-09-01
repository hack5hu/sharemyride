import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { Typography } from '@/components/atoms/Typography';
import { Toggle } from '@/components/atoms/Toggle';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { SettingsTemplateProps } from './types.d';
import * as S from './SettingsTemplate.styles';
import { AppearanceSection } from './components/AppearanceSection';
import { AccountSection } from './components/AccountSection';

export const SettingsTemplate: React.FC<SettingsTemplateProps> = React.memo(
  ({
    t,
    themeMode,
    toggleTheme,
    language,
    region,
    handleToggleLanguage,
    pushNotifications,
    togglePushNotifications,
    goBack,
    handleLogout,
    isLogoutModalVisible,
    isLoggingOut,
    showLogoutConfirmation,
    hideLogoutConfirmation,
    isDeleteModalVisible,
    isDeleting,
    showDeleteConfirmation,
    hideDeleteConfirmation,
    handleDeleteAccount,
    theme,
  }) => {
    return (
      <S.ScreenWrapper>
        <ScreenShell
          title={t.headerTitle}
          onBack={goBack}
          rightElement={
            <Typography
              variant="title"
              size="md"
              weight="bold"
              color={theme.colors.primary}
            >
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
                    <Icon
                      name="notifications"
                      size={24}
                      color={theme.colors.primary}
                    />
                  </S.IconBox>
                  <S.SettingLabelGroup>
                    <Typography variant="label" size="md" weight="bold">
                      {t.pushNotifications}
                    </Typography>
                    <Typography
                      variant="body"
                      size="xs"
                      color="on_surface_variant"
                    >
                      {t.pushNotificationsDesc}
                    </Typography>
                  </S.SettingLabelGroup>
                </S.SettingInfo>
                <Toggle
                  value={pushNotifications}
                  onValueChange={togglePushNotifications}
                />
              </S.SettingCard>
            </S.Section>

            {/* Appearance */}
            <AppearanceSection
              themeMode={themeMode}
              toggleTheme={toggleTheme}
              t={t}
              theme={theme}
            />

            {/* Preferences */}
            <S.Section>
              <S.SectionTitle>{t.preferences}</S.SectionTitle>
              <S.OptionsList>
                <S.OptionRow onPress={handleToggleLanguage} activeOpacity={0.7}>
                  <S.SettingInfo>
                    <S.OptionIconBox>
                      <Icon
                        name="language"
                        size={20}
                        color={theme.colors.primary}
                      />
                    </S.OptionIconBox>
                    <Typography variant="label" size="md" weight="bold">
                      {t.language}
                    </Typography>
                  </S.SettingInfo>
                  <S.AlignmentRow>
                    <Typography
                      variant="label"
                      size="sm"
                      weight="bold"
                      color={theme.colors.primary}
                    >
                      {language === 'en' ? t.languageEn : t.languageHi}
                    </Typography>
                    <Icon
                      name="chevron-right"
                      size={20}
                      color={theme.colors.on_surface_variant}
                    />
                  </S.AlignmentRow>
                </S.OptionRow>

                <S.OptionRow disabled>
                  <S.SettingInfo>
                    <S.OptionIconBox>
                      <Icon
                        name="public"
                        size={20}
                        color={theme.colors.primary}
                      />
                    </S.OptionIconBox>
                    <Typography variant="label" size="md" weight="bold">
                      {t.region}
                    </Typography>
                  </S.SettingInfo>
                  <S.Badge>
                    <Typography variant="label" size="xs" weight="bold" color="primary">
                      {region}
                    </Typography>
                  </S.Badge>
                </S.OptionRow>
              </S.OptionsList>
            </S.Section>

            {/* Account Section */}
            <AccountSection
              t={t}
              theme={theme}
              showLogoutConfirmation={showLogoutConfirmation}
              showDeleteConfirmation={showDeleteConfirmation}
            />
          </S.ContentContainer>
        </ScreenShell>

        <ConfirmationModal
          isVisible={isLogoutModalVisible}
          onClose={hideLogoutConfirmation}
          onConfirm={handleLogout}
          title={t.logoutConfirmTitle}
          message={t.logoutConfirmMessage}
          confirmLabel={t.logoutConfirmButton}
          cancelLabel={t.logoutConfirmCancel}
          type="danger"
          isLoading={isLoggingOut}
        />

        <ConfirmationModal
          isVisible={isDeleteModalVisible}
          onClose={hideDeleteConfirmation}
          onConfirm={handleDeleteAccount}
          title={t.deleteAccountConfirmTitle}
          message={t.deleteAccountConfirmMessage}
          confirmLabel={t.deleteAccountConfirmButton}
          cancelLabel={t.deleteAccountConfirmCancel}
          type="danger"
          isLoading={isDeleting}
        />
      </S.ScreenWrapper>
    );
  },
);

SettingsTemplate.displayName = 'SettingsTemplate';
