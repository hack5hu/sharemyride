import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '../../atoms/Typography';
import * as S from './ProfileMenuItem.styles';

export interface ProfileMenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
  rightBadge?: React.ReactNode;
  iconBgColor?: string;
  iconColor?: string;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
  rightBadge,
  iconBgColor,
  iconColor,
}) => {
  const theme = useTheme();

  return (
    <S.Container onPress={onPress} activeOpacity={0.7}>
      <S.IconBox bgcolor={iconBgColor}>
        <Icon name={icon} size={22} color={iconColor || theme.colors.primary} />
      </S.IconBox>
      <S.Content>
        <Typography variant="body" size="md" weight="bold" color="on_surface">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="label" size="xs" color="on_surface_variant">
            {subtitle}
          </Typography>
        )}
      </S.Content>
      {rightBadge}
      {showChevron && (
        <S.ChevronCircle>
          <Icon
            name="chevron-right"
            size={18}
            color={theme.colors.on_surface_variant}
          />
        </S.ChevronCircle>
      )}
    </S.Container>
  );
};

