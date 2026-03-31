import { TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

export interface OtpInputProps {
  length?: number;
  values: string[];
  refs: React.MutableRefObject<(TextInput | null)[]>;
  onChangeText: (text: string, index: number) => void;
  onKeyPress: (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => void;
  error?: boolean;
}
