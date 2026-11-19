import React, { memo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { CoinTransactionType } from '@/constants/enums';
import { moderateScale } from '@/styles';
import * as S from './CoinTransactionItem.styles';
import { type CoinTransactionItemProps } from './types.d';

export const CoinTransactionItem: React.FC<CoinTransactionItemProps> = memo(
  ({ transaction }) => {
    const theme = useTheme();
    const isEarned = transaction.type === CoinTransactionType.EARNED;

    const iconColor = isEarned
      ? theme.name === 'dark'
        ? '#34D399'
        : '#15803D'
      : theme.name === 'dark'
      ? '#F87171'
      : '#B91C1C';

    const defaultIcon = isEarned ? 'arrow-downward' : 'arrow-upward';
    const displayIcon = transaction.iconName || defaultIcon;

    return (
      <S.Container>
        <S.IconContainer isEarned={isEarned}>
          <Icon
            name={displayIcon}
            size={moderateScale(20)}
            color={iconColor}
          />
        </S.IconContainer>

        <S.DetailsContainer>
          <S.Title numberOfLines={1}>{transaction.title}</S.Title>
          <S.Description numberOfLines={1}>
            {transaction.description}
          </S.Description>
          <S.DateText>{transaction.date}</S.DateText>
        </S.DetailsContainer>

        <S.AmountContainer>
          <S.AmountText isEarned={isEarned}>
            {isEarned ? `+${transaction.amount}` : `-${transaction.amount}`}
          </S.AmountText>
        </S.AmountContainer>
      </S.Container>
    );
  },
);

CoinTransactionItem.displayName = 'CoinTransactionItem';

