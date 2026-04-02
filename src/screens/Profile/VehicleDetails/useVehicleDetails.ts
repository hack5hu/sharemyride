import { useCallback, useMemo } from 'react';
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

  const vehicleTypes = useMemo(() => [
    { type: 'sedan', icon: 'directions-car' },
    { type: 'suv', icon: 'commute' },
    { type: 'hatchback', icon: 'drive-eta' },
    { type: 'bike', icon: 'motorcycle' },
  ] as const, []);

  const carColors = useMemo(() => [
    { label: 'White', value: '#FFFFFF' },
    { label: 'Black', value: '#000000' },
    { label: 'Silver', value: '#C0C0C0' },
    { label: 'Grey', value: '#808080' },
    { label: 'Red', value: '#FF0000' },
    { label: 'Blue', value: '#0000FF' },
    { label: 'Green', value: '#008000' },
  ], []);


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
    vehicleTypes,
    carColors,
    setVehicleType,
    setColor,
    goBack: () => navigation.goBack(),
  };
};


