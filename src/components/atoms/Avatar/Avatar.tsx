import { 
  StyledAvatar, 
  AvatarImage, 
  PlaceholderContainer, 
  Container, 
  StatusBadge, 
  VerifiedBadge 
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
}) => {
  const theme = useTheme();

  const renderContent = () => {
    if (source) {
      return <AvatarImage source={source} size={size} />;
    }
    
    return (
      <PlaceholderContainer size={size}>
        <Typography variant="title" size="lg" weight="bold">
          {placeholder?.charAt(0).toUpperCase() || 'U'}
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
          <MaterialIcon 
            name="check" 
            size={moderateScale(10)} 
            color="#FFFFFF" 
          />
        </VerifiedBadge>
      )}

      {!isVerified && status !== 'none' && (
        <StatusBadge color={getStatusColor()} size={size} />
      )}
    </Container>
  );
};
