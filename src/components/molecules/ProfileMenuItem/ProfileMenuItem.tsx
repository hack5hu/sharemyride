import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '../../atoms/Typography';
import { Container, IconBox, Content } from './ProfileMenuItem.styles';

export interface ProfileMenuItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showChevron?: boolean;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showChevron = true,
}) => {
  const theme = useTheme();

  return (
    <Container onPress={onPress} activeOpacity={0.7}>
      <IconBox>
        <Icon name={icon} size={24} color={theme.colors.on_surface_variant} />
      </IconBox>
      <Content>
        <Typography variant="body" weight="bold" color="on_surface">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="label" size="sm" color="on_surface_variant">
            {subtitle}
          </Typography>
        )}
      </Content>
      {showChevron && (
        <Icon
          name="chevron-right"
          size={24}
          color={theme.colors.outline_variant}
        />
      )}
    </Container>
  );
};
