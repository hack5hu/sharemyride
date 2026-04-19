import React from 'react';
import { ScrollView, View } from 'react-native';
import { VehicleCard } from '../VehicleCard/VehicleCard';
import { Vehicle } from '@/store/useVehicleStore';
import { scale } from '@/styles';
import { Typography } from '@/components/atoms/Typography';
import { useTheme } from 'styled-components/native';

export interface VehicleHorizontalListProps {
  vehicles: Vehicle[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddNew: () => void;
  title?: string;
}

export const VehicleHorizontalList: React.FC<VehicleHorizontalListProps> = ({
  vehicles,
  selectedId,
  onSelect,
  onAddNew,
  title = 'Your Vehicles',
}) => {
  const theme = useTheme();

  return (
    <View style={{ marginBottom: 24 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: scale(24), marginBottom: 12 }}>
        <Typography variant="label" size="sm" weight="bold" color={theme.colors.outline} style={{ letterSpacing: 1.5, textTransform: 'uppercase' }}>
          {title}
        </Typography>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: scale(24), gap: scale(12) }}
      >
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            company={vehicle.company}
            model={vehicle.model}
            seater={vehicle.seater}
            color={vehicle.color}
            type={vehicle.type}
            plate={vehicle.numberPlate}
            isSelected={selectedId === vehicle.id}
            onPress={() => onSelect(vehicle.id)}
          />
        ))}
        <VehicleCard
          isAddButton
          model=""
          seater=""
          onPress={onAddNew}
        />
      </ScrollView>
    </View>
  );
};
