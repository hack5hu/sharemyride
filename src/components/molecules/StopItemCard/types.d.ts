export enum DriverStopStatus {
  COMPLETED = 'COMPLETED',
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
}

export interface DriverStop {
  id: string;
  userId: string;
  passengerName: string;
  passengerAvatar?: string;
  pickupLocation: string;
  distanceAway?: string;
  status: DriverStopStatus;
  phone?: string;
}

export interface StopItemCardProps {
  stop: DriverStop;
  isLast: boolean;
  subtitle: string;
  chatAccessibilityLabel: string;
  callAccessibilityLabel: string;
  onChatPress: (stop: DriverStop) => void;
  onCallPress: (stop: DriverStop) => void;
}
