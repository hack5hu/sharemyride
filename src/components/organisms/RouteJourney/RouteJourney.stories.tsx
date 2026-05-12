import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RouteJourney } from './RouteJourney';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/RouteJourney',
  component: RouteJourney,

} satisfies Meta<typeof RouteJourney>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for RouteJourney
  },
};
