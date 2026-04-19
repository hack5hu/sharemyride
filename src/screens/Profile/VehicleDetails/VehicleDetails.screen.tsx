import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { IconButton } from '@/components/atoms/IconButton';
import { VehicleTypeCard } from '@/components/molecules/VehicleTypeCard';
import { ColorChip } from '@/components/atoms/ColorChip';
import { useTranslation } from '@/hooks/useTranslation';
import { useVehicleDetails } from './useVehicleDetails';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import {
  ScrollContainer,
  HeroSection,
  HeroImage,
  HeroTint,
  HeroContent,
  IconBox,
  FormWrapper,
  CardSection,
  SectionHeader,
  ColorScroll,
  ColorRow,
  BottomAction,
} from './VehicleDetails.styles';
import { LabelText } from '@/components/atoms/Input/Input.styles';
import { View } from 'react-native';
import { moderateScale, verticalScale } from '@/styles';

export const VehicleDetailsScreen: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { formik, isLoading, vehicleTypes, carColors, setVehicleType, setSeater, setColor, goBack } = useVehicleDetails();

  return (
    <ScreenShell
      title={t('vehicleDetails.headerTitle')}
      onBack={goBack}
    >
      <ScrollContainer>
        <HeroSection>
          <HeroImage
            source={{ uri: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop' }}
            resizeMode="cover"
          />
          <HeroTint />
          <HeroContent>
            <IconBox>
              <Icon name="directions-car" size={32} color={theme.colors.on_primary} />
            </IconBox>
            <FormWrapper style={{ flex: 1, padding: 0 }}>
              <Typography variant="title" size="lg" weight="bold" color="on_primary" numberOfLines={1} adjustsFontSizeToFit>
                {t('vehicleDetails.heroTitle')}
              </Typography>
              <Typography variant="body" size="sm" color="on_primary" style={{ opacity: 0.9, marginTop: 4 }}>
                {t('vehicleDetails.heroSubtitle')}
              </Typography>
            </FormWrapper>
          </HeroContent>
        </HeroSection>

        <FormWrapper>
          <CardSection>
            <SectionHeader>
              <Icon name="info" size={18} color={theme.colors.primary} />
              <Typography variant="label" size="sm" weight="bold" color="primary" style={{ letterSpacing: 2, textTransform: 'uppercase' }}>
                {t('vehicleDetails.basicIdentity')}
              </Typography>
            </SectionHeader>
            <FormWrapper style={{ padding: 0, gap: 16 }}>
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
            </FormWrapper>
          </CardSection>

          <CardSection>
            <SectionHeader>
              <Icon name="settings" size={18} color={theme.colors.primary} />
              <Typography variant="label" size="sm" weight="bold" color="primary" style={{ letterSpacing: 2, textTransform: 'uppercase' }}>
                {t('vehicleDetails.technicalSpecs')}
              </Typography>
            </SectionHeader>
            <Input
              label={t('vehicleDetails.numberPlate')}
              placeholder={t('vehicleDetails.platePlaceholder')}
              value={formik.values.numberPlate}
              onChangeText={(text) => formik.setFieldValue('numberPlate', text.toUpperCase())}
              autoCapitalize="characters"
              error={formik.touched.numberPlate ? formik.errors.numberPlate : undefined}
              style={{ fontFamily: 'monospace', letterSpacing: 4, fontWeight: 'bold' }}
            />

            <View style={{ gap: moderateScale(8), marginTop: verticalScale(16)}}>
              <LabelText>
                {t('vehicleDetails.color')}
              </LabelText>
              <ColorScroll horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 0,}}>
                <ColorRow>
                  {carColors.map(color => (
                    <ColorChip
                      key={color.value}
                      color={color.value}
                      selected={formik.values.color === color.value}
                      onPress={() => setColor(color.value)}
                      label={color.label}
                    />
                  ))}
                </ColorRow>
              </ColorScroll>
              {formik.touched.color && formik.errors.color && (
                <Typography variant="label" size="sm" color={theme.colors.error}>
                  {formik.errors.color || ''}
                </Typography>
              )}
            </View>
          </CardSection>

          <CardSection>
            <SectionHeader>
              <Icon name="event-seat" size={18} color={theme.colors.primary} />
              <Typography variant="label" size="sm" weight="bold" color="primary" style={{ letterSpacing: 2, textTransform: 'uppercase' }}>
                {t('vehicleDetails.capacity')}
              </Typography>
            </SectionHeader>
            <LabelText>
              {t('vehicleDetails.seaterCount')}
            </LabelText>
            <ColorRow style={{ gap: 12, paddingTop: 10 }}>
              <VehicleTypeCard
                icon="person"
                label="5 Seater"
                selected={formik.values.seater === '5'}
                onPress={() => setSeater('5')}
              />
              <VehicleTypeCard
                icon="groups"
                label="7 Seater"
                selected={formik.values.seater === '7'}
                onPress={() => setSeater('7')}
              />
            </ColorRow>
            {formik.touched.seater && formik.errors.seater && (
              <Typography variant="label" size="sm" color={theme.colors.error} style={{ marginLeft: 4 }}>
                {formik.errors.seater}
              </Typography>
            )}
          </CardSection>
        </FormWrapper>

        <BottomAction>
          <Button
            onPress={formik.handleSubmit as any}
            variant="primary"
            icon="save"
            loading={isLoading}
            style={{ height: 56, borderRadius: 16 }}
          >
            {t('vehicleDetails.saveVehicle')}
          </Button>
        </BottomAction>
      </ScrollContainer>
    </ScreenShell>
  );
};

