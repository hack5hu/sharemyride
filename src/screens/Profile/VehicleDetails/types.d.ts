export type VehicleType = 'sedan' | 'suv' | 'hatchback' | 'bike';

export interface VehicleDetailsState {
  company: string;
  model: string;
  numberPlate: string;
  type: VehicleType;
  year: string;
  color: string;
}
