import { useAppNavigation } from '@/hooks/useAppNavigation';
import { useCallback, useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useVehicleStore } from '@/store/useVehicleStore';
import { UseVehicleListReturn } from './types.d';

import { useLocale } from '@/constants/localization';

import { showNotification } from '@/components/organisms/GlobalNotification/GlobalNotification';
import { NotificationType } from '@/constants/enums';

export const useVehicleList = (): UseVehicleListReturn => {
  const navigation = useAppNavigation();
  const isFocused = useIsFocused();
  const locale = useLocale();
  const { vehicles, isLoading, syncVehicles, removeVehicle } = useVehicleStore();

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);

  useEffect(() => {
    if (isFocused) {
      syncVehicles();
    }
  }, [isFocused, syncVehicles]);

  const onEdit = useCallback((id: string) => {
    (navigation.navigate as any)('VehicleDetails', { vehicleId: id });
  }, [navigation]);

  const onDelete = useCallback((id: string) => {
    setSelectedVehicleId(id);
    setIsDeleteModalVisible(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedVehicleId) return;
    try {
      await removeVehicle(selectedVehicleId);
      showNotification(
        NotificationType.SUCCESS,
        locale.notification.defaultSuccessTitle,
        locale.notification.vehicleRemoved
      );
    } catch {
      showNotification(
        NotificationType.ERROR,
        locale.notification.defaultErrorTitle,
        locale.notification.vehicleRemoveError
      );
    } finally {
      setIsDeleteModalVisible(false);
      setSelectedVehicleId(null);
    }
  }, [selectedVehicleId, removeVehicle, locale]);

  const onAdd = useCallback(() => {
    (navigation.navigate as any)('VehicleDetails');
  }, [navigation]);

  return {
    vehicles,
    isLoading,
    onEdit,
    onDelete,
    onAdd,
    onBack: () => navigation.goBack(),
    isDeleteModalVisible,
    setIsDeleteModalVisible,
    handleConfirmDelete,
  };
};
