import { RideType } from '@/constants/enums';

export { RideType };

export interface RideTypeToggleProps {
  selected: RideType;
  onSelect: (type: RideType) => void;
  localLabel: string;
  intercityLabel: string;
}
