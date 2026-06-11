import React from 'react';
import { useBookRideInfo } from './useBookRideInfo';
import { BookRideInfoTemplate } from '@/components/templates/BookRideInfoTemplate';
import { ConfirmationModal } from '@/components/organisms/ConfirmationModal';
import { useLocale } from '@/constants/localization';

export const BookRideInfoScreen: React.FC = () => {
  const {
    pickup,
    destination,
    travelDate,
    peopleCount,
    isSearching,
    isSwapped,
    recentSearches,
    handlePressPickup,
    handlePressDestination,
    handleSwapLocations,
    handleOpenDatePicker,
    incrementPeople,
    decrementPeople,
    handleSearchRides,
    handleSelectRecentSearch,
    clearRecentSearches,
    t,
    rideType,
    setRideType,
    ratingPromptRide,
    isRatingPromptVisible,
    handleConfirmRating,
    handleDismissRating,
  } = useBookRideInfo();

  const { rating: tRating, common: tCommon } = useLocale();

  const targetName =
    ratingPromptRide?.role === 'DRIVER'
      ? 'Passengers'
      : ratingPromptRide?.driver?.name || 'Driver';

  return (
    <>
      <BookRideInfoTemplate
        pickup={pickup}
        destination={destination}
        travelDate={travelDate}
        peopleCount={peopleCount}
        isSearching={isSearching}
        isSwapped={isSwapped}
        recentSearches={recentSearches}
        onPressPickup={handlePressPickup}
        onPressDestination={handlePressDestination}
        onSwapLocations={handleSwapLocations}
        onOpenDatePicker={handleOpenDatePicker}
        onIncrementPeople={incrementPeople}
        onDecrementPeople={decrementPeople}
        onSearchRides={handleSearchRides}
        onSelectRecentSearch={handleSelectRecentSearch}
        onClearRecentSearches={clearRecentSearches}
        t={t}
        rideType={rideType}
        onSetRideType={setRideType}
      />

      {isRatingPromptVisible && (
        <ConfirmationModal
          isVisible={isRatingPromptVisible}
          onClose={handleDismissRating}
          onConfirm={handleConfirmRating}
          title={tRating.ratingCardTitle}
          message={tRating.ratingCardSubtitle.replace('{{name}}', targetName)}
          confirmLabel={tRating.rateButtonText}
          cancelLabel={tCommon.cancel}
          type="info"
        />
      )}
    </>
  );
};
