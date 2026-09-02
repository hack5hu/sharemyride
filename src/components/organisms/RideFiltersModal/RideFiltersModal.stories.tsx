import React from 'react';
import { View } from 'react-native';
import { RideFiltersModal } from './RideFiltersModal';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/RideFiltersModal',
  component: RideFiltersModal,
} satisfies Meta<typeof RideFiltersModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    t: {},
  },
};
