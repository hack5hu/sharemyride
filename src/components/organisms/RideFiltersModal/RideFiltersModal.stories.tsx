import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RideFiltersModal } from './RideFiltersModal';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/RideFiltersModal',
  component: RideFiltersModal,

} satisfies Meta<typeof RideFiltersModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    t: {}
  },
};
