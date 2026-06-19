export interface SettingsTemplateProps {
  t: any;
  themeMode: string;
  toggleTheme: () => void;
  language: string;
  region: string;
  handleToggleLanguage: () => void;
  pushNotifications: boolean;
  togglePushNotifications: () => void;
  promoEmails: boolean;
  togglePromoEmails: () => void;
  rideReceipts: boolean;
  toggleRideReceipts: () => void;
  accountSecurity: boolean;
  goBack: () => void;
  handleLogout: () => void;
  isLogoutModalVisible: boolean;
  isLoggingOut: boolean;
  showLogoutConfirmation: () => void;
  hideLogoutConfirmation: () => void;
  theme: any;
}
