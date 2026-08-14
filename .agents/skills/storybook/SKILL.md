---
name: storybook
description: Writing visual preview stories and executing interactive browser tests using Vitest and Playwright in Storybook.
tags: [storybook, testing, validation]
link: ../../AGENTS.md
---

# Storybook Verification & Testing

## Overview
Automates and documents the process for registering components in Storybook and verifying them visually and interactively using Vitest.

## Key Files
| File / Script | Purpose |
|------|---------|
| `yarn storybook` | Starts local Storybook environment on `http://localhost:6006` |
| `npx vitest` | Runs automated play-function and browser interaction tests |
| `.storybook/` | Storybook configuration directory |
| `src/components/*/*/*.stories.tsx` | Specific component visual preview setups |

## Inputs
- Component to be verified
- Storybook config and stories templates

## Outputs
- Registered story showing state variants (e.g. disabled, active, loaded, error)
- Playwright-tested component behavior

## Examples
```bash
# Check if Storybook runs locally and compiles
yarn build-storybook
```

## Guardrails
- **ALWAYS** create a `.stories.tsx` file for every component created under `atoms`, `molecules`, or `organisms`.
- **NEVER** write story files for `templates` or `screens`.
- Story file must live in the exact same directory as the component.
- Ensure all stories follow the Meta/StoryObj format from Storybook v8/v10.
