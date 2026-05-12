import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmationModal } from './ConfirmationModal';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/ConfirmationModal',
  component: ConfirmationModal,

} satisfies Meta<typeof ConfirmationModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "star"
  },
};
