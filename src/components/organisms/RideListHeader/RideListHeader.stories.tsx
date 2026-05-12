import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RideListHeader } from './RideListHeader';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/RideListHeader',
  component: RideListHeader,

} satisfies Meta<typeof RideListHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClearDrafts: () => {},
    activeTab: "upcoming",
    draftsCount: 5,
    requests: []
  },
};
