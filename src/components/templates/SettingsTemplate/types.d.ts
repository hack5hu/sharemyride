import { DefaultTheme } from 'styled-components/native';
import { SettingsTranslations } from '@/constants/localization/types';

export interface SettingsTemplateProps {
  t: SettingsTranslations;
  themeMode: 'light' | 'dark' | 'system';
  toggleTheme: () => void;
  language: string;
  region: string;
  handleToggleLanguage: () => void;
  pushNotifications: boolean;
  togglePushNotifications: () => void;
  promoEmails?: boolean;
  togglePromoEmails?: () => void;
  rideReceipts?: boolean;
  toggleRideReceipts?: () => void;
  accountSecurity?: boolean;
  goBack: () => void;
  handleLogout: () => void;
  isLogoutModalVisible: boolean;
  isLoggingOut: boolean;
  showLogoutConfirmation: () => void;
  hideLogoutConfirmation: () => void;
  isDeleteModalVisible: boolean;
  isDeleting: boolean;
  showDeleteConfirmation: () => void;
  hideDeleteConfirmation: () => void;
  handleDeleteAccount: () => void;
  theme: DefaultTheme;
}
