export interface LocationSelectionTemplateProps {
  startLocationName?: string;
  destinationLocationName?: string;
  onPressStart: () => void;
  onPressDestination: () => void;
  onPressContinue: () => void;
  canContinue: boolean;
  recentRides?: any[];
  onSelectRecentRide?: (ride: any) => void;
  navBar?: React.ReactNode;
}
