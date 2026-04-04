import { StopItemProps } from '@/components/molecules/StopItem';

export interface RouteJourneyProps {
  stops: Omit<StopItemProps, 'isFirst' | 'isLast'>[];
}
