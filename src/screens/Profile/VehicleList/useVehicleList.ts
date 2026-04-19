import { useCallback, useEffect } from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useVehicleStore } from '@/store/useVehicleStore';
import { UseVehicleListReturn } from './types.d';
import { Alert } from 'react-native';

export const useVehicleList = (): UseVehicleListReturn => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { vehicles, isLoading, syncVehicles, removeVehicle } = useVehicleStore();

  useEffect(() => {
    if (isFocused) {
      syncVehicles();
    }
  }, [isFocused, syncVehicles]);

  const onEdit = useCallback((id: string) => {
    (navigation.navigate as any)('VehicleDetails', { vehicleId: id });
  }, [navigation]);

  const onDelete = useCallback((id: string) => {
    Alert.alert(
      'Delete Vehicle',
      'Are you sure you want to remove this vehicle? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await removeVehicle(id);
            } catch (error) {
              Alert.alert('Error', 'Could not delete vehicle. Please try again.');
            }
          }
        },
      ]
    );
  }, [removeVehicle]);

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
  };
};
