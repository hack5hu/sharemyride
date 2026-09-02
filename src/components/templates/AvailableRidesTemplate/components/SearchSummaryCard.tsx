import { format } from 'date-fns';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'styled-components/native';
import { Typography } from '@/components/atoms/Typography';
import { type AvailableRidesTranslations } from '@/constants/localization/types';
import { moderateScale } from '@/styles';
import { formatDisplayAddress } from '@/utils/address';
import { safeParseDate } from '@/utils/date';
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
        <S.RouteSection>
          {/* Origin Stop */}
          <S.RouteRow>
            <S.TrackColumn>
              <S.OriginDot />
            </S.TrackColumn>
            <S.LocationTextWrapper>
              <Typography
                variant="title"
                size="sm"
                weight="bold"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {formatDisplayAddress(startLocation?.address) || 'Unknown'}
              </Typography>
            </S.LocationTextWrapper>
          </S.RouteRow>

          {/* Connecting Track Line */}
          <S.RouteRow>
            <S.TrackColumn>
              <S.TrackLine />
            </S.TrackColumn>
            <S.LocationTextWrapper />
          </S.RouteRow>

          {/* Destination Stop */}
          <S.RouteRow>
            <S.TrackColumn>
              <S.DestinationDot />
            </S.TrackColumn>
            <S.LocationTextWrapper>
              <Typography
                variant="title"
                size="sm"
                weight="bold"
                numberOfLines={1}
                ellipsizeMode="tail"
                color={theme.colors.on_surface_variant}
              >
                {formatDisplayAddress(destinationLocation?.address) || 'Unknown'}
              </Typography>
            </S.LocationTextWrapper>
          </S.RouteRow>
        </S.RouteSection>

        <S.FilterButton onPress={onOpenFilters} activeOpacity={0.8}>
          <Icon
            name="tune"
            size={moderateScale(20)}
            color={theme.colors.primary}
          />
        </S.FilterButton>
      </S.SummaryRow>

      <S.SummaryFooter>
        <S.FooterItem>
          <Icon
            name="calendar-today"
            size={moderateScale(14)}
            color={theme.colors.primary}
          />
          <Typography
            variant="label"
            size="sm"
            weight="bold"
            color={theme.colors.on_surface}
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
            size={moderateScale(16)}
            color={theme.colors.primary}
          />
          <Typography
            variant="label"
            size="sm"
            weight="bold"
            color={theme.colors.on_surface}
          >
            {t.searchSummarySeats.replace('{count}', seatCount.toString())}
          </Typography>
        </S.FooterItem>
      </S.SummaryFooter>
    </S.SearchSummaryCard>
  );
};
