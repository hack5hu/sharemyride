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
    recentSearches,
    handlePressPickup,
    handlePressDestination,
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
      recentSearches={recentSearches}
      onPressPickup={handlePressPickup}
      onPressDestination={handlePressDestination}
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
