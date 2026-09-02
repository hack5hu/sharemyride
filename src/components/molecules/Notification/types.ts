import { type ToastProps as BaseToastProps } from 'react-native-toast-message';
import { type NotificationType } from '@/constants/enums';

export interface NotificationProps extends BaseToastProps {
  type?: NotificationType;
  text1?: string;
  text2?: string;
  onHide?: () => void;
}
