import { Location } from '@/store/useLocationStore';

export interface LocationBottomSheetProps {
  onLocationSelect: (location: any) => void;
  searchResults?: Location[];
  isSearching?: boolean;
}
