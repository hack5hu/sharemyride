import React from 'react';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { safeParseDate } from '@/utils/date';
import { format } from 'date-fns';
import { moderateScale } from '@/styles';
import { AvailableRidesTranslations } from '@/constants/localization/types';
import * as S from '../AvailableRidesTemplate.styles';

export interface SearchSummaryCardProps {
  startLocation: { address: string } | null;
  destinationLocation: { address: string } | null;
  travelDate: string | null;
  seatCount: number;
  onOpenFilters: () => void;
  t: AvailableRidesTranslations;
}

export const SearchSummaryCard: React.FC<SearchSummaryCardProps> = ({
  startLocation,
  destinationLocation,
  travelDate,
  seatCount,
  onOpenFilters,
  t,
}) => {
  const theme = useTheme();

  return (
    <S.SearchSummaryCard>
      <S.SummaryRow>
        <S.RouteInfo>
          <S.LocationVertical>
            <Icon
              name="circle"
              size={moderateScale(14)}
              color={theme.colors.primary}
            />
            <S.Line />
            <Icon
              name="location-on"
              size={moderateScale(14)}
              color={theme.colors.tertiary}
            />
          </S.LocationVertical>
          <S.RouteTextContainer>
            <Typography
              variant="title"
              size="sm"
              weight="bold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {startLocation?.address || 'Unknown'}
            </Typography>
            <Typography
              variant="title"
              size="sm"
              weight="bold"
              numberOfLines={1}
              ellipsizeMode="tail"
              color={theme.colors.on_surface_variant}
            >
              {destinationLocation?.address || 'Unknown'}
            </Typography>
          </S.RouteTextContainer>
        </S.RouteInfo>
        <S.FilterButton onPress={onOpenFilters}>
          <Icon
            name="tune"
            size={moderateScale(24)}
            color={theme.colors.on_surface_variant}
          />
        </S.FilterButton>
      </S.SummaryRow>

      <S.SummaryFooter>
        <S.FooterItem>
          <Icon
            name="calendar-today"
            size={moderateScale(20)}
            color={theme.colors.on_surface_variant}
          />
          <Typography
            variant="label"
            size="md"
            weight="bold"
            color={theme.colors.on_surface_variant}
          >
            {travelDate
              ? safeParseDate(travelDate)
                ? format(safeParseDate(travelDate)!, 'EEE, dd MMM')
                : t.searchSummaryDate
              : t.searchSummaryDate}
          </Typography>
        </S.FooterItem>
        <S.FooterItem>
          <Icon
            name="group"
            size={moderateScale(20)}
            color={theme.colors.on_surface_variant}
          />
          <Typography
            variant="label"
            size="md"
            weight="bold"
            color={theme.colors.on_surface_variant}
          >
            {t.searchSummarySeats.replace('{count}', seatCount.toString())}
          </Typography>
        </S.FooterItem>
      </S.SummaryFooter>
    </S.SearchSummaryCard>
  );
};
