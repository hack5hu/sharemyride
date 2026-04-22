import React from 'react';
import { ViewStyle, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from '../../atoms/Avatar';
import { IconButton } from '../../atoms/IconButton';
import { Container, EditButtonContainer, AvatarWrapper, DOBLabel } from './AvatarPicker.styles';
import { Typography } from '../../atoms/Typography';

export interface AvatarPickerProps {
  uri?: string;
  dob?: string;
  onImageSelected?: (asset: { uri: string; name?: string; type?: string }) => void;
  style?: ViewStyle;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  uri,
  dob,
  onImageSelected,
  style,
}) => {
  const handlePicker = async () => {
    if (Platform.OS === 'android') {
      try {
        const apiLevel = parseInt(Platform.Version.toString(), 10);
        
        if (apiLevel >= 33) {
          // Android 13+ requires specific media permissions
          await PermissionsAndroid.request(
            (PermissionsAndroid.PERMISSIONS as any).READ_MEDIA_IMAGES,
          );
        } else {
          // Older Android versions use broader storage permission
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          );
        }
      } catch (err) {
        console.warn('Permission request failed', err);
      }
    }

    // Launch the picker regardless of the permission result.
    // Modern Android system photo pickers often don't require app-level permissions.
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets[0].uri) {
      const asset = result.assets[0];
      if (asset.uri) {
        onImageSelected?.({
          uri: asset.uri,
          name: asset.fileName,
          type: asset.type,
        });
      }
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

