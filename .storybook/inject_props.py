import os
import re

base_dirs = ['src/components/atoms', 'src/components/molecules', 'src/components/organisms', 'src/components/templates']

common_props = {
    'onPress': '() => console.log("Pressed")',
    'onChange': '() => {}',
    'onSubmit': '() => {}',
    'onSelect': '() => {}',
    'onActionPress': '() => {}',
    'onClearDrafts': '() => {}',
    'onConfirm': '() => {}',
    'onDismiss': '() => {}',
    'price': '450',
    'title': '"Sample Title"',
    'subtitle': '"Sample Subtitle"',
    'label': '"Sample Label"',
    'message': '"Sample Message"',
    'activeTab': '"upcoming"',
    'draftsCount': '5',
    'items': '[]',
    'data': '[]',
    'vehicles': '[]',
    'rides': '[]',
    'reasons': '[]',
    'points': '[]',
    'features': '[]',
    'requests': '[]',
    'avatarUri': '"https://i.pravatar.cc/150"',
    'source': '{ uri: "https://i.pravatar.cc/150" }',
    'icon': '"star"',
    'name': '"User Name"',
    'rating': '4.5',
    'date': 'new Date().toLocaleDateString()',
    'time': '"10:00 AM"',
    'status': '"active"',
    'type': '"default"',
    'variant': '"primary"',
    'size': '"md"',
    't': '{}',
}

for d in base_dirs:
    if not os.path.exists(d): continue
    for comp in os.listdir(d):
        comp_path = os.path.join(d, comp)
        if os.path.isdir(comp_path):
            tsx_file = os.path.join(comp_path, f'{comp}.tsx')
            story_file = os.path.join(comp_path, f'{comp}.stories.tsx')
            
            if os.path.exists(tsx_file) and os.path.exists(story_file):
                with open(tsx_file, 'r') as f:
                    tsx_content = f.read()
                
                # Extract Props interface/type
                props_match = re.search(r'(?:interface|type)\s+\w+Props\s*(?:=)?\s*\{([^}]*)\}', tsx_content, re.DOTALL)
                props_text = props_match.group(1) if props_match else tsx_content
                
                found_props = {}
                for prop_name in common_props.keys():
                    if re.search(r'\b' + prop_name + r'(\?|:)', props_text):
                        found_props[prop_name] = common_props[prop_name]
                
                if found_props:
                    with open(story_file, 'r') as f:
                        story_content = f.read()
                    
                    args_template = "args: {\n"
                    for p, v in found_props.items():
                        args_template += f"    {p}: {v},\n"
                    args_template = args_template.rstrip(',\n') + "\n  }"
                    
                    # Target ONLY the Default story args
                    new_story_content = re.sub(
                        r'(export const Default: Story = \{.*?args: )\{[^}]*\}',
                        r'\1' + args_template.replace('args: ', ''),
                        story_content,
                        flags=re.DOTALL
                    )
                    
                    if new_story_content != story_content:
                        with open(story_file, 'w') as f:
                            f.write(new_story_content)
                        print(f"Final Prop Injection: {comp}")
