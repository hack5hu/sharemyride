import { ReactNode } from 'react';

export interface SelectLocationTemplateProps {
  mapBackground: ReactNode;
  centerPin: ReactNode;
  title?: string;
  onBack?: () => void;
  locationName?: string;
  locationAddress?: string;
  onSendLocation?: () => void;
  sendLocationLabel?: string;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onMyLocationPress?: () => void;
  isGpsBannerVisible?: boolean;
  onCloseGpsBanner?: () => void;
  onOpenGpsSettings?: () => void;
  isLocating?: boolean;
}
