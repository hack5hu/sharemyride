import os

directory = 'src/components/templates/SummaryPublishTemplate/components'
components = ['GridInfo', 'PreferenceList', 'PublishFooter', 'RouteSummary', 'ScheduleCard']

templates = {
    'GridInfo': """import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GridInfo } from './GridInfo';

const meta = {
  title: 'Templates/SummaryPublishTemplate/Components/GridInfo',
  component: GridInfo,
  tags: ['autodocs'],
} satisfies Meta<typeof GridInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    vehicle: {
      name: 'Toyota Fortuner',
      subText: 'White • SUV',
      numberplate: 'MH 12 AB 1234'
    },
    pricing: {
      seatCount: 4,
      pricePerSeat: '₹450'
    },
    onEditVehicle: () => console.log('Edit Vehicle'),
    onEditSeats: () => console.log('Edit Seats'),
    t: {
      vehicleLabel: 'Vehicle Details',
      availabilityLabel: 'Availability',
      addVehicleLabel: 'Add Vehicle'
    }
  },
};

export const Empty: Story = {
  args: {
    vehicle: null,
    pricing: {
      seatCount: 0,
      pricePerSeat: '₹0'
    },
    onEditVehicle: () => console.log('Edit Vehicle'),
    onEditSeats: () => console.log('Edit Seats'),
    t: {
      vehicleLabel: 'Vehicle Details',
      availabilityLabel: 'Availability',
      addVehicleLabel: 'Add Vehicle'
    }
  },
};
""",
    'PreferenceList': """import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PreferenceList } from './PreferenceList';

const meta = {
  title: 'Templates/SummaryPublishTemplate/Components/PreferenceList',
  component: PreferenceList,
  tags: ['autodocs'],
} satisfies Meta<typeof PreferenceList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    preferences: [
      { id: '1', icon: 'smoke-free', label: 'No Smoking' },
      { id: '2', icon: 'pets', label: 'Pets Allowed' },
      { id: '3', icon: 'music-note', label: 'Music' }
    ],
    onEdit: () => console.log('Edit Preferences'),
    t: {
      ridePreferencesLabel: 'Ride Preferences',
      addPreferencesLabel: 'Add Preferences'
    }
  },
};

export const Empty: Story = {
  args: {
    preferences: [],
    onEdit: () => console.log('Edit Preferences'),
    t: {
      ridePreferencesLabel: 'Ride Preferences',
      addPreferencesLabel: 'Add Preferences'
    }
  },
};
""",
    'PublishFooter': """import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PublishFooter } from './PublishFooter';

const meta = {
  title: 'Templates/SummaryPublishTemplate/Components/PublishFooter',
  component: PublishFooter,
  tags: ['autodocs'],
} satisfies Meta<typeof PublishFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPublish: () => console.log('Publish'),
    isPublishing: false,
    t: {
      publishButton: 'Publish Ride',
      publishingLabel: 'Publishing...'
    }
  },
};

export const Publishing: Story = {
  args: {
    onPublish: () => console.log('Publish'),
    isPublishing: true,
    t: {
      publishButton: 'Publish Ride',
      publishingLabel: 'Publishing...'
    }
  },
};
""",
    'RouteSummary': """import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RouteSummary } from './RouteSummary';

const meta = {
  title: 'Templates/SummaryPublishTemplate/Components/RouteSummary',
  component: RouteSummary,
  tags: ['autodocs'],
} satisfies Meta<typeof RouteSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    origin: 'Hinjewadi Phase 1, Pune',
    destination: 'Kharadi, Pune',
    stops: [
      { id: '1', name: 'Baner' },
      { id: '2', name: 'Wakad' }
    ],
    onEdit: () => console.log('Edit Route'),
    t: {
      routeLabel: 'Route Details'
    }
  },
};
""",
    'ScheduleCard': """import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ScheduleCard } from './ScheduleCard';

const meta = {
  title: 'Templates/SummaryPublishTemplate/Components/ScheduleCard',
  component: ScheduleCard,
  tags: ['autodocs'],
} satisfies Meta<typeof ScheduleCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: 'Wednesday, 25 May',
    time: '08:30 AM',
    onEdit: () => console.log('Edit Schedule'),
    t: {
      scheduleLabel: 'Schedule'
    }
  },
};
"""
}

for comp, content in templates.items():
    story_path = os.path.join(directory, f'{comp}.stories.tsx')
    with open(story_path, 'w') as f:
        f.write(content)
    print(f"Created {story_path}")
