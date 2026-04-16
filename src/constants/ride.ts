import { VehicleType } from '@/screens/Profile/VehicleDetails/types.d';

export const VEHICLE_TYPES = [
  { type: 'sedan' as VehicleType, icon: 'directions-car' },
  { type: 'suv' as VehicleType, icon: 'commute' },
  { type: 'hatchback' as VehicleType, icon: 'drive-eta' },
  { type: 'bike' as VehicleType, icon: 'motorcycle' },
] as const;

export const CAR_COLORS = [
  { label: 'White', value: '#FFFFFF' },
  { label: 'Black', value: '#000000' },
  { label: 'Silver', value: '#C0C0C0' },
  { label: 'Grey', value: '#808080' },
  { label: 'Red', value: '#FF0000' },
  { label: 'Blue', value: '#0000FF' },
  { label: 'Green', value: '#008000' },
];

export const getColorLabel = (value: string) => {
  const color = CAR_COLORS.find((c) => c.value === value || c.label === value);
  return color ? color.label : value;
};
