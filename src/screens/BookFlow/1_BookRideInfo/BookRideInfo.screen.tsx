import React from 'react';
import { useBookRideInfo } from './useBookRideInfo';
import { BookRideInfoTemplate } from '@/components/templates/BookRideInfoTemplate';

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
  } = useBookRideInfo();

  return (
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
  );
};
