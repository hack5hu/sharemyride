import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Input } from '@/components/atoms/Input';
import { DefaultTheme } from 'styled-components/native';
import { FormikProps } from 'formik';
import { VehicleDetailsState } from '@/screens/Profile/VehicleDetails/types.d';
import * as S from '../VehicleDetailsTemplate.styles';

interface BasicIdentitySectionProps {
  formik: FormikProps<VehicleDetailsState>;
  isLoading: boolean;
  theme: DefaultTheme;
  t: (key: string, params?: Record<string, string | number>) => string;
}

export const BasicIdentitySection: React.FC<BasicIdentitySectionProps> =
  React.memo(({ formik, isLoading, theme, t }) => {
    return (
      <S.CardSection>
        <S.SectionHeader>
          <S.SectionTitleRow>
            <Icon name="badge" size={18} color={theme.colors.primary} />
            <S.SectionTitleText>
              {t('vehicleDetails.basicIdentity')}
            </S.SectionTitleText>
          </S.SectionTitleRow>
        </S.SectionHeader>
        <S.InputGroup>
          <Input
            label={t('vehicleDetails.vehicleCompany')}
            placeholder={t('vehicleDetails.companyPlaceholder')}
            value={formik.values.company}
            onChangeText={formik.handleChange('company')}
            error={formik.touched.company ? formik.errors.company : undefined}
            required={true}
            editable={!isLoading}
          />
          <Input
            label={t('vehicleDetails.carModel')}
            placeholder={t('vehicleDetails.modelPlaceholder')}
            value={formik.values.model}
            onChangeText={formik.handleChange('model')}
            error={formik.touched.model ? formik.errors.model : undefined}
            required={true}
            editable={!isLoading}
          />
        </S.InputGroup>
      </S.CardSection>
    );
  });
