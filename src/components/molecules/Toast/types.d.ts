export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  type: ToastType;
  message: string;
  isVisible: boolean;
  onHide?: () => void;
}
