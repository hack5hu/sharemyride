import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { VehicleTypeCard } from '@/components/molecules/VehicleTypeCard';
import { ColorChip } from '@/components/atoms/ColorChip';
import { useTranslation } from '@/hooks/useTranslation';
import { useVehicleDetails } from './useVehicleDetails';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './VehicleDetails.styles';
import { LabelText } from '@/components/atoms/Input/Input.styles';

export const VehicleDetailsScreen: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { formik, isLoading, carColors, setSeater, setColor, goBack } = useVehicleDetails();

  return (
    <ScreenShell
      title={t('vehicleDetails.headerTitle')}
      onBack={goBack}
    >
      <S.ScrollContainer>
        <S.HeroSection>
          <S.HeroImage
            source={{ uri: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop' }}
            resizeMode="cover"
          />
          <S.HeroTint />
          <S.HeroContent>
            <S.IconBox>
              <Icon name="directions-car" size={32} color={theme.colors.on_primary} />
            </S.IconBox>
            <S.HeroTextWrapper>
              <Typography variant="title" size="lg" weight="bold" color="on_primary" numberOfLines={1} adjustsFontSizeToFit>
                {t('vehicleDetails.heroTitle')}
              </Typography>
              <S.HeroSubtitle>
                {t('vehicleDetails.heroSubtitle')}
              </S.HeroSubtitle>
            </S.HeroTextWrapper>
          </S.HeroContent>
        </S.HeroSection>

        <S.FormWrapper>
          <S.CardSection>
            <S.SectionHeader>
              <Icon name="info" size={18} color={theme.colors.primary} />
              <S.SectionTitleText>
                {t('vehicleDetails.basicIdentity')}
              </S.SectionTitleText>
            </S.SectionHeader>
            <S.InputGroup>
              <Input
                label={t('vehicleDetails.vehicleCompany')}
                placeholder={t('vehicleDetails.companyPlaceholder')}
                value={formik.values.company}
                onChangeText={formik.handleChange('company')}
                error={formik.touched.company ? formik.errors.company : undefined}
              />
              <Input
                label={t('vehicleDetails.carModel')}
                placeholder={t('vehicleDetails.modelPlaceholder')}
                value={formik.values.model}
                onChangeText={formik.handleChange('model')}
                error={formik.touched.model ? formik.errors.model : undefined}
              />
            </S.InputGroup>
          </S.CardSection>

          <S.CardSection>
            <S.SectionHeader>
              <Icon name="settings" size={18} color={theme.colors.primary} />
              <S.SectionTitleText>
                {t('vehicleDetails.technicalSpecs')}
              </S.SectionTitleText>
            </S.SectionHeader>
            <S.PlateInput
              label={t('vehicleDetails.numberPlate')}
              placeholder={t('vehicleDetails.platePlaceholder')}
              value={formik.values.numberPlate}
              onChangeText={(text) => formik.setFieldValue('numberPlate', text.toUpperCase())}
              error={formik.touched.numberPlate ? formik.errors.numberPlate : undefined}
            />

            <S.ColorGroup>
              <LabelText>
                {t('vehicleDetails.color')}
              </LabelText>
              <S.ColorScroll horizontal showsHorizontalScrollIndicator={false}>
                <S.ColorRow>
                  {carColors.map(color => (
                    <ColorChip
                      key={color.value}
                      color={color.value}
                      selected={formik.values.color === color.value}
                      onPress={() => setColor(color.value)}
                      label={color.label}
                    />
                  ))}
                </S.ColorRow>
              </S.ColorScroll>
              {formik.touched.color && formik.errors.color && (
                <Typography variant="label" size="sm" color={theme.colors.error}>
                  {formik.errors.color || ''}
                </Typography>
              )}
            </S.ColorGroup>
          </S.CardSection>

          <S.CardSection>
            <S.SectionHeader>
              <Icon name="event-seat" size={18} color={theme.colors.primary} />
              <S.SectionTitleText>
                {t('vehicleDetails.capacity')}
              </S.SectionTitleText>
            </S.SectionHeader>
            <LabelText>
              {t('vehicleDetails.seaterCount')}
            </LabelText>
            <S.CapacityRow>
              <VehicleTypeCard
                icon="person"
                label={t('vehicleDetails.seater5')}
                selected={formik.values.seater === '5'}
                onPress={() => setSeater('5')}
              />
              <VehicleTypeCard
                icon="groups"
                label={t('vehicleDetails.seater7')}
                selected={formik.values.seater === '7'}
                onPress={() => setSeater('7')}
              />
            </S.CapacityRow>
            {formik.touched.seater && formik.errors.seater && (
              <S.CapacityError>
                {formik.errors.seater}
              </S.CapacityError>
            )}
          </S.CardSection>
        </S.FormWrapper>

       
      </S.ScrollContainer>
      <S.BottomAction>
        <Button
          onPress={formik.handleSubmit as any}
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
