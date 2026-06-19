export interface RideDetailsTemplateProps {
  ride: any;
  isLoading: boolean;
  isDriver: boolean;
  t: any;
  handleBack: () => void;
  handleViewRoute: () => void;
  handleCopyAddress: (address: string) => void;
  handleChat: () => void;
  handleDriverProfile: () => void;
  handlePassengerProfile: (passengerId: string) => void;
  handleCancelRide: () => void;
  handleCancelPassenger: (passengerId: string) => void;
  handleCancelOwnBooking: () => void;
  isCancelModalVisible: boolean;
  setIsCancelModalVisible: (visible: boolean) => void;
  cancellationReasons: any;
  handleConfirmCancel: (data: { categoryId: string; description: string }) => void;
  isCancelling: boolean;
  cancelTarget: any;
  handleReportRide: () => void;
  isReportModalVisible: boolean;
  setIsReportModalVisible: (visible: boolean) => void;
  handleReportSubmit: (data: { categoryId: string; description: string }) => void;
  handleRateDriver: () => void;
  handleRatePassenger: (passengerId: string, name: string) => void;
}
