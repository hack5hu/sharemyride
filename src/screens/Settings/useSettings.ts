import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSettingsStore } from '@/store/settings';
import { useAuthStore } from '@/store';
import { useLocale } from '@/constants/localization';
import { storage } from '@/utils/storage';
import { authService } from '@/serviceManager/authService';

export const useSettings = () => {
  const navigation = useNavigation();
  const t = useLocale();

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Appearance
  const themeMode = useSettingsStore(state => state.themeMode);
  const toggleTheme = useSettingsStore(state => state.toggleTheme);

  // Preference
  const language = useSettingsStore(state => state.language);
  const region = useSettingsStore(state => state.region);
  const setLanguage = useSettingsStore(state => state.setLanguage);

  // Notifications
  const pushNotifications = useSettingsStore(state => state.pushNotifications);
  const promoEmails = useSettingsStore(state => state.promoEmails);
  const rideReceipts = useSettingsStore(state => state.rideReceipts);
  const accountSecurity = useSettingsStore(state => state.accountSecurity);
  
  const togglePushNotifications = useSettingsStore(state => state.togglePushNotifications);
  const togglePromoEmails = useSettingsStore(state => state.togglePromoEmails);
  const toggleRideReceipts = useSettingsStore(state => state.toggleRideReceipts);

  // Auth / Logout
  const logout = useAuthStore(state => state.logout);

  const goBack = () => {
    navigation.goBack();
  };

  const showLogoutConfirmation = () => setIsLogoutModalVisible(true);
  const hideLogoutConfirmation = () => setIsLogoutModalVisible(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // 2. Call authService to notify backend and wipe Keychain + Zustand
      await authService.logout();

      // 3. Reset Navigation (if Zustand doesn't already catch it)
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' as never }],
      });
    } catch (e) {
      console.error('Logout failed in settings:', e);
    } finally {
      setIsLoggingOut(false);
      setIsLogoutModalVisible(false);
    }
  };

  const handleToggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return {
    t: t.settings,
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
  };
};
