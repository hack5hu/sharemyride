import React, { useState } from 'react';
import { View } from 'react-native';
import { RideTypeToggle } from './RideTypeToggle';
import { RideType } from './types.d';

export default {
  title: 'Molecules/RideTypeToggle',
  component: RideTypeToggle,
};

export const Default = () => {
  const [selected, setSelected] = useState<RideType>('intercity');
  return (
    <View style={{ padding: 20 }}>
      <RideTypeToggle
        selected={selected}
        onSelect={setSelected}
        localLabel="Local"
        intercityLabel="Intercity"
      />
    </View>
  );
};
