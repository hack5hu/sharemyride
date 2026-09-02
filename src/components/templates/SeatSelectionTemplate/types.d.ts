import { type VehicleType } from '@/components/molecules/VehicleToggle/VehicleToggle';
import {
  type SeatSelectionTranslations,
  type SelectSeatTranslations,
} from '@/constants/localization/types';
import { type Vehicle } from '@/store/useVehicleStore';

export interface SeatSelectionTemplateProps {
  flow: 'publish' | 'book';
  selectedSeats: Set<string | number>;
  vehicleType: VehicleType;
  seatIdsLabel: string;
  onSeatPress: (id: string | number) => void;
  vehicles: Vehicle[];
  selectedVehicleId: string | null;
  onVehicleSelect: (id: string) => void;
  onAddNewVehicle: () => void;
  onBackPress: () => void;
  onContinue: () => void;
  t: SeatSelectionTranslations | SelectSeatTranslations;
}
