import React from 'react';
import { Button } from '@/components/atoms/Button';
import { FixedFooter } from './FixedFooter';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta: Meta<typeof FixedFooter> = {
  title: 'Molecules/FixedFooter',
  component: FixedFooter,
};

export default meta;
type Story = StoryObj<typeof FixedFooter>;

export const Default: Story = {
  args: {
    children: <Button variant="primary">Continue</Button>,
  },
};
