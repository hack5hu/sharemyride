export interface DriverDetails {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  vehicleModel: string;
  licensePlate?: string;
  phone?: string;
}

export interface DriverCardSectionProps {
  driver: DriverDetails;
  chatLabel: string;
  callLabel: string;
  onChatPress: () => void;
  onCallPress: () => void;
}
