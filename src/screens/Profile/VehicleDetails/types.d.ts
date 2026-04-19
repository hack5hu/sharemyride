export type VehicleType = 'sedan' | 'suv' | 'hatchback' | 'bike';

export interface VehicleDetailsState {
  company: string;
  model: string;
  numberPlate: string;
  type: VehicleType;
  color: string;
  seater: '5' | '7';
}
