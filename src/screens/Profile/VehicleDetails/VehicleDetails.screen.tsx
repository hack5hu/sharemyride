import React from 'react';
import { useTheme } from 'styled-components/native';
import { useTranslation } from '@/hooks/useTranslation';
import { useVehicleDetails } from './useVehicleDetails';
import { VehicleDetailsTemplate } from '@/components/templates/VehicleDetailsTemplate';

export const VehicleDetailsScreen: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { formik, isLoading, carColors, setSeater, setColor, goBack } =
    useVehicleDetails();

  return (
    <VehicleDetailsTemplate
      formik={formik}
      isLoading={isLoading}
      carColors={carColors}
      setSeater={setSeater}
      setColor={setColor}
      goBack={goBack}
      t={t}
      theme={theme}
    />
  );
};
