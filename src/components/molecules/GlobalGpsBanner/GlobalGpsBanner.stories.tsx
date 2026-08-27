import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GlobalGpsBanner } from './GlobalGpsBanner';

const meta: Meta<typeof GlobalGpsBanner> = {
  title: 'Molecules/GlobalGpsBanner',
  component: GlobalGpsBanner,
};

export default meta;

type Story = StoryObj<typeof GlobalGpsBanner>;

export const Default: Story = {
  args: {},
};
