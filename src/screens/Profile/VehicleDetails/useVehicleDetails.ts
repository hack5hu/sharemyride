import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
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

export const useVehicleDetails = () => {
  const navigation = useNavigation();

  const formik = useFormik<VehicleDetailsState>({
    initialValues: {
      company: '',
      model: '',
      numberPlate: '',
      type: 'sedan',
      year: '2024',
      color: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      // In a real app, this would call the API service
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
    setVehicleType,
    setColor,
    goBack: () => navigation.goBack(),
  };
};

