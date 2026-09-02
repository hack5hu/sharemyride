import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { type DefaultTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { type SettingsTranslations } from '@/constants/localization/types';
import * as S from '../SettingsTemplate.styles';

export interface AppearanceSectionProps {
  themeMode: 'light' | 'dark' | 'system';
  toggleTheme: () => void;
  t: SettingsTranslations;
  theme: DefaultTheme;
}

export const AppearanceSection: React.FC<AppearanceSectionProps> = React.memo(
  ({ themeMode, toggleTheme, t, theme }) => {
    const isDark = themeMode === 'dark';

    return (
      <S.Section>
        <S.SectionTitle>{t.appearance}</S.SectionTitle>
        <S.ThemeGrid>
          {/* Light Mode Card */}
          <S.ThemeCard
            isSelected={!isDark}
            onPress={isDark ? toggleTheme : undefined}
            activeOpacity={0.8}
          >
            <S.ThemeCardTop>
              <S.ThemeIconCircle isSelected={!isDark}>
                <Icon
                  name="wb-sunny"
                  size={22}
                  color={!isDark ? theme.colors.on_primary : theme.colors.primary}
                />
              </S.ThemeIconCircle>
              {!isDark && (
                <S.ThemeCheckmark>
                  <Icon
                    name="check"
                    size={14}
                    color={theme.colors.on_primary}
                  />
                </S.ThemeCheckmark>
              )}
            </S.ThemeCardTop>

            <S.ThemeCardBottom>
              <Typography
                variant="title"
                size="sm"
                weight="bold"
                color={!isDark ? 'on_primary' : 'on_surface'}
              >
                {t.lightMode || 'Light Mode'}
              </Typography>
              <Typography
                variant="label"
                size="xs"
                color={!isDark ? 'on_primary' : 'on_surface_variant'}
              >
                {!isDark ? 'Active' : 'Standard'}
              </Typography>
            </S.ThemeCardBottom>
          </S.ThemeCard>

          {/* Dark Mode Card */}
          <S.ThemeCard
            isSelected={isDark}
            onPress={!isDark ? toggleTheme : undefined}
            activeOpacity={0.8}
          >
            <S.ThemeCardTop>
              <S.ThemeIconCircle isSelected={isDark}>
                <Icon
                  name="nights-stay"
                  size={22}
                  color={isDark ? theme.colors.on_primary : theme.colors.on_surface_variant}
                />
              </S.ThemeIconCircle>
              {isDark && (
                <S.ThemeCheckmark>
                  <Icon
                    name="check"
                    size={14}
                    color={theme.colors.on_primary}
                  />
                </S.ThemeCheckmark>
              )}
            </S.ThemeCardTop>

            <S.ThemeCardBottom>
              <Typography
                variant="title"
                size="sm"
                weight="bold"
                color={isDark ? 'on_primary' : 'on_surface'}
              >
                {t.darkModeToggle || 'Dark Mode'}
              </Typography>
              <Typography
                variant="label"
                size="xs"
                color={isDark ? 'on_primary' : 'on_surface_variant'}
              >
                {isDark ? 'Active' : 'Night'}
              </Typography>
            </S.ThemeCardBottom>
          </S.ThemeCard>
        </S.ThemeGrid>
      </S.Section>
    );
  },
);

AppearanceSection.displayName = 'AppearanceSection';

