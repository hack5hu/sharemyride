import type { Meta, StoryObj } from '@storybook/react';
import { DriverStopStatus } from '@/components/molecules/StopItemCard';
import { StopGroupCard } from './StopGroupCard';

const meta: Meta<typeof StopGroupCard> = {
  title: 'Molecules/StopGroupCard',
  component: StopGroupCard,
};

export default meta;
type Story = StoryObj<typeof StopGroupCard>;

export const Default: Story = {
  args: {
    groupIndex: 1,
    group: {
      stopId: 1,
      stopName: 'Natthu Lassi Wala, Ghiya Mandi Rd, Chowk Bazar, Mathura, Uttar Pradesh',
      passengers: [
        {
          id: 'p1',
          userId: 'u1',
          passengerName: 'Brösmeli',
          pickupLocation: 'Chowk Bazar',
          status: DriverStopStatus.ACTIVE,
          distanceKm: 0.68,
          etaMinutes: 1,
          seatCount: 1,
        },
        {
          id: 'p2',
          userId: 'u2',
          passengerName: 'Bansal ji',
          pickupLocation: 'Chowk Bazar',
          status: DriverStopStatus.ACTIVE,
          distanceKm: 1.2,
          etaMinutes: 4,
          seatCount: 1,
        },
      ],
    },
    onChatPress: () => {},
    onCallPress: () => {},
  },
};
