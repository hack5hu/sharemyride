import React from 'react';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { Typography } from '@/components/atoms/Typography';
import { ZyncRideLogo } from '@/components/atoms/ZyncRideLogo';
import * as S from './SplashTemplate.styles';
import { SplashTemplateProps } from './types.d';
import { useSplashAnimations } from './useSplashAnimations';

export const SplashTemplate: React.FC<SplashTemplateProps> = ({
  loadingText,
}) => {
  const { splash } = useLocale();
  const theme = useTheme();
  const anim = useSplashAnimations();

  return (
    <S.Container>
      {/* Floating decorative orbs */}
      <S.GradientOrb
        size={220}
        top={-40}
        right={-60}
        style={{ transform: [{ scale: anim.orbOneScale }] }}
      />
      <S.AccentOrb
        size={180}
        bottom={80}
        left={-50}
        style={{ transform: [{ scale: anim.orbTwoScale }] }}
      />
      <S.GradientOrb
        size={100}
        top={160}
        left={-30}
        style={{ opacity: 0.04, transform: [{ scale: anim.orbTwoScale }] }}
      />

      {/* Central branding */}
      <S.BrandCluster
        style={{
          opacity: anim.logoOpacity,
          transform: [{ scale: anim.logoScale }],
        }}
      >
        <S.LogoRow>
          <ZyncRideLogo width={240} height={80} />
        </S.LogoRow>

        <S.SubtitleRow style={{ opacity: anim.subtitleOpacity }}>
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
      <S.LoaderSection style={{ opacity: anim.loaderOpacity }}>
        <S.PulseRing
          style={{
            transform: [{ scale: anim.pulseScale }],
            opacity: anim.pulseOpacity,
          }}
        />
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
};
