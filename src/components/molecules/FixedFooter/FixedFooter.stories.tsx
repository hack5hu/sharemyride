import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FixedFooter } from './FixedFooter';
import { Button } from '@/components/atoms/Button';

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
