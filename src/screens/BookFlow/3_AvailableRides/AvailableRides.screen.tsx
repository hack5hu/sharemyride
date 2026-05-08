import React from 'react';
import { AvailableRidesTemplate } from '@/components/templates/AvailableRidesTemplate/AvailableRidesTemplate';
import { useAvailableRides } from './useAvailableRides';

export const AvailableRidesScreen: React.FC = () => {
  const {
    mockRides,
    selectedFilters,
    isFilterModalOpen,
    isFetchingMore,
    handleLoadMore,
    hasMore,
    toggleFilter,
    handleOpenFilters,
    handleCloseFilters,
    handleClearFilters,
    handleApplyFilters,
    handleRideSelect,
    isLoading,
    t,
    ft,
  } = useAvailableRides();

  return (
    <AvailableRidesTemplate
      rides={mockRides}
      selectedFilters={selectedFilters}
      onFilterToggle={toggleFilter}
      onOpenFilters={handleOpenFilters}
      isFilterModalOpen={isFilterModalOpen}
      onCloseFilters={handleCloseFilters}
      onClearFilters={handleClearFilters}
      onApplyFilters={handleApplyFilters}
      onRideSelect={handleRideSelect}
      onLoadMore={handleLoadMore}
      isFetchingMore={isFetchingMore}
      isLoading={isLoading}
      hasMore={hasMore}
      t={t}
      ft={ft}
    />
  );
};
