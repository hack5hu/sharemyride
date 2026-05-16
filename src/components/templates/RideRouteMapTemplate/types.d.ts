import { CameraRef } from '@maplibre/maplibre-react-native';

export interface RideRouteMapTemplateProps {
  title: string;
  onBack: () => void;
  mapRef: React.RefObject<any>;
  cameraRef: React.RefObject<CameraRef>;
  region: { latitude: number; longitude: number };
  zoom: number;
  onRegionDidChange: (event: any) => void;
  handleUserLocationUpdate: (location: any) => void;
  mapData: any;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onOpenExternalMap: (type: 'google' | 'apple') => void;
}
