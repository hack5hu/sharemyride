import { useCallback, useMemo } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types.d';
import { useRidePublishStore } from '@/store/useRidePublishStore';
import { useVehicleStore } from '@/store/useVehicleStore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { VehicleDetailsState, VehicleType } from './types';
import { VEHICLE_TYPES, CAR_COLORS } from '@/constants/ride';
import { useTranslation } from '@/hooks/useTranslation';
import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';

const validationSchema = Yup.object().shape({
  company: Yup.string().required('Vehicle company is required'),
  model: Yup.string().required('Car model is required'),
  numberPlate: Yup.string().required('Number plate is required'),
  type: Yup.string().required('Vehicle type is required'),
  color: Yup.string().required('Color is required'),
  seater: Yup.string().oneOf(['5', '7']).required('Seater count is required'),
});

export const useVehicleDetails = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'VehicleDetails'>>();
  const vehicleId = route.params?.vehicleId;
  const { t } = useTranslation();

  const { addVehicle, updateVehicle, vehicles, isLoading } = useVehicleStore();
  const { setVehicleDetails, setPublishVehicleType } = useRidePublishStore();

  const initialValues = useMemo(() => {
    if (vehicleId) {
      const existing = vehicles.find(v => v.id === vehicleId);
      if (existing) {
        return {
          company: existing.company,
          model: existing.model,
          numberPlate: existing.numberPlate,
          type: existing.type as VehicleType,
          color: existing.color,
          seater: existing.seater,
        };
      }
    }
    return {
      company: '',
      model: '',
      numberPlate: '',
      type: 'sedan' as VehicleType,
      color: '',
      seater: '5' as '5' | '7',
    };
  }, [vehicleId, vehicles]);

  const vehicleTypes = useMemo(() => VEHICLE_TYPES, []);
  const carColors = useMemo(() => CAR_COLORS, []);

  const formik = useFormik<VehicleDetailsState>({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (vehicleId) {
          await updateVehicle(vehicleId, values);
        } else {
          await addVehicle(values);
        }
        
        // Update current publish state if we're in the publish flow
        setVehicleDetails(values);
        setPublishVehicleType(values.seater);

        navigation.goBack();
      } catch (error: any) {
        showNotification(
          NotificationType.ERROR,
          t('notification.defaultErrorTitle'),
          error.message || t('notification.defaultErrorMessage')
        );
      }
    },
  });

  const setVehicleType = useCallback((type: VehicleType) => {
    formik.setFieldValue('type', type);
  }, [formik]);

  const setSeater = useCallback((count: '5' | '7') => {
    formik.setFieldValue('seater', count);
  }, [formik]);

  const setColor = useCallback((color: string) => {
    formik.setFieldValue('color', color);
  }, [formik]);

  return {
    formik,
    isLoading,
    vehicleTypes,
    carColors,
    setVehicleType,
    setSeater,
    setColor,
    goBack: () => navigation.goBack(),
  };
};

