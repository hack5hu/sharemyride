import { type MapRef, type CameraRef } from '@maplibre/maplibre-react-native';
import { type ReactNode, type RefObject } from 'react';

export interface LocalRideResultsTemplateProps {
  onBack: () => void;
  latitude: number;
  longitude: number;
  localServiceAreaLabel: string;
  requestLocalPartnerLabel: string;
  onRequestLocalPartner: () => void;
  mapChildren?: ReactNode;
  onRegionChangeComplete?: (event: unknown) => void;
  mapRef?: RefObject<MapRef | null>;
  cameraRef?: RefObject<CameraRef | null>;
  zoom?: number;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}

