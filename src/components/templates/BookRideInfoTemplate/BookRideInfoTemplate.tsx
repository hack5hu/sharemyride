import React from 'react';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { verticalScale } from '@/styles';
import { BottomNav } from '@/components/organisms/BottomNav';
import { ScreenShell } from '@/components/molecules/ScreenShell';
import { BookRideInfoTemplateProps } from './types.d';
import * as S from './BookRideInfoTemplate.styles';
import { RecentSearch } from '@/store/useBookRideStore';
import { BookingForm } from './components/BookingForm';
import { RecentSearchItem } from './components/RecentSearchItem';
import { ActiveRideBanner } from '@/components/molecules/ActiveRideBanner';

export const BookRideInfoTemplate: React.FC<BookRideInfoTemplateProps> =
  React.memo(
    ({
      pickup,
      destination,
      travelDate,
      peopleCount,
      radiusKm,
      isSearching,
      isSwapped,
      recentSearches,
      onPressPickup,
      onPressDestination,
      onSwapLocations,
      onOpenDatePicker,
      onIncrementPeople,
      onDecrementPeople,
      onIncrementRadius,
      onDecrementRadius,
      onSelectRadius,
      onSearchRides,
      onSelectRecentSearch,
      onClearRecentSearches,
      t,
      activeRide,
      isBannerDismissed,
      onPressActiveRide,
      onDismissActiveRideBanner,
    }) => {
      const insets = useSafeAreaInsets();

      const renderRecentItem = React.useCallback(
        ({ item }: { item: RecentSearch }) => (
          <RecentSearchItem
            item={item}
            isSearching={isSearching}
            onSelectRecentSearch={onSelectRecentSearch}
          />
        ),
        [isSearching, onSelectRecentSearch],
      );

      const listHeader = React.useMemo(
        () => (
          <>
            <S.Header $paddingTop={insets.top + verticalScale(12)}>
              <S.HeaderTitle>
                {t.brandName.slice(0, 4)}
                <S.HeaderTitleHighlight>
                  {t.brandName.slice(4)}
                </S.HeaderTitleHighlight>
              </S.HeaderTitle>
            </S.Header>

            {activeRide && !isBannerDismissed && onPressActiveRide && (
              <ActiveRideBanner
                title={activeRide.message}
                etaMinutes={activeRide.etaMinutes}
                distanceKm={activeRide.distanceKm}
                role={activeRide.role}
                onPress={onPressActiveRide}
                onDismiss={onDismissActiveRideBanner}
              />
            )}

            <S.HeroSection>
              <S.HeroTitle>{t.heroTitle}</S.HeroTitle>
              <S.HeroSubtitle>{t.heroSubtitle}</S.HeroSubtitle>
            </S.HeroSection>

            <BookingForm
              pickup={pickup}
              destination={destination}
              travelDate={travelDate}
              peopleCount={peopleCount}
              radiusKm={radiusKm}
              isSearching={isSearching}
              isSwapped={isSwapped}
              onPressPickup={onPressPickup}
              onPressDestination={onPressDestination}
              onSwapLocations={onSwapLocations}
              onOpenDatePicker={onOpenDatePicker}
              onIncrementPeople={onIncrementPeople}
              onDecrementPeople={onDecrementPeople}
              onIncrementRadius={onIncrementRadius}
              onDecrementRadius={onDecrementRadius}
              onSelectRadius={onSelectRadius}
              onSearchRides={onSearchRides}
              t={t}
            />

            {recentSearches.length > 0 && (
              <S.SectionContainer>
                <S.RecentSearchesHeader>
                  <S.SectionTitle>{t.recentSearchesTitle}</S.SectionTitle>
                  <S.ClearButtonText
                    onPress={isSearching ? undefined : onClearRecentSearches}
                  >
                    {t.clearAll}
                  </S.ClearButtonText>
                </S.RecentSearchesHeader>
              </S.SectionContainer>
            )}
          </>
        ),
        [
          insets.top,
          pickup,
          destination,
          travelDate,
          peopleCount,
          radiusKm,
          isSearching,
          isSwapped,
          onPressPickup,
          onPressDestination,
          onSwapLocations,
          onOpenDatePicker,
          onIncrementPeople,
          onDecrementPeople,
          onIncrementRadius,
          onDecrementRadius,
          onSelectRadius,
          onSearchRides,
          onClearRecentSearches,
          recentSearches.length,
          t,
          activeRide,
          isBannerDismissed,
          onPressActiveRide,
          onDismissActiveRideBanner,
        ],
      );

      return (
        <ScreenShell noPaddingTop noPaddingBottom>
          <FlashList
            data={recentSearches}
            keyExtractor={(item: RecentSearch) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: verticalScale(120),
            }}
            renderItem={renderRecentItem}
            ListHeaderComponent={listHeader}
            estimatedItemSize={80}
          />
          <BottomNav activeTab="BOOK" />
        </ScreenShell>
      );
    },
  );
