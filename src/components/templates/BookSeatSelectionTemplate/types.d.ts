export interface BookSeatSelectionTemplateProps {
  t: any;
  st: any;
  rows: any[];
  selectedSeats: string[];
  occupiedSeats: string[];
  prices: any;
  totalPrice: number;
  seatCount: number;
  vehicleType: string;
  toggleSeat: (seatId: string) => void;
  handleBack: () => void;
  handleConfirm: () => void;
  driverName: string;
  vehicleRegistration: string;
  departureDate: string;
  departureTime: string;
  passengers: any[];
  isBooking: boolean;
  isDisabled: boolean;
}
