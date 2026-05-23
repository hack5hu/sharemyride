import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale } from '@/styles';
import * as S from './SplashTemplate.styles';
import { SplashTemplateProps } from './types.d';

export const SplashTemplate: React.FC<SplashTemplateProps> = ({
  appName,
  subtitle,
  loadingText,
}) => {
  const { splash } = useLocale();
  const theme = useTheme();

  return (
    <S.Container>
      <S.AbstractCircleOne />
      <S.AbstractCircleTwo />

      <S.CenterSection>
        <S.LogoContainer>
          <Icon
            name="directions-car"
            size={moderateScale(48)}
            color={theme.colors.on_primary}
          />
        </S.LogoContainer>

        <S.BrandWrapper>
          <Typography variant="display" size="lg" weight="bold" color={theme.colors.on_surface}>
            {appName || splash.appName}
          </Typography>
          <Typography
            variant="label"
            size="sm"
            weight="semibold"
            color={theme.colors.on_surface_variant}
            style={{ letterSpacing: 2, textTransform: 'uppercase', marginTop: 4 }}
          >
            {subtitle || splash.subtitle}
          </Typography>
        </S.BrandWrapper>

        <S.LoaderSection>
          <S.LoadingIndicator />
          <Typography variant="body" size="sm" weight="medium" color={theme.colors.on_surface_variant}>
            {loadingText || splash.loadingText}
          </Typography>
        </S.LoaderSection>
      </S.CenterSection>

      <S.FooterSection>
        <S.NetworkBadge>
          <S.NetworkDot />
          <Typography variant="label" size="xs" weight="bold" color={theme.colors.primary}>
            SYSTEM OPTIMIZED
          </Typography>
        </S.NetworkBadge>
      </S.FooterSection>
    </S.Container>
  );
};
