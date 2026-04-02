export interface LocationListItemProps {
  title: string;
  address: string;
  icon: string;
  onPress: () => void;
  isCurrentLocation?: boolean;
}
