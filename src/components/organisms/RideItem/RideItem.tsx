import React from 'react';
import { UpcomingRideCard } from '@/components/organisms/UpcomingRideCard';
import { CompactRideItem } from '@/components/molecules/CompactRideItem';
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
}

interface RideItemProps {
  item: RideListItem;
  activeTab: MyRidesTab;
  onRidePress: (id: string) => void;
  onCancelRide: (id: string | number) => void;
  onRemoveDraft: (id: string) => void;
}

export const RideItem: React.FC<RideItemProps> = React.memo(({ 
  item, 
  activeTab, 
  onRidePress, 
  onCancelRide, 
  onRemoveDraft 
}) => {
  if (activeTab === 'upcoming') {
    return (
      <UpcomingRideCard 
        timerLabel={item.timerLabel || ''}
        driverName={item.driverName || ''}
        carModel={item.carModel || ''}
        rating={item.rating || 5}
        price={item.price}
        avatarUri={item.avatarUri || ''}
        pickupTime={item.pickupTime || ''}
        pickupLocation={item.pickupLocation || ''}
        dropoffTime={item.dropoffTime || ''}
        dropoffLocation={item.dropoffLocation || ''}
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
