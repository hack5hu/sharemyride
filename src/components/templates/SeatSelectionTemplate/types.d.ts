import { VehicleType } from '@/components/molecules/VehicleToggle/VehicleToggle';
import { Vehicle } from '@/store/useVehicleStore';
import { SeatSelectionTranslations } from '@/constants/localization/types';

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
  t: SeatSelectionTranslations;
}
