import { ReactNode, RefObject } from 'react';
import { MapRef, CameraRef } from '@maplibre/maplibre-react-native';

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

