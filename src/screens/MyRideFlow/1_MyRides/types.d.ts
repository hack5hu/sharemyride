import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';

export interface RideListItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  icon?: string;
  type: 'upcoming' | 'draft' | 'completed';
  rawDate?: Date;
  // For UpcomingRideCard
  timerLabel?: string;
  driverName?: string;
  carModel?: string;
  rating?: number;
  avatarUri?: string;
  pickupTime?: string;
  pickupLocation?: string;
  dropoffTime?: string;
  dropoffLocation?: string;
}

export interface MyRidesHookData {
  activeTab: MyRidesTab;
  isLoading: boolean;
  isRefreshing: boolean;
  isActionLoading: boolean;
  onTabChange: (tab: MyRidesTab) => void;
  onRidePress: (id: string) => void;
  onRemoveDraft: (id: string) => void;
  onCancelRide: (id: string | number) => void;
  onClearDrafts: () => void;
  onRefresh: () => void;
  onLoadMore: () => void;
  hasMore: boolean;
  currentRides: RideListItem[];
  drafts: any[];
  onMenuPress: () => void;
  onProfilePress: () => void;
  onAcceptRide: (id: string) => void;
  onRejectRide: (id: string) => void;
}
