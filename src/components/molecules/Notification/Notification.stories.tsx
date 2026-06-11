import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from './Notification';
import { View } from 'react-native';
import { NotificationType } from '@/constants/enums';

const meta = {
  title: 'Molecules/Notification',
  component: Notification,
  decorators: [
    (Story) => (
      <View style={{ padding: 20, alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: NotificationType.SUCCESS,
    text1: 'Successfully Saved',
    text2: 'Your ride preferences has been updated.',
  },
};

export const Error: Story = {
  args: {
    type: NotificationType.ERROR,
    text1: 'Failed to Save',
    text2: 'Something went wrong. Please try again.',
  },
};

export const Warning: Story = {
  args: {
    type: NotificationType.WARNING,
    text1: 'Incomplete Profile',
    text2: 'Please complete your profile to continue.',
  },
};

export const Info: Story = {
  args: {
    type: NotificationType.INFO,
    text1: 'New Update',
    text2: 'A new version of the app is available.',
  },
};
