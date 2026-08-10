export interface LocationSelectionTemplateProps {
  startLocationName?: string;
  destinationLocationName?: string;
  onPressStart: () => void;
  onPressDestination: () => void;
  onPressContinue: () => void;
  canContinue: boolean;
  recentRides?: unknown[];
  onSelectRecentRide?: (ride: unknown) => void;
  navBar?: React.ReactNode;
}
