import React from 'react';
import Toast, { ToastConfig, BaseToastProps } from 'react-native-toast-message';
import { Notification } from '@/components/molecules/Notification';
import { NotificationType } from '@/constants/enums';

export const GlobalNotification = () => {
  const toastConfig: ToastConfig = {
    success: (props: BaseToastProps) => (
      <Notification {...props} type={NotificationType.SUCCESS} />
    ),
    error: (props: BaseToastProps) => (
      <Notification {...props} type={NotificationType.ERROR} />
    ),
    info: (props: BaseToastProps) => (
      <Notification {...props} type={NotificationType.INFO} />
    ),
    warning: (props: BaseToastProps) => (
      <Notification {...props} type={NotificationType.WARNING} />
    ),
  };

  return <Toast config={toastConfig} />;
};

export const showNotification = (
  type: NotificationType,
  title: string,
  message?: string
) => {
  Toast.show({
    type,
    text1: title,
    text2: message,
  });
};
