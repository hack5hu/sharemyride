import type { Meta, StoryObj } from '@storybook/react-native';
import { CarFloorPlan } from './CarFloorPlan';
import { FIVE_SEATER_ROWS } from './seatConfig';

const meta = {
  title: 'Organisms/CarFloorPlan',
  component: CarFloorPlan,
} satisfies Meta<typeof CarFloorPlan>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: FIVE_SEATER_ROWS,
    selectedSeats: new Set([2]),
    occupiedSeats: new Set([3]),
    unavailableSeats: new Set([4]),
    prices: { 2: 310, 3: 310, 5: 310 },
    onSeatPress: () => {},
    driverLabel: 'Host',
    occupiedLabel: 'Booked',
    unavailableLabel: 'Unavailable',
  },
};
