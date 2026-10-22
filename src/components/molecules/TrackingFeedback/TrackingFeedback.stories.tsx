import { type Meta, type StoryObj } from '@storybook/react-native-web-vite';
import { expect, within } from 'storybook/test';
import { TrackingDisplayStatus } from '@/constants/liveLocation';
import { en } from '@/constants/localization/tracking/en';
import { TrackingFeedback } from './TrackingFeedback';

const meta = { title: 'Molecules/TrackingFeedback', component: TrackingFeedback } satisfies Meta<typeof TrackingFeedback>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Live: Story = {
  args: { status: TrackingDisplayStatus.LIVE, secondsSinceUpload: 5 },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText(en.live)).toBeVisible();
  },
};
export const Connecting: Story = { args: { status: TrackingDisplayStatus.CONNECTING } };
export const Delayed: Story = {
  args: { status: TrackingDisplayStatus.DELAYED, secondsSinceUpload: 45 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(en.delayed)).toBeVisible();
    await expect(canvas.queryByText(en.live)).toBeNull();
  },
};
export const Offline: Story = {
  args: { status: TrackingDisplayStatus.OFFLINE, secondsSinceUpload: 20 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(en.offline)).toBeVisible();
    await expect(canvas.queryByText(en.live)).toBeNull();
  },
};
export const Paused: Story = { args: { status: TrackingDisplayStatus.PAUSED } };
export const SignInRequired: Story = { args: { status: TrackingDisplayStatus.AUTH_REQUIRED } };
export const PermissionRequired: Story = { args: { status: TrackingDisplayStatus.PERMISSION_REQUIRED } };
