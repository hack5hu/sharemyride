import { Location } from '@/store/useLocationStore';

export interface LocationBottomSheetProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: add proper type
  onLocationSelect: (location: any) => void;
  searchResults?: Location[];
  isSearching?: boolean;
}
