import type { Meta, StoryObj } from '@storybook/react-native';
import { DriverCardSection } from './DriverCardSection';

const meta = {
  title: 'Molecules/DriverCardSection',
  component: DriverCardSection,
} satisfies Meta<typeof DriverCardSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    driver: {
      id: 'driver-1',
      name: 'David L.',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      rating: 4.9,
      vehicleModel: 'Toyota Prius',
      licensePlate: 'ABC-1234',
      phone: '+919876543210',
    },
    chatLabel: 'Chat',
    callLabel: 'Call',
    onChatPress: () => {},
    onCallPress: () => {},
  },
};
