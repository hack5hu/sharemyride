import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileHeader } from './ProfileHeader';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/ProfileHeader',
  component: ProfileHeader,

} satisfies Meta<typeof ProfileHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rides: [],
    avatarUri: "https://i.pravatar.cc/150",
    name: "User Name",
    rating: 4.5
  },
};
