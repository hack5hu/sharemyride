import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { VehicleCard } from '@/components/molecules/VehicleCard/VehicleCard';
import { useTranslation } from '@/hooks/useTranslation';
import { useVehicleList } from './useVehicleList';
import * as S from './VehicleList.styles';

export const VehicleListScreen: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { 
    vehicles, 
    isLoading, 
    onEdit, 
    onDelete, 
    onAdd, 
    onBack 
  } = useVehicleList();
  console.log(vehicles)
  return (
    <ScreenShell
      title={t('vehicleDetails.headerTitle')}
      onBack={onBack}
    >
      <S.Container>
        <S.ScrollContainer>
          <S.ListHeader>
            <Typography variant="title" size="lg" weight="bold">
              Your Garage
            </Typography>
            <Typography variant="body" size="sm" color={theme.colors.on_surface_variant}>
              Manage your vehicles for sharing rides
            </Typography>
          </S.ListHeader>

          {isLoading && vehicles.length === 0 ? (
            <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 40 }} />
          ) : vehicles.length > 0 ? (
            <S.ListContainer>
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  company={vehicle.company}
                  model={vehicle.model}
                  seater={vehicle.seater}
                  color={vehicle.color}
                  type={vehicle.type}
                  plate={vehicle.numberPlate}
                  fullWidth={true}
                  onEdit={() => onEdit(vehicle.id)}
                  onDelete={() => onDelete(vehicle.id)}
                />
              ))}
            </S.ListContainer>
          ) : (
            <S.EmptyState>
              <Icon name="directions-car" size={64} color={theme.colors.outline_variant} />
              <Typography variant="title" size="md" align="center">
                No Vehicles Found
              </Typography>
              <Typography variant="body" size="sm" color={theme.colors.on_surface_variant} align="center">
                Add your first vehicle to start sharing rides with the community.
              </Typography>
            </S.EmptyState>
          )}
        </S.ScrollContainer>

        <S.FloatingButtonContainer>
          <Button 
            variant="primary" 
            onPress={onAdd}
            icon="add"
          >
            Add New Vehicle
          </Button>
        </S.FloatingButtonContainer>
      </S.Container>
    </ScreenShell>
  );
};
