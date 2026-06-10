import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';

export interface RideListItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  icon?: string;
  type: 'upcoming' | 'draft' | 'completed' | 'archive' | 'requests';
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
  role?: 'DRIVER' | 'PASSENGER';
  statusTag?: string;
}

export interface MyRidesHookData {
  activeTab: MyRidesTab;
  isLoading: boolean;
  isRefreshing: boolean;
  isActionLoading: boolean;
  onTabChange: (tab: MyRidesTab) => void;
  onRidePress: (params: { id: string; rideId?: string; sourceStopId?: number; destinationStopId?: number }) => void;
  onRemoveDraft: (id: string) => void;
  onCancelRide: (id: string | number) => void;
  onClearDrafts: () => void;
  onChatPress: (item: any) => void;
  onRefresh: () => void;
  onLoadMore: () => void;
  hasMore: boolean;
  getTabData: (tab: MyRidesTab) => RideListItem[];
  drafts: any[];
  mappedRequests: any[];
  hasRequests: boolean;
  onMenuPress: () => void;
  onProfilePress: () => void;
  onAcceptRide: (id: string) => void;
  onRejectRide: (id: string) => void;
  confirmModalConfig: {
    isVisible: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    onConfirm: () => void;
    type?: 'info' | 'danger' | 'warning';
  };
  hideConfirmModal: () => void;
}
