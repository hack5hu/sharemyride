export interface OtpInputProps {
  length?: number;
  onTextChange: (text: string) => void;
  onFilled?: (text: string) => void;
  error?: boolean;
}
