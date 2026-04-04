import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { StopItemProps } from './types';
import * as S from './StopItem.styles';

export const StopItem: React.FC<StopItemProps> = ({ type, label, address }) => {
  const theme = useTheme();

  const renderIcon = () => {
    if (type === 'pickup') {
      return <Icon name="my-location" size={14} color={theme.colors.on_primary} />;
    }
    if (type === 'destination') {
      return <Icon name="location-on" size={14} color={theme.colors.on_tertiary} />;
    }
    return <S.StopDot />;
  };

  return (
    <S.Container>
      <S.IconContainer type={type}>
        {renderIcon()}
      </S.IconContainer>
      <S.Content>
        <S.Label>{label}</S.Label>
        <S.Address numberOfLines={2}>{address}</S.Address>
      </S.Content>
    </S.Container>
  );
};
