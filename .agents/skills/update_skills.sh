#!/bin/bash

# Find all SKILL.md files in subdirectories of .agents/skills/
SKILLS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_FILE="$SKILLS_DIR/SKILLS.yaml"

echo "# Auto-generated agent skills catalog. Run update_skills.sh to regenerate." > "$OUTPUT_FILE"
echo "skills:" >> "$OUTPUT_FILE"

# Iterate over all SKILL.md files
find "$SKILLS_DIR" -name "SKILL.md" | while read -r skill_file; do
  # Get relative path from .agents/skills/
  rel_path=$(python3 -c "import os; print(os.path.relpath('$skill_file', '$SKILLS_DIR'))")
  
  # Read the frontmatter
  in_frontmatter=0
  name=""
  description=""
  tags=""
  
  while IFS= read -r line || [ -n "$line" ]; do
    if [[ "$line" == "---" ]]; then
      if [[ $in_frontmatter -eq 0 ]]; then
        in_frontmatter=1
      else
        break
      fi
      continue
    fi
    
    if [[ $in_frontmatter -eq 1 ]]; then
      if [[ "$line" =~ ^name:[[:space:]]*(.*)$ ]]; then
        name="${BASH_REMATCH[1]}"
      elif [[ "$line" =~ ^description:[[:space:]]*(.*)$ ]]; then
        description="${BASH_REMATCH[1]}"
      elif [[ "$line" =~ ^tags:[[:space:]]*\[(.*)\]$ ]]; then
        tags="${BASH_REMATCH[1]}"
      fi
    fi
  done < "$skill_file"
  
  # Clean quotes from values
  name=$(echo "$name" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
  description=$(echo "$description" | sed -e 's/^"//' -e 's/"$//' -e "s/^'//" -e "s/'$//")
  
  echo "  - name: \"$name\"" >> "$OUTPUT_FILE"
  echo "    description: \"$description\"" >> "$OUTPUT_FILE"
  echo "    tags: [$tags]" >> "$OUTPUT_FILE"
  echo "    path: \".agents/skills/$rel_path\"" >> "$OUTPUT_FILE"
done

echo "Successfully updated $OUTPUT_FILE"
