import React from 'react';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { Typography } from '@/components/atoms/Typography';
import { ZyncRideLogo } from '@/components/atoms/ZyncRideLogo';
import * as S from './SplashTemplate.styles';
import { SplashTemplateProps } from './types.d';
import { useSplashAnimations } from './useSplashAnimations';

export const SplashTemplate: React.FC<SplashTemplateProps> = React.memo(({
  loadingText,
}) => {
  const { splash } = useLocale();
  const theme = useTheme();
  const anim = useSplashAnimations();

  const orbOneStyle = React.useMemo(() => ({
    transform: [{ scale: anim.orbOneScale }],
  }), [anim.orbOneScale]);

  const orbTwoStyle = React.useMemo(() => ({
    transform: [{ scale: anim.orbTwoScale }],
  }), [anim.orbTwoScale]);

  const orbThreeStyle = React.useMemo(() => ({
    opacity: 0.04,
    transform: [{ scale: anim.orbTwoScale }],
  }), [anim.orbTwoScale]);

  const brandClusterStyle = React.useMemo(() => ({
    opacity: anim.logoOpacity,
    transform: [{ scale: anim.logoScale }],
  }), [anim.logoOpacity, anim.logoScale]);

  const subtitleStyle = React.useMemo(() => ({
    opacity: anim.subtitleOpacity,
  }), [anim.subtitleOpacity]);

  const loaderStyle = React.useMemo(() => ({
    opacity: anim.loaderOpacity,
  }), [anim.loaderOpacity]);

  const pulseStyle = React.useMemo(() => ({
    transform: [{ scale: anim.pulseScale }],
    opacity: anim.pulseOpacity,
  }), [anim.pulseScale, anim.pulseOpacity]);

  return (
    <S.Container>
      {/* Floating decorative orbs */}
      <S.GradientOrb
        size={220}
        top={-40}
        right={-60}
        style={orbOneStyle}
      />
      <S.AccentOrb
        size={180}
        bottom={80}
        left={-50}
        style={orbTwoStyle}
      />
      <S.GradientOrb
        size={100}
        top={160}
        left={-30}
        style={orbThreeStyle}
      />

      {/* Central branding */}
      <S.BrandCluster style={brandClusterStyle}>
        <S.LogoRow>
          <ZyncRideLogo width={240} height={80} />
        </S.LogoRow>

        <S.SubtitleRow style={subtitleStyle}>
          <Typography
            variant="body"
            size="sm"
            weight="medium"
            color={theme.colors.on_surface_variant}
          >
            {splash.subtitle}
          </Typography>
        </S.SubtitleRow>
      </S.BrandCluster>

      {/* Bottom loader */}
      <S.LoaderSection style={loaderStyle}>
        <S.PulseRing style={pulseStyle} />
        <Typography
          variant="label"
          size="xs"
          weight="medium"
          color={theme.colors.on_surface_variant}
        >
          {loadingText || splash.loadingText}
        </Typography>
      </S.LoaderSection>
    </S.Container>
  );
});

SplashTemplate.displayName = 'SplashTemplate';
