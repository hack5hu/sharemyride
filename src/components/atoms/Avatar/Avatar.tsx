import React from 'react';
import { ImageProps } from 'react-native';
import { StyledAvatar, AvatarImage, PlaceholderContainer } from './Avatar.styles';
import { AvatarProps } from './types';
import { Typography } from '../Typography';

export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 'md',
  border = true,
  placeholder,
  style,
}) => {
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

  return (
    <StyledAvatar size={size} border={border} style={style}>
      {renderContent()}
    </StyledAvatar>
  );
};
