export interface LoginFormProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: any) => void;
  error?: string;
  onSubmit: () => void;
  isValid: boolean;
  loading?: boolean;
  isTermsAccepted: boolean;
  onToggleTerms: () => void;
}
