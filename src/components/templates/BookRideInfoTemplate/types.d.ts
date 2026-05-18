import { RecentSearch } from '@/store/useBookRideStore';

export interface BookRideInfoTemplateProps {
  pickup: string;
  destination: string;
  travelDate: Date | null;
  peopleCount: number;
  isSearching: boolean;
  recentSearches: RecentSearch[];
  onPressPickup: () => void;
  onPressDestination: () => void;
  onOpenDatePicker: () => void;
  onIncrementPeople: () => void;
  onDecrementPeople: () => void;
  onSearchRides: () => void;
  onSelectRecentSearch: (item: RecentSearch) => void;
  onClearRecentSearches: () => void;
  t: any;
  rideType: 'local' | 'intercity';
  onSetRideType: (type: 'local' | 'intercity') => void;
}

