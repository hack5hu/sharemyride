import { ReactNode, RefObject } from 'react';

export interface LocalRideResultsTemplateProps {
  onBack: () => void;
  latitude: number;
  longitude: number;
  localServiceAreaLabel: string;
  requestLocalPartnerLabel: string;
  onRequestLocalPartner: () => void;
  mapChildren?: ReactNode;
  onRegionChangeComplete?: (event: unknown) => void;
  mapRef?: RefObject<unknown>;
  cameraRef?: RefObject<unknown>;
  zoom?: number;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}
