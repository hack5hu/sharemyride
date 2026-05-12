import os
import re

d = 'src/components/organisms'
for comp in os.listdir(d):
    comp_path = os.path.join(d, comp)
    if os.path.isdir(comp_path):
        story_file = os.path.join(comp_path, f'{comp}.stories.tsx')
        if os.path.exists(story_file):
            content = f"""import React from 'react';
import type {{ Meta, StoryObj }} from '@storybook/react';
import {{ {comp} }} from './{comp}';
import {{ View }} from 'react-native';

const meta = {{
  title: 'Organisms/{comp}',
  component: {comp},
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <View style={{ padding: 20 }}>
        <Story />
      </View>
    ),
  ],
}} satisfies Meta<typeof {comp}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {{
  args: {{
    // TODO: Add required props for {comp}
  }},
}};
"""
            with open(story_file, 'w') as f:
                f.write(content)
            print(f"Reset {comp}")
