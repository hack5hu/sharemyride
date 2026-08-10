import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DefaultTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { Toggle } from '@/components/atoms/Toggle';
import * as S from '../SettingsTemplate.styles';

export interface AppearanceSectionProps {
  themeMode: 'light' | 'dark' | 'system';
  toggleTheme: () => void;
  t: any;
  theme: DefaultTheme;
}

export const AppearanceSection: React.FC<AppearanceSectionProps> = React.memo(({
  themeMode,
  toggleTheme,
  t,
  theme,
}) => {
  return (
    <S.Section>
      <S.SectionTitle>{t.appearance}</S.SectionTitle>
      <S.ThemeGrid>
        <S.ThemeCard
          isCurrent={themeMode === 'light' || themeMode === 'dark'}
        >
          <Icon name="palette" size={32} color={theme.colors.primary} />
          <S.ThemeInfo>
            <Typography variant="title" size="sm" weight="bold">
              {t.theme}
            </Typography>
            <Typography
              variant="body"
              size="xs"
              color="on_surface_variant"
            >
              {themeMode === 'light' ? t.lightMode : t.darkMode}
            </Typography>
          </S.ThemeInfo>
        </S.ThemeCard>
        <S.ThemeCard>
          <S.ThemeToggleRow>
            <Toggle
              value={themeMode === 'dark'}
              onValueChange={toggleTheme}
            />
          </S.ThemeToggleRow>
          <S.ThemeSwitchLabel>
            <Typography variant="title" size="sm" weight="bold">
              {t.darkModeToggle}
            </Typography>
            <Icon
              name={themeMode === 'dark' ? 'dark-mode' : 'light-mode'}
              size={24}
              color={theme.colors.on_surface_variant}
            />
          </S.ThemeSwitchLabel>
        </S.ThemeCard>
      </S.ThemeGrid>
    </S.Section>
  );
});

AppearanceSection.displayName = 'AppearanceSection';
