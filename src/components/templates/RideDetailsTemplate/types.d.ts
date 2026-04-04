import { RouteJourneyProps } from '@/components/organisms/RouteJourney';
import { ETAInfoProps } from '@/components/molecules/ETAInfo';
import { FareCardProps } from '@/components/molecules/FareCard';
import { DriverSectionProps } from '@/components/organisms/DriverSection';
import { RidersHorizontalListProps } from '@/components/organisms/RidersHorizontalList';

export interface RideDetailsTemplateProps {
  onBackPress: () => void;
  onCancelPress: () => void;
  routeJourney: RouteJourneyProps;
  etaInfo: ETAInfoProps;
  fareCard: FareCardProps;
  driverSection: DriverSectionProps;
  ridersList: RidersHorizontalListProps;
}
