import React from 'react';
import { Modal } from 'react-native';
import { Backdrop, BlurOverlay } from './ModalBackdrop.styles';
import { ModalBackdropProps } from './types.d';

export const ModalBackdrop: React.FC<ModalBackdropProps> = ({ isVisible, onPress, children }) => {
  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onPress}
    >
      <Backdrop onPress={onPress}>
        {children}
      </Backdrop>
    </Modal>
  );
};
