import { RideFiltersModal } from './RideFiltersModal';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/RideFiltersModal',
  component: RideFiltersModal,
} satisfies Meta<typeof RideFiltersModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onClear: () => {},
    onApply: () => {},
    selectedFilters: ['nearPickup', 'noSmoking'],
    t: {
      title: 'Filters',
      proximityTitle: 'Proximity',
      nearPickup: 'Near Pickup',
      nearDropoff: 'Near Drop-off',
      departureTimeTitle: 'Departure Time',
      preferencesTitle: 'Preferences',
      seatAvailabilityTitle: 'Seat Availability',
      seatsRequiredLabel: 'Seats Required',
      applyFilters: 'Apply Filters',
      clearAll: 'Clear All',
      noSmoking: 'No Smoking',
      ladiesOnly: 'Ladies Only',
      verifiedDrivers: 'Verified Drivers',
      petFriendly: 'Pet Friendly',
      luggageAllowed: 'Luggage Allowed',
      searchRadiusTitle: 'Search Radius',
      searchRadiusUnit: 'km',
    },
  },
};
