import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { useLocale } from '@/constants/localization';
import { DriverSectionProps } from './types';
import * as S from './DriverSection.styles';

export const DriverSection: React.FC<DriverSectionProps> = ({ 
  name, 
  rating, 
  carInfo, 
  avatarUrl, 
  onChatPress 
}) => {
  const theme = useTheme();
  const { rideDetails } = useLocale();

  return (
    <S.Container>
      <S.InfoContainer>
        <S.AvatarWrapper>
          <S.AvatarImage source={{ uri: avatarUrl }} />
          <S.VerifiedBadge>
            <Icon name="verified" size={10} color="white" />
          </S.VerifiedBadge>
        </S.AvatarWrapper>
        <S.TextContent>
          <S.Name>{name}</S.Name>
          <S.MetaRow>
            <S.RatingBadge>
              <Icon name="star" size={12} color={theme.colors.on_secondary_container} />
              <S.RatingText>{rating.toFixed(1)}</S.RatingText>
            </S.RatingBadge>
            <S.CarInfo numberOfLines={1}>{carInfo}</S.CarInfo>
          </S.MetaRow>
        </S.TextContent>
      </S.InfoContainer>
      
      <S.ChatButton onPress={onChatPress} activeOpacity={0.8}>
        <Icon name="chat" size={18} color={theme.colors.on_primary} />
        <S.ChatText>{rideDetails.chat}</S.ChatText>
      </S.ChatButton>
    </S.Container>
  );
};
