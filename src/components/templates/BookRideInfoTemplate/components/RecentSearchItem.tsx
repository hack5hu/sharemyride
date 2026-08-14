import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { format } from 'date-fns';
import { moderateScale } from '@/styles';
import { RecentSearch } from '@/store/useBookRideStore';
import * as S from './RecentSearchItem.styles';

export interface RecentSearchItemProps {
  item: RecentSearch;
  isSearching: boolean;
  onSelectRecentSearch: (item: RecentSearch) => void;
}

export const RecentSearchItem: React.FC<RecentSearchItemProps> = ({
  item,
  isSearching,
  onSelectRecentSearch,
}) => {
  const theme = useTheme();

  return (
    <S.RecentItemContainer>
      <S.RecentItem
        activeOpacity={isSearching ? 1 : 0.7}
        onPress={isSearching ? undefined : () => onSelectRecentSearch(item)}
      >
        <S.RecentLeft>
          <S.RecentIconBox>
            <MaterialIcons
              name="history"
              size={moderateScale(24)}
              color={theme.colors.primary}
            />
          </S.RecentIconBox>
          <S.RecentContent>
            <S.RecentTitle numberOfLines={1}>
              {item.startLocation.address.split(',')[0]} to{' '}
              {item.destinationLocation.address.split(',')[0]}
            </S.RecentTitle>
            <S.RecentSub>
              {format(new Date(item.travelDate), 'MMM dd, yyyy')} •{' '}
              {item.seatCount} {item.seatCount === 1 ? 'Person' : 'People'}
            </S.RecentSub>
          </S.RecentContent>
        </S.RecentLeft>
        <MaterialIcons
          name="arrow-forward"
          size={moderateScale(20)}
          color={theme.colors.outline_variant}
        />
      </S.RecentItem>
    </S.RecentItemContainer>
  );
};
