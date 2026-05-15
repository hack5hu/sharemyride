import { ReactNode } from 'react';

export interface LocalRideResultsTemplateProps {
  onBack: () => void;
  latitude: number;
  longitude: number;
  localServiceAreaLabel: string;
  requestLocalPartnerLabel: string;
  onRequestLocalPartner: () => void;
  mapChildren?: ReactNode;
  onRegionChangeComplete?: (event: any) => void;
  mapRef?: any;
  cameraRef?: any;
  zoom?: number;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}
