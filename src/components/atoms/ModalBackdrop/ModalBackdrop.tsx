import React from 'react';
import { Modal } from 'react-native';
import { GlobalNotification } from '@/components/organisms/GlobalNotification';
import { Backdrop } from './ModalBackdrop.styles';
import { type ModalBackdropProps } from './types.d';

export const ModalBackdrop: React.FC<ModalBackdropProps> = ({
  isVisible,
  onPress,
  children,
}) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onPress}
    >
      <Backdrop onPress={onPress}>
        {children}
        <GlobalNotification />
      </Backdrop>
    </Modal>
  );
};
