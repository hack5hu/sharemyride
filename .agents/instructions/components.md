---
title: Components Tutorial
tags: [instructions, components, styling, storybook]
link: ../../AGENTS.md
---

# Components Architecture & Creation Tutorial

This instruction guide walks through the step-by-step process of creating, extending, and testing UI components in this repository.

## Atomic Design Hierarchy

All UI components must be organized into one of the following atomic tiers in `src/components/`:

1. **Atoms** (`src/components/atoms/`): Basic building blocks. Logic-free, customizable, wrapping React Native base controls. Examples: `Button`, `Typography`, `Box`, `Input`.
2. **Molecules** (`src/components/molecules/`): Lightweight combinations of atoms that form a simple functional component. Examples: `FormField`, `OtpInput`, `MessageBubble`.
3. **Organisms** (`src/components/organisms/`): Complex, high-level layouts combining atoms and molecules. Can include UI state/interactions but should remain modular. Examples: `MapViewer`, `LoginForm`, `RidersHorizontalList`.
4. **Templates** (`src/components/templates/`): Screen-level layout wrappers defining structure, placeholders, and scrolls. Do not define business logic. Every screen must have exactly one template. Examples: `LoginTemplate`, `OTPVerificationTemplate`.

---

## Component Folder Blueprint

Every new component must follow this exact file structure:

```text
ComponentName/
├── ComponentName.tsx           # React.memo UI structure only (Logic-free)
├── ComponentName.styles.ts     # styled-components only
├── useComponentName.ts         # Handlers, hooks, API calls, and local state
├── ComponentName.stories.tsx   # Storybook stories (Required for Atoms, Molecules, Organisms)
├── types.d.ts                  # TypeScript interfaces and type declarations
└── index.ts                    # Clean barrel export
```

### 1. Type Declarations (`types.d.ts`)
Define props explicitly. Avoid inline typing.
```typescript
import { ViewStyle } from 'react-native';

export interface ComponentNameProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}
```

### 2. Styles (`ComponentName.styles.ts`)
Use only `styled-components/native` with theme tokens and scaling utils.
```typescript
import styled from 'styled-components/native';
import { Box } from 'atoms/Box';
import { moderateScale, scale } from '@/styles/scale';

export const Container = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${moderateScale(12)}px;
  width: ${scale(320)}px;
`;
```

### 3. Logic Hook (`useComponentName.ts`)
House all event handlers, API triggers, and state computations here.
```typescript
import { useCallback, useState } from 'react';

export const useComponentName = (onPress: () => void) => {
  const [isActive, setIsActive] = useState(false);

  const handlePress = useCallback(() => {
    setIsActive((prev) => !prev);
    onPress();
  }, [onPress]);

  return {
    isActive,
    handlePress,
  };
};
```

### 4. UI Layout (`ComponentName.tsx`)
Keep it clean, logic-free, and memoized.
```typescript
import React from 'react';
import { Typography } from 'atoms/Typography';
import { Button } from 'atoms/Button';
import * as S from './ComponentName.styles';
import { useComponentName } from './useComponentName';
import { ComponentNameProps } from './types';

export const ComponentName = React.memo(({ label, onPress }: ComponentNameProps) => {
  const { isActive, handlePress } = useComponentName(onPress);

  return (
    <S.Container>
      <Typography variant="body1">{label}</Typography>
      <Button onPress={handlePress} title={isActive ? 'Active' : 'Inactive'} />
    </S.Container>
  );
});
```

### 5. Barrel Export (`index.ts`)
```typescript
export { ComponentName } from './ComponentName';
export * from './types.d';
```

---

## The Pre-Flight Checklist
Before writing a single component line, run the following sequence:
1. **Search Storybook MCP / Repository**: Check if a similar component exists in `src/components/`. If yes, extend it rather than writing a new one.
2. **Review Style Guide**: No borders (use tonal shift), no inline styles, no raw RN primitives (`View`, `Text` etc.).
3. **Keep File Length Under 200 Lines**: If any of the files in your directory exceed 200 lines, split them into smaller helper functions or components.
4. **Define Localizations**: Add translation keys to `baseLocalization.ts` and fetch strings using `useLocale()`. Never hardcode text.
