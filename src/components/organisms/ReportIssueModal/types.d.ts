export interface ReportIssueModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: { categoryId: string; description: string }) => void;
  bookingId: string;
}
