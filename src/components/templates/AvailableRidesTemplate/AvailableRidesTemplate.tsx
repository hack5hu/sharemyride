import React from 'react';
import { format } from 'date-fns';
import { useTheme } from 'styled-components/native';
import { View, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography } from '@/components/atoms/Typography';
import { moderateScale, verticalScale, scale } from '@/styles';
import { useBookRideStore } from '@/store/useBookRideStore';
import { RideData } from '@/screens/BookFlow/3_AvailableRides/types.d';
import { RideCard } from '@/components/organisms/RideCard/RideCard';
import { RideFiltersModal } from '@/components/organisms/RideFiltersModal';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { EmptyState } from '@/components/molecules/EmptyState';
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
  onLoadMore?: () => void;
  isFetchingMore?: boolean;
  isLoading?: boolean;
  hasMore?: boolean;
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
  onLoadMore,
  isFetchingMore,
  isLoading,
  hasMore,
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
      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          paddingHorizontal: scale(24),
          paddingBottom: verticalScale(100),
        }}
        renderItem={({ item }) => (
          <RideCard ride={item} onPress={onRideSelect} />
        )}
        ListHeaderComponent={
          <View>
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

          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={{ paddingVertical: verticalScale(60), alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator color={theme.colors.primary} size="large" />
              <Typography variant="body" size="md" color={theme.colors.on_surface_variant} weight="medium" style={{ marginTop: verticalScale(16) }}>
                We are currently fetching best rides for you...
              </Typography>
            </View>
          ) : (
            <EmptyState 
              icon="search-off"
              title="No Rides Found"
              description="We couldn't find any rides for this route and date. Try adjusting your filters or checking a different time."
            />
          )
        }
        ListFooterComponent={
          (isFetchingMore || (isLoading && rides.length > 0)) ? (
            <View style={{ paddingVertical: verticalScale(20) }}>
              <ActivityIndicator color={theme.colors.primary} />
            </View>
          ) : (
            <View style={{ height: verticalScale(32) }} />
          )
        }
      />

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
