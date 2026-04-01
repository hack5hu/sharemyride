import React from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
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
import { VehicleType } from './types';

import {
  Container,
  HeroSection,
  HeroImage,
  HeroOverlay,
  HeroContent,
  IconBox,
  FormWrapper,
  CardSection,
  SectionHeader,
  ColorScroll,
  ColorRow,
  BottomAction,
} from './VehicleDetails.styles';



export const VehicleDetailsScreen: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { formik, setVehicleType, setColor, goBack } = useVehicleDetails();


  const vehicleTypes: { type: VehicleType; icon: string }[] = [
    { type: 'sedan', icon: 'directions-car' },
    { type: 'suv', icon: 'commute' },
    { type: 'hatchback', icon: 'drive-eta' },
    { type: 'bike', icon: 'motorcycle' },
  ];

  const carColors = [
    { label: 'White', value: '#FFFFFF' },
    { label: 'Black', value: '#000000' },
    { label: 'Silver', value: '#C0C0C0' },
    { label: 'Grey', value: '#808080' },
    { label: 'Red', value: '#FF0000' },
    { label: 'Blue', value: '#0000FF' },
    { label: 'Green', value: '#008000' },
  ];


  return (
    <Container>
      <SafeAreaView style={{ backgroundColor: theme.colors.surface }}>
        <View style={{ height: 64, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
          <IconButton icon="arrow-back" variant="surface" onPress={goBack} />
          <Typography variant="title" size="md" weight="bold" color="primary" style={{ marginLeft: 16 }}>
            {t('vehicleDetails.headerTitle')}
          </Typography>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        <HeroSection>
          <HeroImage 
            source={{ uri: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop' }} 
            resizeMode="cover"
          />
          <View style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: theme.colors.primary + '33' // 20% primary tint for better visibility
          }} />
          <HeroContent>
            <IconBox>
              <Icon name="directions-car" size={32} color={theme.colors.on_primary} />
            </IconBox>
            <View style={{ flex: 1 }}>
              <Typography variant="title" size="lg" weight="bold" color="on_primary" numberOfLines={1} adjustsFontSizeToFit>
                {t('vehicleDetails.heroTitle')}
              </Typography>
              <Typography variant="body" size="sm" color="on_primary" style={{ opacity: 0.9, marginTop: 4 }}>
                {t('vehicleDetails.heroSubtitle')}
              </Typography>
            </View>
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
            <View style={{ gap: 16 }}>
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
            </View>
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
              onChangeText={formik.handleChange('numberPlate')}
              error={formik.touched.numberPlate ? formik.errors.numberPlate : undefined}
              style={{ fontFamily: 'monospace', letterSpacing: 4, fontWeight: 'bold' }}
            />
            
            <View style={{ marginTop: 24 }}>
              <Typography variant="label" size="sm" weight="bold" color="on_surface_variant" style={{ marginBottom: 12, marginLeft: 4 }}>
                {t('vehicleDetails.vehicleType')}
              </Typography>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {vehicleTypes.map(item => (
                  <VehicleTypeCard 
                    key={item.type}
                    icon={item.icon}
                    label={t(`vehicleDetails.${item.type}`)}
                    selected={formik.values.type === item.type}
                    onPress={() => setVehicleType(item.type)}
                  />
                ))}
              </View>

            </View>
          </CardSection>

          <CardSection>
            <SectionHeader>
              <Icon name="palette" size={18} color={theme.colors.primary} />
              <Typography variant="label" size="sm" weight="bold" color="primary" style={{ letterSpacing: 2, textTransform: 'uppercase' }}>
                {t('vehicleDetails.appearance')}
              </Typography>
            </SectionHeader>
            <View style={{ gap: 16 }}>
              <Input 
                label={t('vehicleDetails.manufacturingYear')} 
                value={formik.values.year}
                onChangeText={formik.handleChange('year')}
                error={formik.touched.year ? formik.errors.year : undefined}
                placeholder="2024"
              />
              <View style={{ marginTop: 8 }}>
                <Typography variant="label" size="sm" weight="bold" color="on_surface_variant" style={{ marginLeft: 4 }}>
                  {t('vehicleDetails.color')}
                </Typography>
                <ColorScroll horizontal showsHorizontalScrollIndicator={false}>
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
                  <Typography variant="label" size="sm" color={theme.colors.error} style={{ marginTop: 4, marginLeft: 4 }}>
                    {formik.errors.color || ''}
                  </Typography>
                )}
              </View>

            </View>
          </CardSection>
        </FormWrapper>

        <BottomAction>
          <Button 
            onPress={formik.handleSubmit as any}
            variant="primary"
            icon="save"
            style={{ height: 56, borderRadius: 16 }}
          >
            {t('vehicleDetails.saveVehicle')}
          </Button>
        </BottomAction>
      </ScrollView>

    </Container>
  );
};
