export interface LoginFormProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e?: unknown) => void;
  error?: string;
  onSubmit: () => void;
  isValid: boolean;
  loading?: boolean;
  onTruecallerLogin?: () => void;
  onInputFocus?: () => void;
  /** True when Truecaller is installed and user hasn't yet dismissed it */
  isTruecallerActive?: boolean;
}
