import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { useTheme } from 'styled-components/native';
import { Loader } from '@/components/atoms/Loader';
import { EmptyState } from '@/components/molecules/EmptyState';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { RideCard } from '@/components/organisms/RideCard/RideCard';
import { RideFiltersModal } from '@/components/organisms/RideFiltersModal';
import { type AvailableRidesTranslations, type RideFiltersTranslations } from '@/constants/localization/types';
import { type RideData } from '@/screens/BookFlow/3_AvailableRides/types.d';
import { useBookRideStore } from '@/store/useBookRideStore';
import { scale, verticalScale } from '@/styles';
import * as S from './AvailableRidesTemplate.styles';
import { SearchSummaryCard } from './components/SearchSummaryCard';

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
  t: AvailableRidesTranslations;
  ft: RideFiltersTranslations;
}

export const AvailableRidesTemplate: React.FC<AvailableRidesTemplateProps> = ({
  rides,
  selectedFilters,
  onOpenFilters,
  isFilterModalOpen,
  onCloseFilters,
  onClearFilters,
  onApplyFilters,
  onRideSelect,
  onLoadMore,
  isFetchingMore,
  isLoading,
  t,
  ft,
}) => {
  const theme = useTheme();

  const { startLocation, destinationLocation, seatCount, travelDate } =
    useBookRideStore();

  const renderRideItem = React.useCallback(({ item }: { item: RideData }) => (
    <RideCard ride={item} onPress={onRideSelect} />
  ), [onRideSelect]);

  const listHeader = React.useMemo(() => (
    <SearchSummaryCard
      startLocation={startLocation}
      destinationLocation={destinationLocation}
      travelDate={travelDate}
      seatCount={seatCount}
      onOpenFilters={onOpenFilters}
      t={t}
    />
  ), [startLocation, destinationLocation, travelDate, seatCount, onOpenFilters, t]);

  const listEmpty = React.useMemo(() => {
    if (isLoading) {
      return (
        <S.LoadingContainer>
          <Loader size="large" />
          <S.LoadingText
            variant="body"
            size="md"
            color={theme.colors.on_surface_variant}
            weight="medium"
          >
            {t.fetchingRides}
          </S.LoadingText>
        </S.LoadingContainer>
      );
    }

    return (
      <EmptyState
        icon="search-off"
        title={t.noRidesFoundTitle}
        description={t.noRidesFoundDesc}
      />
    );
  }, [isLoading, t, theme]);

  const listFooter = React.useMemo(() => {
    if (isFetchingMore || (isLoading && rides.length > 0)) {
      return (
        <S.FetchMoreLoadingContainer>
          <Loader />
        </S.FetchMoreLoadingContainer>
      );
    }

    return <S.FooterSpacer />;
  }, [isFetchingMore, isLoading, rides.length]);

  return (
    <ScreenShell title={t.heroTitle} onBack>
      <S.ListWrapper>
        <FlashList
          data={rides}
          keyExtractor={(item: RideData) => item.id}
          showsVerticalScrollIndicator={false}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{
            paddingHorizontal: scale(24),
            paddingBottom: verticalScale(100),
          }}
          renderItem={renderRideItem}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={listEmpty}
          ListFooterComponent={listFooter}
          estimatedItemSize={120}
        />
      </S.ListWrapper>

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
