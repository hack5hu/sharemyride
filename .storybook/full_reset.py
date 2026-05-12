import os

base_dirs = ['src/components/atoms', 'src/components/molecules', 'src/components/organisms', 'src/components/templates']

template = """import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { COMP_NAME } from './COMP_NAME';
import { View } from 'react-native';

const meta = {
  title: 'CATEGORY_NAME/COMP_NAME',
  component: COMP_NAME,

} satisfies Meta<typeof COMP_NAME>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // TODO: Add required props for COMP_NAME
  },
};
"""

for d in base_dirs:
    if not os.path.exists(d): continue
    category = d.split('/')[-1].capitalize()
    for comp in os.listdir(d):
        comp_path = os.path.join(d, comp)
        if os.path.isdir(comp_path):
            tsx_file = os.path.join(comp_path, f'{comp}.tsx')
            story_file = os.path.join(comp_path, f'{comp}.stories.tsx')
            if os.path.exists(tsx_file) and os.path.exists(story_file):
                content = template.replace('COMP_NAME', comp).replace('CATEGORY_NAME', category)
                with open(story_file, 'w') as f:
                    f.write(content)
                print(f"Safe Reset {comp}")
