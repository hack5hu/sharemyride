import { type BookRideInfoTranslations } from '@/constants/localization/types';
import { type RecentSearch } from '@/store/useBookRideStore';

export interface BookRideInfoTemplateProps {
  pickup: string | null;
  destination: string | null;
  travelDate: Date | null;
  peopleCount: number;
  radiusKm: number;
  isSearching: boolean;
  isSwapped: boolean;
  recentSearches: RecentSearch[];
  onPressPickup: () => void;
  onPressDestination: () => void;
  onSwapLocations: () => void;
  onOpenDatePicker: () => void;
  onIncrementPeople: () => void;
  onDecrementPeople: () => void;
  onIncrementRadius: () => void;
  onDecrementRadius: () => void;
  onSelectRadius: (radius: number) => void;
  onSearchRides: () => void;
  onSelectRecentSearch: (item: RecentSearch) => void;
  onClearRecentSearches: () => void;
  t: BookRideInfoTranslations;
  rideType: 'local' | 'intercity';
  onSetRideType: (type: 'local' | 'intercity') => void;
}

export interface BookingFormProps {
  pickup: string | null;
  destination: string | null;
  travelDate: Date | null;
  peopleCount: number;
  radiusKm: number;
  isSearching: boolean;
  isSwapped: boolean;
  onPressPickup: () => void;
  onPressDestination: () => void;
  onSwapLocations: () => void;
  onOpenDatePicker: () => void;
  onIncrementPeople: () => void;
  onDecrementPeople: () => void;
  onIncrementRadius: () => void;
  onDecrementRadius: () => void;
  onSelectRadius: (radius: number) => void;
  onSearchRides: () => void;
  t: BookRideInfoTranslations;
}

