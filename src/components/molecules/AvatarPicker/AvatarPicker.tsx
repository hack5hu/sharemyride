import React from 'react';
import { ViewStyle } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from '../../atoms/Avatar';
import { IconButton } from '../../atoms/IconButton';
import { Container, EditButtonContainer, AvatarWrapper, DOBLabel } from './AvatarPicker.styles';
import { Typography } from '../../atoms/Typography';

export interface AvatarPickerProps {
  uri?: string;
  dob?: string;
  onImageSelected?: (uri: string) => void;
  style?: ViewStyle;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  uri,
  dob,
  onImageSelected,
  style,
}) => {
  const handlePicker = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets[0].uri) {
      onImageSelected?.(result.assets[0].uri);
    }
  };

  return (
    <Container style={style}>
      <AvatarWrapper>
        <Avatar source={uri ? { uri } : undefined} size="lg" />
        <EditButtonContainer>
          <IconButton
            icon="photo-camera"
            size="sm"
            variant="primary"
            onPress={handlePicker}
          />
        </EditButtonContainer>
      </AvatarWrapper>
      
      {dob && dob.length >= 10 && (
        <DOBLabel>
          <Typography variant="label" size="sm" weight="bold" color="primary">
            {dob}
          </Typography>
        </DOBLabel>
      )}
    </Container>
  );
};

