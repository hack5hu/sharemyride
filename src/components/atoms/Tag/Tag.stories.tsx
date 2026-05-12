import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import { View } from 'react-native';

const meta = {
  title: 'Atoms/Tag',
  component: Tag,

} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for Tag
  },
};
