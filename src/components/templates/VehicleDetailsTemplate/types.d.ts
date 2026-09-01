import { FormikProps } from 'formik';
import { DefaultTheme } from 'styled-components/native';
import { VehicleDetailsState, VehicleType } from '@/screens/Profile/VehicleDetails/types.d';
import { VEHICLE_TYPES } from '@/constants/ride';

export interface VehicleDetailsTemplateProps {
  formik: FormikProps<VehicleDetailsState>;
  isLoading: boolean;
  carColors: { label: string; value: string }[];
  vehicleTypes: typeof VEHICLE_TYPES;
  setVehicleType: (type: VehicleType) => void;
  setSeater: (count: '5' | '7') => void;
  setColor: (color: string) => void;
  goBack: () => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  theme: DefaultTheme;
}

