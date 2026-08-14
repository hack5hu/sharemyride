import React from 'react';
import { VehicleCard } from '../VehicleCard/VehicleCard';
import { Vehicle } from '@/store/useVehicleStore';
import { useTheme } from 'styled-components/native';
import {
  Container,
  HeaderRow,
  StyledTitle,
  StyledScrollView,
} from './VehicleHorizontalList.styles';

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
    <Container>
      <HeaderRow>
        <StyledTitle
          variant="label"
          size="sm"
          weight="bold"
          color={theme.colors.outline}
        >
          {title}
        </StyledTitle>
      </HeaderRow>

      <StyledScrollView horizontal showsHorizontalScrollIndicator={false}>
        {vehicles.map(vehicle => (
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
        <VehicleCard isAddButton model="" seater="" onPress={onAddNew} />
      </StyledScrollView>
    </Container>
  );
};
