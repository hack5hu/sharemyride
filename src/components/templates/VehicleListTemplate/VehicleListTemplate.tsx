import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { VehicleCard } from '@/components/molecules/VehicleCard/VehicleCard';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { VehicleListTemplateProps } from './types.d';
import * as S from './VehicleListTemplate.styles';

export const VehicleListTemplate: React.FC<VehicleListTemplateProps> = ({
  vehicles,
  isLoading,
  onEdit,
  onDelete,
  onAdd,
  onBack,
  isDeleteModalVisible,
  setIsDeleteModalVisible,
  handleConfirmDelete,
  t,
  theme,
}) => {
  return (
    <>
      <ScreenShell title={t('vehicleDetails.headerTitle')} onBack={onBack}>
        <S.Container>
          <S.ScrollContainer>
            <S.GarageBanner>
              <S.BannerDecorCircle />
              <S.BannerTopRow>
                <S.BannerBadge>
                  <Icon
                    name="garage"
                    size={14}
                    color={theme.colors.on_primary}
                  />
                  <Typography
                    variant="label"
                    size="xs"
                    weight="bold"
                    color="on_primary"
                  >
                    {t('vehicleDetails.garageTitle')}
                  </Typography>
                </S.BannerBadge>

                {vehicles.length > 0 && (
                  <S.CountPill>
                    <Typography
                      variant="label"
                      size="xs"
                      weight="bold"
                      color="on_primary"
                    >
                      {vehicles.length}{' '}
                      {vehicles.length === 1
                        ? t('vehicleDetails.car')
                        : `${t('vehicleDetails.car')}s`}
                    </Typography>
                  </S.CountPill>
                )}
              </S.BannerTopRow>

              <S.BannerBottomContent>
                <Typography
                  variant="title"
                  size="md"
                  weight="bold"
                  color="on_primary"
                >
                  {t('vehicleDetails.garageTitle')}
                </Typography>
                <S.BannerSubtitle>
                  {t('vehicleDetails.garageSubtitle')}
                </S.BannerSubtitle>
              </S.BannerBottomContent>
            </S.GarageBanner>

            {isLoading && vehicles.length === 0 ? (
              <S.Loader size="large" color={theme.colors.primary} />
            ) : vehicles.length > 0 ? (
              <S.ListContainer>
                {vehicles.map(vehicle => (
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
                <S.EmptyIconCircle>
                  <Icon
                    name="directions-car"
                    size={40}
                    color={theme.colors.primary}
                  />
                </S.EmptyIconCircle>
                <Typography variant="title" size="md" weight="bold" align="center">
                  {t('vehicleDetails.noVehiclesTitle')}
                </Typography>
                <Typography
                  variant="body"
                  size="sm"
                  color={theme.colors.on_surface_variant}
                  align="center"
                >
                  {t('vehicleDetails.noVehiclesSubtitle')}
                </Typography>
              </S.EmptyState>
            )}
          </S.ScrollContainer>

          <S.FloatingButtonContainer>
            <Button variant="primary" onPress={onAdd} icon="add">
              {t('vehicleDetails.addNewVehicle')}
            </Button>
          </S.FloatingButtonContainer>
        </S.Container>
      </ScreenShell>

      {isDeleteModalVisible && (
        <ConfirmationModal
          isVisible={isDeleteModalVisible}
          onClose={() => setIsDeleteModalVisible(false)}
          onConfirm={handleConfirmDelete}
          title={t('vehicleDetails.deleteVehicleTitle')}
          message={t('vehicleDetails.deleteVehicleConfirmMsg')}
          confirmLabel={t('vehicleDetails.deleteVehicleTitle')}
          type="danger"
        />
      )}
    </>
  );
};

