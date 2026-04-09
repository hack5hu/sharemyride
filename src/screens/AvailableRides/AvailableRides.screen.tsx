import React from 'react';
import { AvailableRidesTemplate } from '@/components/templates/AvailableRidesTemplate/AvailableRidesTemplate';
import { useAvailableRides } from './useAvailableRides';

export const AvailableRidesScreen: React.FC = () => {
  const {
    mockRides,
    selectedFilters,
    isFilterModalOpen,
    toggleFilter,
    handleOpenFilters,
    handleCloseFilters,
    handleClearFilters,
    handleRideSelect,
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
      onRideSelect={handleRideSelect}
      t={t}
      ft={ft}
    />
  );
};
