export interface GlassSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onLocationPress?: () => void;
  placeholder?: string;
}
