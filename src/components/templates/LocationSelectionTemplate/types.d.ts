import { type ReactNode } from 'react';
import { type RideType } from '@/constants/enums';
import { type PublishDraft } from '@/store/types/publish';

export interface LocationSelectionTemplateProps {
  rideType?: RideType;
  onSelectRideType?: (type: RideType) => void;
  startLocationName?: string;
  destinationLocationName?: string;
  onPressStart: () => void;
  onPressDestination: () => void;
  onSwapLocations?: () => void;
  onPressContinue: () => void;
  canContinue: boolean;
  recentRides?: PublishDraft[];
  onSelectRecentRide?: (ride: PublishDraft) => void;
  navBar?: ReactNode;
}
