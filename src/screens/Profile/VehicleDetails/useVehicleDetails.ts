import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { VehicleDetailsState, VehicleType } from './types';

const validationSchema = Yup.object().shape({
  company: Yup.string().required('Vehicle company is required'),
  model: Yup.string().required('Car model is required'),
  numberPlate: Yup.string().required('Number plate is required'),
  type: Yup.string().required('Vehicle type is required'),
  year: Yup.string().required('Manufacturing year is required'),
  color: Yup.string().required('Color is required'),
});

import { VEHICLE_TYPES, CAR_COLORS } from '@/constants/ride';

export const useVehicleDetails = () => {
  const navigation = useNavigation();

  const vehicleTypes = useMemo(() => VEHICLE_TYPES, []);
  const carColors = useMemo(() => CAR_COLORS, []);


  const { vehicleDetails, setVehicleDetails } = useRidePublishStore();

  const formik = useFormik<VehicleDetailsState>({
    initialValues: {
      company: vehicleDetails?.company || '',
      model: vehicleDetails?.model || '',
      numberPlate: vehicleDetails?.numberPlate || '',
      type: (vehicleDetails?.type as VehicleType) || 'sedan',
      year: vehicleDetails?.year || '2024',
      color: vehicleDetails?.color || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      // In a real app, this would call the API service
      setVehicleDetails(values);
      console.log('Vehicle details saved:', values);
      navigation.goBack();
    },
  });

  const setVehicleType = useCallback((type: VehicleType) => {
    formik.setFieldValue('type', type);
  }, [formik]);

  const setColor = useCallback((color: string) => {
    formik.setFieldValue('color', color);
  }, [formik]);

  return {
    formik,
    vehicleTypes,
    carColors,
    setVehicleType,
    setColor,
    goBack: () => navigation.goBack(),
  };
};


