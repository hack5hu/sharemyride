import React from 'react';
import { useTheme } from 'styled-components/native';
import { VehicleListTemplate } from '@/components/templates/VehicleListTemplate';
import { useTranslation } from '@/hooks/useTranslation';
import { useVehicleList } from './useVehicleList';

export const VehicleListScreen: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const {
    vehicles,
    isLoading,
    onEdit,
    onDelete,
    onAdd,
    onBack,
    isDeleteModalVisible,
    setIsDeleteModalVisible,
    handleConfirmDelete,
  } = useVehicleList();

  return (
    <VehicleListTemplate
      vehicles={vehicles}
      isLoading={isLoading}
      onEdit={onEdit}
      onDelete={onDelete}
      onAdd={onAdd}
      onBack={onBack}
      isDeleteModalVisible={isDeleteModalVisible}
      setIsDeleteModalVisible={setIsDeleteModalVisible}
      handleConfirmDelete={handleConfirmDelete}
      t={t}
      theme={theme}
    />
  );
};
