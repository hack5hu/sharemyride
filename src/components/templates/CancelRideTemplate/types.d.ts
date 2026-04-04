export interface CancelReason {
  id: string;
  label: string;
}

export interface CancelRideTemplateProps {
  reasons: CancelReason[];
  selectedReasonId: string | null;
  onSelectReason: (id: string) => void;
  otherReasonText: string;
  onOtherReasonTextChange: (text: string) => void;
  onConfirm: () => void;
  onDismiss: () => void;
}
