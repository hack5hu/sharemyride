import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileMenuItem } from './ProfileMenuItem';
import { View } from 'react-native';

const meta = {
  title: 'Molecules/ProfileMenuItem',
  component: ProfileMenuItem,

} satisfies Meta<typeof ProfileMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPress: () => console.log("Pressed"),
    title: "Sample Title",
    subtitle: "Sample Subtitle",
    icon: "star"
  },
};
