import { RecentSearch } from '@/store/useBookRideStore';
import { BookRideInfoTranslations } from '@/constants/localization/types';

export interface BookRideInfoTemplateProps {
  pickup: string | null;
  destination: string | null;
  travelDate: Date | null;
  peopleCount: number;
  isSearching: boolean;
  isSwapped: boolean;
  recentSearches: RecentSearch[];
  onPressPickup: () => void;
  onPressDestination: () => void;
  onSwapLocations: () => void;
  onOpenDatePicker: () => void;
  onIncrementPeople: () => void;
  onDecrementPeople: () => void;
  onSearchRides: () => void;
  onSelectRecentSearch: (item: RecentSearch) => void;
  onClearRecentSearches: () => void;
  t: BookRideInfoTranslations;
  rideType: 'local' | 'intercity';
  onSetRideType: (type: 'local' | 'intercity') => void;
}
