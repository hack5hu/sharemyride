export interface ReportIssueModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    categoryId: string;
    reason?: string;
    description: string;
  }) => void;
  bookingId: string;
  reportType?: 'USER' | 'RIDE';
}
