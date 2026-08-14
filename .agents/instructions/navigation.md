---
title: Navigation Guide
tags: [instructions, navigation, routing]
link: ../../AGENTS.md
---

# Navigation Integration Guide

This guide describes how screen transitions, parameter mappings, and routing paths are configured and executed within the application.

## Strict Navigation Typing

All screen routes and their respective parameter objects must be declared in `src/navigation/types.d.ts` inside the `RootStackParamList` object mapping.

* **Non-Parameterized Screens**: Should be typed as `undefined`.
  ```typescript
  Splash: undefined;
  Login: undefined;
  ```
* **Parameterized Screens**: Should be typed as a concrete object or union:
  ```typescript
  OTPVerification: {
    phoneNumber: string;
    mode?: 'sms' | 'truecaller';
    ttl?: string;
  };
  ```

---

## Screen Transitions via `useAppNavigation`

To prevent loose type casting (`as any`) and ensure double-tap throttle protection, you must use the custom `useAppNavigation` hook from `@/hooks/useAppNavigation`.

> [!WARNING]
> Never use standard `useNavigation()` from `@react-navigation/native` directly in screens or logic hooks. Always use `useAppNavigation()`.

### Example Hook Usage:
```typescript
import { useAppNavigation } from '@/hooks/useAppNavigation';

export const useMyComponent = () => {
  const { navigate, goBack, replace, resetTo } = useAppNavigation();

  const handleNext = () => {
    // Correctly typesafe parameter requirements enforced by TypeScript
    navigate('OTPVerification', {
      phoneNumber: '+919999999999',
      mode: 'sms',
    });
  };

  const handleGoBack = () => {
    goBack();
  };

  return { handleNext, handleGoBack };
};
```

### Hook API Methods

* `navigate(name, params)`: Navigates to a screen in the stack (throttled).
* `push(name, params)`: Pushes a new screen onto the stack (throttled).
* `replace(name, params)`: Replaces current screen on the stack with target (throttled).
* `goBack()`: Pops current screen from the stack (throttled).
* `pop(count)`: Pops `count` screens from the stack (throttled).
* `popToTop()`: Pops all screens back to the root of the stack (throttled).
* `resetTo(name, params)`: Clears navigation history and sets target as the sole root screen (throttled).
* `resetWithStack(routes)`: Resets stack history to a specific list sequence of routes (throttled).
* `setParams(params)`: Updates current route parameters dynamically.
