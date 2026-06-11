export interface MyRideDetailsTemplateProps {
  ride: any;
  handleBack: () => void;
  handleViewRoute: (index?: number) => void;
  handleCopyAddress: (address: string) => void;
  handleChat: () => void;
  isLoading?: boolean;
  isDriver: boolean;
  onCancelRide: () => void;
  onCancelPassenger: (id: string) => void;
  handlePassengerProfile?: (id: string) => void;
  handleDriverProfile?: (id: string) => void;
  onReportRide?: () => void;
  onRateDriver?: () => void;
  onRatePassenger?: (id: string, name: string) => void;
  t: any;
}
