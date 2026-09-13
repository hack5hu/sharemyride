import { type Meta, type StoryObj } from '@storybook/react-native';
import { expect, fn, userEvent, within } from 'storybook/test';
import { en } from '@/constants/localization/en';
import { FrontSeatPremium } from './FrontSeatPremium';

const copy = en.priceSelection;
const meta = {
  title: 'Molecules/FrontSeatPremium', component: FrontSeatPremium,
  args: {
    checked: false, premium: 0, basePrice: 50,
    onToggle: fn(), onPremiumChange: fn(),
    title: copy.frontSeatPremiumTitle, description: copy.frontSeatPremiumDesc,
    amountLabel: copy.premiumAmountLabel, maxNote: copy.maxLimitNote,
  },
} satisfies Meta<typeof FrontSeatPremium>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const RoundedPremium: Story = {
  args: { checked: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('premium-increase'));
    await expect(args.onPremiumChange).toHaveBeenCalledWith(10);
  },
};
export const AtMaximum: Story = {
  args: { checked: true, premium: 10 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText(copy.maxLimitNote)).toBeVisible();
    await expect(canvas.getByTestId('premium-increase')).toHaveAttribute('aria-disabled', 'true');
  },
};
export const CityRideFiveStep: Story = {
  args: { checked: true, basePrice: 50, step: 5 },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByTestId('premium-increase'));
    await expect(args.onPremiumChange).toHaveBeenCalledWith(5);
  },
};
