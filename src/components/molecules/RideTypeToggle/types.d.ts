export type RideType = 'local' | 'intercity';

export interface RideTypeToggleProps {
  selected: RideType;
  onSelect: (type: RideType) => void;
  localLabel: string;
  intercityLabel: string;
}
