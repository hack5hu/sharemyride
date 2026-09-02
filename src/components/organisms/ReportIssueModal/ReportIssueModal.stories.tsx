import React from 'react';
import { View } from 'react-native';
import { ReportIssueModal } from './ReportIssueModal';
import type { Meta, StoryObj } from '@storybook/react-native';

const meta = {
  title: 'Organisms/ReportIssueModal',
  component: ReportIssueModal,
} satisfies Meta<typeof ReportIssueModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Sample Label',
    icon: 'star',
    variant: 'primary',
  },
};
