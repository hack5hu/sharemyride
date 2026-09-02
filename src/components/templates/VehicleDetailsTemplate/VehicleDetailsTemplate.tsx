import React from 'react';
import { Button } from '@/components/atoms/Button';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { BasicIdentitySection } from './components/BasicIdentitySection';
import { CapacitySection } from './components/CapacitySection';
import { ColorSection } from './components/ColorSection';
import { VehicleHero } from './components/VehicleHero';
import { VehicleTypeSection } from './components/VehicleTypeSection';
import { type VehicleDetailsTemplateProps } from './types.d';
import * as S from './VehicleDetailsTemplate.styles';

export const VehicleDetailsTemplate: React.FC<VehicleDetailsTemplateProps> = ({
  formik,
  isLoading,
  vehicleTypes,
  carColors,
  setVehicleType,
  setSeater,
  setColor,
  goBack,
  t,
  theme,
}) => {
  const selectedTypeObj = vehicleTypes.find(
    v => v.type === formik.values.type,
  );

  return (
    <ScreenShell title={t('vehicleDetails.headerTitle')} onBack={goBack}>
      <S.ScrollContainer>
        <VehicleHero
          heroTitle={t('vehicleDetails.heroTitle')}
          heroSubtitle={t('vehicleDetails.heroSubtitle')}
          badgeLabel={t('vehicleDetails.basicIdentity')}
          selectedIcon={selectedTypeObj?.icon || 'directions-car'}
          theme={theme}
        />

        <S.FormWrapper>
          <BasicIdentitySection
            formik={formik}
            isLoading={isLoading}
            theme={theme}
            t={t}
          />

          <VehicleTypeSection
            vehicleTypes={vehicleTypes}
            selectedType={formik.values.type}
            setVehicleType={setVehicleType}
            isLoading={isLoading}
            theme={theme}
            t={t}
          />

          <ColorSection
            carColors={carColors}
            selectedColor={formik.values.color}
            setColor={setColor}
            error={formik.errors.color}
            touched={formik.touched.color}
            isLoading={isLoading}
            theme={theme}
            t={t}
          />

          <CapacitySection
            seater={formik.values.seater}
            setSeater={setSeater}
            error={formik.errors.seater}
            touched={formik.touched.seater}
            isLoading={isLoading}
            theme={theme}
            t={t}
          />
        </S.FormWrapper>
      </S.ScrollContainer>

      <S.BottomAction>
        <Button
          onPress={formik.handleSubmit as () => void}
          variant="primary"
          icon="save"
          loading={isLoading}
        >
          {t('vehicleDetails.saveVehicle')}
        </Button>
      </S.BottomAction>
    </ScreenShell>
  );
};


