---
name: components
description: Creating and extending reusable UI components under atoms, molecules, organisms, or templates.
tags: [components, library, design system]
link: ../../AGENTS.md
---

# UI Components Management

## Overview
Guides the creation, composition, and extension of atomic components following the strict styled-components rules.

## Key Files
| File | Purpose |
|------|---------|
| `src/components/atoms/` | Reusable primitive components (Button, Box, Typography) |
| `src/components/molecules/` | Intermediate components (FormField, Card, ListItem) |
| `src/components/organisms/` | High-level widgets and sections (Header, MapViewer) |
| `src/components/templates/` | Layout shells for screens |

## Inputs
- Component specifications (props, design layout, tier details)
- Theme tokens and scaling rules

## Outputs
- A complete component folder with:
  - `ComponentName.tsx` (UI layout)
  - `ComponentName.styles.ts` (Styled styles)
  - `useComponentName.ts` (Logic hook)
  - `ComponentName.stories.tsx` (Storybook file)
  - `types.d.ts` (TypeScript types)
  - `index.ts` (Barrel export)

## Examples
```typescript
// Importing existing atoms in a new component:
import { Button } from 'atoms/Button';
import { Box } from 'atoms/Box';
import { Typography } from 'atoms/Typography';
```

## Guardrails
- **NEVER** use React Native raw components (`View`, `Text`, `TouchableOpacity`).
- **NEVER** write inline styles or use `StyleSheet.create`.
- **ALWAYS** wrap dimensions, fonts, paddings, and radii in scaling functions (`scale`, `verticalScale`, `moderateScale`, `responsiveFont`).
- Strict TypeScript: `any` is forbidden.
- Maximum line limit: **200 lines per file**.
