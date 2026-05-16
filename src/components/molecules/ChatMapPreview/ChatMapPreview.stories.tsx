import type { Meta, StoryObj } from '@storybook/react-native-web-vite';

import { ChatMapPreview } from './ChatMapPreview';

const meta = {
  component: ChatMapPreview,
} satisfies Meta<typeof ChatMapPreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "latitude": 0,
    "longitude": 0
  },
};