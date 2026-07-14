---
title: Testing Guide
tags: [instructions, testing, jest, storybook, vitest]
link: ../../AGENTS.md
---

# Testing Integration & Execution Guide

This document guides developers and AI agents on how to execute existing tests, write new unit tests, and integrate Storybook testing.

## Unit Testing with Jest

Unit testing is powered by **Jest** and **react-test-renderer** to test hooks, components, logic layers, and utilities.

### Test Files Location
* Place unit tests in files named `*.test.ts`, `*.test.tsx`, `*.spec.ts`, or `*.spec.tsx` inside the component folder or a nearby `__tests__/` directory.

### Running Unit Tests
Execute the test runner via Yarn:
```bash
yarn test
```

### Writing a Hook test
Example structure for testing custom hooks:
```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useComponentName } from './useComponentName';

describe('useComponentName', () => {
  it('should toggle active status on press', () => {
    const onPressMock = jest.fn();
    const { result } = renderHook(() => useComponentName(onPressMock));

    expect(result.current.isActive).toBe(false);

    act(() => {
      result.current.handlePress();
    });

    expect(result.current.isActive).toBe(true);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
```

---

## Storybook Testing with Vitest & Playwright

The repository is configured with **Vite**, **Vitest**, and **Playwright** to run browser-based interaction tests against Storybook stories.

### Storybook Dev Server
To start the Storybook local server for manual visual QA:
```bash
yarn storybook
```
This opens the Storybook dashboard at `http://localhost:6006`.

### Running Vitest Browser Tests
To execute automated Storybook tests using Vitest (which spins up Playwright to test components in a headless Chromium container):
```bash
npx vitest
```
To run it in watch mode:
```bash
npx vitest --watch
```

### Visual Regression / Story Files
Every atom, molecule, and organism must have a corresponding `.stories.tsx` file for Storybook registration:
```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Atoms/ComponentName',
  component: ComponentName,
  argTypes: {
    onPress: { action: 'pressed' },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

export const Default: Story = {
  args: {
    label: 'Standard Label',
  },
};
```
> [!IMPORTANT]
> Never create `.stories.tsx` files for screens or templates. They must strictly belong in component atomic folders (`atoms`, `molecules`, `organisms`).
