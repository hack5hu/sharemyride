import React from 'react';
import { UpcomingRideCard } from '@/components/organisms/UpcomingRideCard';
import { CompactRideItem } from '@/components/molecules/CompactRideItem';
import { MatchedRideBento } from '@/components/organisms/MatchedRideBento';
import { MyRidesTab } from '@/components/organisms/MyRidesHeader/types.d';

export interface RideListItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  icon?: string;
  type: 'upcoming' | 'draft' | 'completed';
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
}

interface RideItemProps {
  item: RideListItem;
  activeTab: MyRidesTab;
  onRidePress: (id: string) => void;
  onCancelRide: (id: string | number) => void;
  onRemoveDraft: (id: string) => void;
  onAcceptRide?: (id: string) => void;
  onRejectRide?: (id: string) => void;
}

export const RideItem: React.FC<RideItemProps> = React.memo(({ 
  item, 
  activeTab, 
  onRidePress, 
  onCancelRide, 
  onRemoveDraft,
  onAcceptRide,
  onRejectRide,
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
        onPress={() => onRidePress(item.id)}
      />
    );
  }

  if (activeTab === 'upcoming') {
    return (
      <UpcomingRideCard 
        timerLabel={item.timerLabel || ''}
        driverName={item.driverName || ''}
        carModel={item.carModel || ''}
        rating={item.rating}
        price={item.price}
        avatarUri={item.avatarUri || ''}
        pickupTime={item.pickupTime || ''}
        pickupLocation={item.pickupLocation || ''}
        dropoffTime={item.dropoffTime || ''}
        dropoffLocation={item.dropoffLocation || ''}
        statusTag={item.statusTag}
        onPress={() => onRidePress(item.id)}
        onMorePress={() => onCancelRide(item.id)}
      />
    );
  }

  return (
    <CompactRideItem 
      title={item.title}
      subtitle={item.subtitle}
      price={item.price}
      icon={item.icon}
      type={activeTab === 'drafts' ? 'draft' : 'completed'}
      actionIcon={activeTab === 'drafts' ? 'delete-outline' : undefined}
      onActionPress={() => activeTab === 'drafts' ? onRemoveDraft(item.id) : undefined}
      onPress={() => onRidePress(item.id)}
    />
  );
});
