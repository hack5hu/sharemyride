import React from 'react';
import { Modal } from 'react-native';
import { Backdrop } from './ModalBackdrop.styles';
import { ModalBackdropProps } from './types.d';
import { GlobalNotification } from '@/components/organisms/GlobalNotification';

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
