export interface BookSeatSelectionTemplateProps {
  t: any;
  st: any;
  rows: any[];
  selectedSeats: Set<string | number>;
  occupiedSeats: Set<string | number>;
  prices: any;
  totalPrice: number;
  seatCount: number;
  vehicleType: string;
  toggleSeat: (id: string | number) => void;
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
