import React from 'react';
import { View } from 'react-native';
import { ModalBackdrop } from './ModalBackdrop';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Atoms/ModalBackdrop',
  component: ModalBackdrop,
} satisfies Meta<typeof ModalBackdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for ModalBackdrop
  },
};
