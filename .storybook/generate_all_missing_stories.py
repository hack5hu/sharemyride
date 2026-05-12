import os

base_dirs = ['src/components/atoms', 'src/components/molecules', 'src/components/organisms', 'src/components/templates']

template = """import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { {component_name} } from './{component_name}';
import { View } from 'react-native';

const meta = {
  title: '{category}/{component_name}',
  component: {component_name},
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <View style={{ padding: 20 }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof {component_name}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for {component_name}
  },
};
"""

for d in base_dirs:
    category = d.split('/')[-1].capitalize()
    if not os.path.exists(d): continue
    for comp in os.listdir(d):
        comp_path = os.path.join(d, comp)
        if os.path.isdir(comp_path):
            story_path = os.path.join(comp_path, f'{comp}.stories.tsx')
            if not os.path.exists(story_path):
                # Check if the component file exists (tsx)
                if os.path.exists(os.path.join(comp_path, f'{comp}.tsx')):
                    with open(story_path, 'w') as f:
                        f.write(template.replace('{component_name}', comp).replace('{category}', category))
                    print(f"Created story for {comp}")
