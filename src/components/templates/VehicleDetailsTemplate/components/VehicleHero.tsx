import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { DefaultTheme } from 'styled-components/native';
import * as S from '../VehicleDetailsTemplate.styles';

interface VehicleHeroProps {
  heroTitle: string;
  heroSubtitle: string;
  badgeLabel: string;
  selectedIcon: string;
  theme: DefaultTheme;
}

export const VehicleHero: React.FC<VehicleHeroProps> = React.memo(
  ({ heroTitle, heroSubtitle, badgeLabel, selectedIcon, theme }) => {
    return (
      <S.HeroSection>
        <S.HeroDecorCircle />
        <S.HeroBadge>
          <Icon name="shield" size={14} color={theme.colors.on_primary} />
          <Typography
            variant="label"
            size="xs"
            weight="bold"
            color="on_primary"
          >
            {badgeLabel}
          </Typography>
        </S.HeroBadge>

        <S.HeroContent>
          <S.HeroTextWrapper>
            <Typography
              variant="title"
              size="lg"
              weight="bold"
              color="on_primary"
              numberOfLines={1}
            >
              {heroTitle}
            </Typography>
            <S.HeroSubtitle>
              {heroSubtitle}
            </S.HeroSubtitle>
          </S.HeroTextWrapper>
          <S.HeroIconBox>
            <Icon
              name={selectedIcon}
              size={28}
              color={theme.colors.on_primary}
            />
          </S.HeroIconBox>
        </S.HeroContent>
      </S.HeroSection>
    );
  },
);
