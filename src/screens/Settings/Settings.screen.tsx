import React from 'react';
import { useTheme } from 'styled-components/native';
import { useSettings } from './useSettings';
import { SettingsTemplate } from '@/components/templates/SettingsTemplate';

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
    isLogoutModalVisible,
    isLoggingOut,
    showLogoutConfirmation,
    hideLogoutConfirmation,
  } = useSettings();

  return (
    <SettingsTemplate
      t={t}
      themeMode={themeMode}
      toggleTheme={toggleTheme}
      language={language}
      region={region}
      handleToggleLanguage={handleToggleLanguage}
      pushNotifications={pushNotifications}
      togglePushNotifications={togglePushNotifications}
      promoEmails={promoEmails}
      togglePromoEmails={togglePromoEmails}
      rideReceipts={rideReceipts}
      toggleRideReceipts={toggleRideReceipts}
      accountSecurity={accountSecurity}
      goBack={goBack}
      handleLogout={handleLogout}
      isLogoutModalVisible={isLogoutModalVisible}
      isLoggingOut={isLoggingOut}
      showLogoutConfirmation={showLogoutConfirmation}
      hideLogoutConfirmation={hideLogoutConfirmation}
      theme={theme}
    />
  );
};
