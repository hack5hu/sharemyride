export interface ActionOption {
  id: string;
  label: string;
  icon?: string;
  onPress: () => void;
  isDestructive?: boolean;
}

export interface ActionSheetModalProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  options: ActionOption[];
}
