import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RecentMessagesSection } from './RecentMessagesSection';
import { MessageStatus } from '@/constants/enums';

const meta = {
  title: 'Organisms/RecentMessagesSection',
  component: RecentMessagesSection,
} satisfies Meta<typeof RecentMessagesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    messages: [
      {
        id: 'msg1',
        name: 'Aarav Mehta',
        lastMessage: 'Sure, I will be at the pick-up point by 8 AM.',
        time: '08:45 AM',
        source: 'Indiranagar',
        destination: 'Whitefield',
        unreadCount: 2,
        isOnline: true,
        isVerified: true,
        lastMessageStatus: MessageStatus.DELIVERED,
      },
      {
        id: 'msg2',
        name: 'Priya Sharma',
        lastMessage: 'Thanks for the ride!',
        time: 'Yesterday',
        source: 'Koramangala',
        destination: 'Electronic City',
        unreadCount: 0,
        isOnline: false,
        isVerified: true,
        lastMessageStatus: MessageStatus.READ,
      },
    ],
    onMessagePress: (id: string) => console.log('Pressed message:', id),
  },
};
