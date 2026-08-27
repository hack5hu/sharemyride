import type { Meta, StoryObj } from '@storybook/react-native';
import { SeatButton } from './SeatButton';

const meta = {
  title: 'Atoms/SeatButton',
  component: SeatButton,
} satisfies Meta<typeof SeatButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Available: Story = {
  args: {
    id: '2',
    state: 'available',
    price: 310,
  },
};

export const Selected: Story = {
  args: {
    id: '2',
    state: 'selected',
    price: 310,
  },
};

export const Occupied: Story = {
  args: {
    id: '3',
    state: 'occupied',
    occupiedLabel: 'Booked',
  },
};

export const Driver: Story = {
  args: {
    id: 'driver',
    state: 'driver',
    driverLabel: 'Host',
  },
};

export const Unavailable: Story = {
  args: {
    id: '4',
    state: 'unavailable',
    unavailableLabel: 'Unavailable',
  },
};
