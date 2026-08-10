import React from 'react';
import { ViewStyle } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Avatar } from '@/components/atoms/Avatar';
import { requestPhotoPermission } from '@/utils/permissionUtils';

import {
  Container,
  AvatarWrapper,
  TouchableAvatar,
  AddPhotoText,
} from './AvatarPicker.styles';
import { useTranslation } from '@/hooks/useTranslation';

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
    await requestPhotoPermission();

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
        <AvatarWrapper disabled={disabled}>
          <Avatar
            source={uri ? { uri } : undefined}
            size="lg"
            iconName={!uri ? 'person' : undefined}
          />
        </AvatarWrapper>

        {!uri && showAddText && (
          <AddPhotoText variant="label" size="lg" weight="bold" color="primary">
            {t('profileSetup.addPhoto')}
          </AddPhotoText>
        )}
      </TouchableAvatar>
    </Container>
  );
};
