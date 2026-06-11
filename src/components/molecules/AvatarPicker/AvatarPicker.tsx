import React from 'react';
import { ViewStyle, PermissionsAndroid, Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from '../../atoms/Avatar';
import { IconButton } from '../../atoms/IconButton';
import {
  Container,
  EditButtonContainer,
  AvatarWrapper,
  DOBLabel,
  TouchableAvatar,
} from './AvatarPicker.styles';
import { Typography } from '../../atoms/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import { moderateScale } from '@/styles';

export interface AvatarPickerProps {
  uri?: string;
  onImageSelected?: (asset: {
    uri: string;
    name?: string;
    type?: string;
  }) => void;
  style?: ViewStyle;
  disabled?: boolean;
  showAddText?: boolean;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  uri,
  onImageSelected,
  style,
  disabled,
  showAddText,
}) => {
  const { t } = useTranslation();

  const handlePicker = async () => {
    if (disabled) return;
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
      <TouchableAvatar
        onPress={disabled ? undefined : handlePicker}
        disabled={disabled}
        activeOpacity={0.7}
      >
        <AvatarWrapper style={{ opacity: disabled ? 0.6 : 1 }}>
          <Avatar
            source={uri ? { uri } : undefined}
            size="lg"
            iconName={!uri ? 'person' : undefined}
          />
        </AvatarWrapper>

        {!uri && showAddText && (
          <Typography
            variant="label"
            size="lg"
            weight="bold"
            color="primary"
            style={{ marginTop: moderateScale(8) }}
          >
            {t('profileSetup.addPhoto')}
          </Typography>
        )}
      </TouchableAvatar>
    </Container>
  );
};
