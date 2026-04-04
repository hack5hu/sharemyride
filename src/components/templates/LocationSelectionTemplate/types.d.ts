export interface LocationSelectionTemplateProps {
  startLocationName?: string;
  destinationLocationName?: string;
  onPressStart: () => void;
  onPressDestination: () => void;
  onPressContinue: () => void;
  canContinue: boolean;
  navBar?: React.ReactNode;
}
