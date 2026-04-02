export interface LocationBottomSheetProps {
  isSharingLive: boolean;
  onToggleSharing: (value: boolean) => void;
  selectedDuration: string;
  onSelectDuration: (duration: string) => void;
  onLocationSelect: (location: any) => void;
}
