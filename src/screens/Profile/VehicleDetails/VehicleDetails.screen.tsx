import React from 'react';
import { useTheme } from 'styled-components/native';
import { VehicleDetailsTemplate } from '@/components/templates/VehicleDetailsTemplate';
import { useTranslation } from '@/hooks/useTranslation';
import { useVehicleDetails } from './useVehicleDetails';

export const VehicleDetailsScreen: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const {
    formik,
    isLoading,
    vehicleTypes,
    carColors,
    setVehicleType,
    setSeater,
    setColor,
    goBack,
  } = useVehicleDetails();

  return (
    <VehicleDetailsTemplate
      formik={formik}
      isLoading={isLoading}
      vehicleTypes={vehicleTypes}
      carColors={carColors}
      setVehicleType={setVehicleType}
      setSeater={setSeater}
      setColor={setColor}
      goBack={goBack}
      t={t}
      theme={theme}
    />
  );
};

