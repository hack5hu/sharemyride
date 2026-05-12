import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ModalBackdrop } from './ModalBackdrop';
import { View } from 'react-native';

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
