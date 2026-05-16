import { ReactNode } from 'react';

export interface SelectLocationTemplateProps {
  mapBackground: ReactNode;
  centerPin: ReactNode;
  locationName?: string;
  locationAddress?: string;
  onSendLocation?: () => void;
  sendLocationLabel?: string;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}
