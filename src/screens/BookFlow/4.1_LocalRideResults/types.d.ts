import { type LocalRideItemData } from '@/components/templates/LocalRideResultsTemplate/components/LocalRideCard/types.d';
import { type Location } from '@/store/useLocationStore';

export interface LocalRideResultsProps {}

export interface ViewState {
  latitude: number;
  longitude: number;
}

export type { LocalRideItemData };
