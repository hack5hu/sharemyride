import React, { useState } from 'react';
import { View } from 'react-native';
import { RideTypeToggle } from './RideTypeToggle';
import { RideType } from './types.d';
import { Meta } from '@storybook/react-native';

const wrapperStyle = { padding: 20 };

const meta: Meta<typeof RideTypeToggle> = {
  title: 'Molecules/RideTypeToggle',
  component: RideTypeToggle,
  decorators: [
    Story => (
      <View style={wrapperStyle}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

export const Default = () => {
  const [selected, setSelected] = useState<RideType>('intercity');
  return (
    <RideTypeToggle
      selected={selected}
      onSelect={setSelected}
      localLabel="Local"
      intercityLabel="Intercity"
    />
  );
};
