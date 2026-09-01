import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { DefaultTheme } from 'styled-components/native';
import * as S from '../VehicleDetailsTemplate.styles';

interface CapacitySectionProps {
  seater: '5' | '7';
  setSeater: (count: '5' | '7') => void;
  error?: string;
  touched?: boolean;
  isLoading: boolean;
  theme: DefaultTheme;
  t: (key: string, params?: Record<string, string | number>) => string;
}

export const CapacitySection: React.FC<CapacitySectionProps> = React.memo(
  ({ seater, setSeater, error, touched, isLoading, theme, t }) => {
    return (
      <S.CardSection>
        <S.SectionHeader>
          <S.SectionTitleRow>
            <Icon
              name="airline-seat-recline-extra"
              size={18}
              color={theme.colors.primary}
            />
            <S.SectionTitleText>
              {t('vehicleDetails.capacity')}
            </S.SectionTitleText>
          </S.SectionTitleRow>
          <S.ActiveValuePill>
            <Typography
              variant="label"
              size="xs"
              weight="bold"
              color="primary"
            >
              {seater === '5'
                ? t('vehicleDetails.seater5')
                : t('vehicleDetails.seater7')}
            </Typography>
          </S.ActiveValuePill>
        </S.SectionHeader>

        <S.CapacityRow>
          <S.CapacityCard
            selected={seater === '5'}
            onPress={isLoading ? () => {} : () => setSeater('5')}
          >
            <S.CapacityCardTop>
              <S.CapacityIconCircle selected={seater === '5'}>
                <Icon
                  name="person"
                  size={20}
                  color={
                    seater === '5'
                      ? theme.colors.on_primary
                      : theme.colors.on_surface_variant
                  }
                />
              </S.CapacityIconCircle>
              {seater === '5' && (
                <S.CapacityCheckmark>
                  <Icon
                    name="check"
                    size={14}
                    color={theme.colors.on_primary}
                  />
                </S.CapacityCheckmark>
              )}
            </S.CapacityCardTop>
            <S.CapacityCardBottom>
              <Typography
                variant="title"
                size="sm"
                weight="bold"
                color={seater === '5' ? 'on_primary' : 'on_surface'}
              >
                {t('vehicleDetails.seater5')}
              </Typography>
              <S.CapacitySubtitle selected={seater === '5'}>
                4 + 1 Seating
              </S.CapacitySubtitle>
            </S.CapacityCardBottom>
          </S.CapacityCard>

          <S.CapacityCard
            selected={seater === '7'}
            onPress={isLoading ? () => {} : () => setSeater('7')}
          >
            <S.CapacityCardTop>
              <S.CapacityIconCircle selected={seater === '7'}>
                <Icon
                  name="groups"
                  size={20}
                  color={
                    seater === '7'
                      ? theme.colors.on_primary
                      : theme.colors.on_surface_variant
                  }
                />
              </S.CapacityIconCircle>
              {seater === '7' && (
                <S.CapacityCheckmark>
                  <Icon
                    name="check"
                    size={14}
                    color={theme.colors.on_primary}
                  />
                </S.CapacityCheckmark>
              )}
            </S.CapacityCardTop>
            <S.CapacityCardBottom>
              <Typography
                variant="title"
                size="sm"
                weight="bold"
                color={seater === '7' ? 'on_primary' : 'on_surface'}
              >
                {t('vehicleDetails.seater7')}
              </Typography>
              <S.CapacitySubtitle selected={seater === '7'}>
                6 + 1 Seating
              </S.CapacitySubtitle>
            </S.CapacityCardBottom>
          </S.CapacityCard>
        </S.CapacityRow>
        {touched && error && (
          <S.SectionError>{error}</S.SectionError>
        )}
      </S.CardSection>
    );
  },
);
