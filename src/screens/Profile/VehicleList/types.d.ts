import { Vehicle } from '@/store/useVehicleStore';

export interface VehicleListState {
  vehicles: Vehicle[];
  isLoading: boolean;
}

export interface UseVehicleListReturn {
  vehicles: Vehicle[];
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  onBack: () => void;
}
