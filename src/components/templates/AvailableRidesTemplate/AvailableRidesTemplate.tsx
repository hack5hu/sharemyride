import React from 'react';
import { format } from 'date-fns';
import { useTheme } from 'styled-components/native';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, verticalScale } from '@/styles';
import { useBookRideStore } from '@/store/useBookRideStore';
import { RideData } from '@/screens/AvailableRides/types.d';
import { RideCard } from '@/components/organisms/RideCard/RideCard';
import { RideFiltersModal } from '@/components/organisms/RideFiltersModal';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import * as S from './AvailableRidesTemplate.styles';

export interface AvailableRidesTemplateProps {
  rides: RideData[];
  selectedFilters: string[];
  onFilterToggle: (filter: string) => void;
  onOpenFilters: () => void;
  isFilterModalOpen: boolean;
  onCloseFilters: () => void;
  onClearFilters: () => void;
  onApplyFilters: (filters: string[]) => void;
  onRideSelect: (id: string) => void;
  t: any;
  ft: any;
}

export const AvailableRidesTemplate: React.FC<AvailableRidesTemplateProps> = ({
  rides,
  selectedFilters,
  onFilterToggle,
  onOpenFilters,
  isFilterModalOpen,
  onCloseFilters,
  onClearFilters,
  onApplyFilters,
  onRideSelect,
  t,
  ft,
}) => {
  const theme = useTheme();

  const filters = [
    { id: 'nearPickup', label: 'Near Pickup', icon: 'my-location' },
    { id: 'nearDropoff', label: 'Near Dropoff', icon: 'location-on' },
    { id: 'luggageAllowed', label: 'Luggage', icon: 'luggage' },
    { id: 'noSmoking', label: t.noSmokingFilterLabel || 'No Smoking', icon: 'smoke-free' },
    { id: 'ladiesOnly', label: t.ladiesOnlyFilterLabel || 'Ladies Only', icon: 'pregnant-woman' },
    { id: 'topRated', label: t.topRatedFilterLabel || 'Top Rated', icon: 'star' },
    { id: 'petFriendly', label: 'Pets', icon: 'pets' },


  ];

  const { startLocation, destinationLocation, seatCount, travelDate } = useBookRideStore();

  return (
    <ScreenShell title={t.heroTitle} onBack>
      <S.ScrollContent showsVerticalScrollIndicator={false}>
        <S.SearchSummaryCard>
          <S.SummaryRow>
            <S.RouteInfo>
              <S.LocationVertical>
                <Icon name="circle" size={moderateScale(14)} color={theme.colors.primary} style={{ fontVariationSettings: "'FILL' 1" }} />
                <S.Line />
                <Icon name="location-on" size={moderateScale(14)} color={theme.colors.tertiary} style={{ fontVariationSettings: "'FILL' 1" }} />
              </S.LocationVertical>
              <View style={{ flex: 1, gap: verticalScale(32) }}>
                <Typography variant="title" size="sm" weight="bold" numberOfLines={1} ellipsizeMode="tail">
                  {startLocation?.address || 'Unknown'}
                </Typography>
                <Typography variant="title" size="sm" weight="bold" numberOfLines={1} ellipsizeMode="tail" color={theme.colors.on_surface_variant}>
                  {destinationLocation?.address || 'Unknown'}
                </Typography>
              </View>
            </S.RouteInfo>
            <S.FilterButton onPress={onOpenFilters}>
              <Icon name="tune" size={moderateScale(24)} color={theme.colors.on_surface_variant} />
            </S.FilterButton>
          </S.SummaryRow>

          <S.SummaryFooter>
            <S.FooterItem>
              <Icon name="calendar-today" size={moderateScale(20)} color={theme.colors.on_surface_variant} />
              <Typography variant="label" size="md" weight="bold" color={theme.colors.on_surface_variant}>
                {travelDate ? format(new Date(travelDate), 'EEE, dd MMM') : t.searchSummaryDate}
              </Typography>
            </S.FooterItem>
            <S.FooterItem>
              <Icon name="group" size={moderateScale(20)} color={theme.colors.on_surface_variant} />
              <Typography variant="label" size="md" weight="bold" color={theme.colors.on_surface_variant}>
                {t.searchSummarySeats.replace('{count}', seatCount.toString())}
              </Typography>
            </S.FooterItem>
          </S.SummaryFooter>
        </S.SearchSummaryCard>

        <S.FilterScrollView horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter) => (
            <S.FilterChip
              key={filter.id}
              active={selectedFilters.includes(filter.id)}
              onPress={() => onFilterToggle(filter.id)}
            >
              <Icon
                name={filter.icon}
                size={moderateScale(18)}
                color={selectedFilters.includes(filter.id) ? theme.colors.on_primary : theme.colors.on_surface_variant}
              />
              <Typography
                variant="label"
                size="md"
                weight="bold"
                color={selectedFilters.includes(filter.id) ? theme.colors.on_primary : theme.colors.on_surface_variant}
              >
                {filter.label}
              </Typography>
            </S.FilterChip>
          ))}
        </S.FilterScrollView>

        {rides.map((ride) => (
          <RideCard key={ride.id} ride={ride} onPress={onRideSelect} />
        ))}

        <View style={{ height: verticalScale(32) }} />
      </S.ScrollContent>

      <RideFiltersModal
        isOpen={isFilterModalOpen}
        onClose={onCloseFilters}
        onClear={onClearFilters}
        onApply={onApplyFilters}
        selectedFilters={selectedFilters}
        t={ft}
      />
    </ScreenShell>
  );
};
