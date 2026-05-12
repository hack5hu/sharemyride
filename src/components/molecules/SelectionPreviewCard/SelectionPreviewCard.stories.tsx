import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SelectionPreviewCard } from './SelectionPreviewCard';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/SelectionPreviewCard',
  component: SelectionPreviewCard,

} satisfies Meta<typeof SelectionPreviewCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Sample Label",
    icon: "star"
  },
};
