export interface ChatInputSectionProps {
  value: string;
  onChangeText: (text: string) => void;
  onSendPress: () => void;
  onLocationPress: () => void;
  placeholder?: string;
  safetyMessage: string;
}
