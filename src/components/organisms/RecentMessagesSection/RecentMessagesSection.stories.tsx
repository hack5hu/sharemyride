import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RecentMessagesSection } from './RecentMessagesSection';
import { View } from 'react-native';

const meta = {
  title: 'Organisms/RecentMessagesSection',
  component: RecentMessagesSection,

} satisfies Meta<typeof RecentMessagesSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for RecentMessagesSection
  },
};
