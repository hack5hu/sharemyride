import React from 'react';
import { UpcomingRideCard } from '@/components/organisms/UpcomingRideCard';
import { CompactRideItem } from '@/components/molecules/CompactRideItem';
import { MatchedRideBento } from '@/components/organisms/MatchedRideBento';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';
import { useTranslation } from '@/hooks/useTranslation';

export interface RideListItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  icon?: string;
  type: 'upcoming' | 'draft' | 'completed' | 'archive' | 'requests';
  rawDate?: Date;
  timerLabel?: string;
  driverName?: string;
  carModel?: string;
  rating?: number;
  avatarUri?: string;
  pickupTime?: string;
  pickupLocation?: string;
  dropoffTime?: string;
  dropoffLocation?: string;
  statusTag?: string;
  showActions?: boolean;
  role?: 'DRIVER' | 'PASSENGER';
}

interface RideItemProps {
  item: RideListItem;
  activeTab: MyRidesTab;
  onRidePress: (params: any) => void;
  onCancelRide: (id: string | number) => void;
  onRemoveDraft: (id: string) => void;
  onChatPress?: (item: any) => void;
  onAcceptRide?: (id: string) => void;
  onRejectRide?: (id: string) => void;
  isActionLoading?: boolean;
}

export const RideItem: React.FC<RideItemProps> = React.memo(
  ({
    item,
    activeTab,
    onRidePress,
    onCancelRide,
    onRemoveDraft,
    onChatPress,
    onAcceptRide,
    onRejectRide,
    isActionLoading,
  }) => {
    if (activeTab === 'requests') {
      return (
        <MatchedRideBento
          driverName={item.driverName || 'Passenger'}
          rating={item.rating || 5}
          totalRides={`${item.rating || 5} Rating`}
          avatarUri={item.avatarUri || ''}
          pickup={item.pickupLocation || ''}
          dropoff={item.dropoffLocation || ''}
          price={item.price}
          seatCount={item.statusTag}
          date={item.subtitle}
          onAccept={() => onAcceptRide?.(item.id)}
          onReject={() => onRejectRide?.(item.id)}
          onPress={() => onRidePress(item)}
          disabled={isActionLoading}
        />
      );
    }

    if (activeTab === 'upcoming') {
      return (
        <UpcomingRideCard
          timerLabel={item.timerLabel || ''}
          driverName={item.driverName || ''}
          carModel={item.carModel || ''}
          rating={item.rating ?? 0}
          price={item.price}
          avatarUri={item.avatarUri || ''}
          pickupTime={item.pickupTime || ''}
          pickupLocation={item.pickupLocation || ''}
          dropoffTime={item.dropoffTime || ''}
          dropoffLocation={item.dropoffLocation || ''}
          statusTag={item.statusTag}
          onPress={() => onRidePress(item)}
          onMorePress={() => onCancelRide(item.id)}
          onChatPress={() => onChatPress?.(item)}
          isDriver={item.role === 'DRIVER'}
        />
      );
    }

    return (
      <CompactRideItem
        title={item.title}
        subtitle={item.subtitle}
        price={item.price}
        icon={item.icon}
        type={
          activeTab === 'drafts'
            ? 'draft'
            : activeTab === 'archive'
            ? 'archive'
            : 'completed'
        }
        statusTag={item.statusTag}
        actionIcon={activeTab === 'drafts' ? 'delete-outline' : undefined}
        onActionPress={() =>
          activeTab === 'drafts' ? onRemoveDraft(item.id) : undefined
        }
        onPress={() => onRidePress(item)}
      />
    );
  },
);
