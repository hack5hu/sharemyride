import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { RiderCardProps } from './types';
import * as S from './RiderCard.styles';

export const RiderCard: React.FC<RiderCardProps> = ({ name, info, avatarUrl, onPress }) => {
  const theme = useTheme();

  return (
    <S.Container onPress={onPress}>
      <S.AvatarContainer>
        {avatarUrl ? (
          <S.AvatarImage source={{ uri: avatarUrl }} />
        ) : (
          <Icon name="person" size={24} color={theme.colors.on_primary_fixed_variant} />
        )}
        {onCancel && (
          <S.RemoveButton onPress={onCancel} activeOpacity={0.7}>
            <Icon name="close" size={12} color="white" />
          </S.RemoveButton>
        )}
      </S.AvatarContainer>
      <S.Content>
        <S.Name numberOfLines={1}>{name}</S.Name>
        <S.Info numberOfLines={1}>{info}</S.Info>
      </S.Content>
    </S.Container>
  );
};
