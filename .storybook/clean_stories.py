import os
import re

base_dirs = ['src/components/atoms', 'src/components/molecules', 'src/components/organisms', 'src/components/templates']

for d in base_dirs:
    if not os.path.exists(d): continue
    for comp in os.listdir(d):
        comp_path = os.path.join(d, comp)
        if os.path.isdir(comp_path):
            story_file = os.path.join(comp_path, f'{comp}.stories.tsx')
            if os.path.exists(story_file):
                with open(story_file, 'r') as f:
                    content = f.read()
                
                # Reset Default story args to TODO state
                new_content = re.sub(
                    r'export const Default: Story = \{.*?args: \{.*?\}.*?\};',
                    f'export const Default: Story = {{\n  args: {{\n    // TODO: Add required props for {comp}\n  }},\n}};',
                    content,
                    flags=re.DOTALL
                )
                
                if new_content != content:
                    with open(story_file, 'w') as f:
                        f.write(new_content)
                    print(f"Cleaned {comp}")
