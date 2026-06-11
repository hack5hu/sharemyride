import {
  StyledAvatar,
  AvatarImage,
  PlaceholderContainer,
  Container,
  StatusBadge,
  VerifiedBadge,
} from './Avatar.styles';
import { AvatarProps } from './types';
import { Typography } from '../Typography';
import { useTheme } from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { moderateScale } from '@/styles';

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 'md',
  border = true,
  placeholder,
  status = 'none',
  isVerified = false,
  style,
  iconName,
}) => {
  const theme = useTheme();

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return moderateScale(20);
      case 'lg':
        return moderateScale(40);
      case 'xl':
        return moderateScale(60);
      default:
        return moderateScale(32);
    }
  };

  const renderContent = () => {
    const hasSource =
      source && (typeof source === 'number' || (source as any).uri);

    if (hasSource) {
      return <AvatarImage source={source} size={size} />;
    }

    if (iconName) {
      return (
        <PlaceholderContainer size={size}>
          <MaterialIcon
            name={iconName}
            size={getIconSize()}
            color={theme.colors.primary}
          />
        </PlaceholderContainer>
      );
    }

    const getInitials = (name?: string) => {
      if (!name) return 'U';
      const parts = name.trim().split(' ');
      if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
      return (
        parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
      ).toUpperCase();
    };

    return (
      <PlaceholderContainer size={size}>
        <Typography
          variant="title"
          size="lg"
          weight="bold"
          color={theme.colors.on_surface_variant}
        >
          {getInitials(placeholder)}
        </Typography>
      </PlaceholderContainer>
    );
  };

  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return theme.colors.primary;
      case 'offline':
        return theme.colors.outline;
      default:
        return 'transparent';
    }
  };

  return (
    <Container size={size} style={style}>
      <StyledAvatar size={size} border={border}>
        {renderContent()}
      </StyledAvatar>

      {isVerified && (
        <VerifiedBadge size={size}>
          <MaterialIcon name="check" size={moderateScale(10)} color="#FFFFFF" />
        </VerifiedBadge>
      )}

      {!isVerified && status !== 'none' && (
        <StatusBadge color={getStatusColor()} size={size} />
      )}
    </Container>
  );
};
