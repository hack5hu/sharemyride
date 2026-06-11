export interface CancelRideModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSubmit: (reason: { categoryId: string; description: string }) => void;
  bookingId?: string;
  isDriver?: boolean;
  isSpecificUser?: boolean; // For cancelling a specific passenger instead of whole ride
  isLoading?: boolean;
}
