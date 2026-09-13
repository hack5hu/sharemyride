import { type MapRef, type CameraRef } from '@maplibre/maplibre-react-native';
import { type ReactNode, type RefObject } from 'react';
import { type LocalRideItemData } from './components/LocalRideCard/types.d';

export interface LocalRideResultsTemplateProps {
  onBack: () => void;
  latitude: number;
  longitude: number;
  rides: LocalRideItemData[];
  selectedRideId: string | null;
  onSelectRide: (rideId: string) => void;
  onPressDetails: (rideId: string) => void;
  onRequestLocalPartner?: () => void;
  startAddress?: string;
  destinationAddress?: string;
  mapChildren?: ReactNode;
  onRegionChangeComplete?: (event: unknown) => void;
  mapRef?: RefObject<MapRef | null>;
  cameraRef?: RefObject<CameraRef | null>;
  onMapLoaded?: () => void;
  zoom?: number;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onOpenFilters?: () => void;
  activeFiltersCount?: number;
  isFilterModalOpen?: boolean;
  onCloseFilters?: () => void;
  onClearFilters?: () => void;
  onApplyFilters?: (filters: string[]) => void;
  selectedFilters?: string[];
}
