import { type ReactNode } from 'react';

export interface ModalBackdropProps {
  isVisible: boolean;
  onPress?: () => void;
  children?: ReactNode;
}
