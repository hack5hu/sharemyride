---
name: navigation
description: Implementing screen transitions, route declarations, and stack registrations in RootNavigator using useAppNavigation.
tags: [navigation, routing, screens]
link: ../../AGENTS.md
---

# Screen Transitions & Routing Management

## Overview
Coordinates screen-to-screen transitions and ensures all routes are declared within the Central Stack Navigator.

## Key Files
| File / Hook | Purpose |
|------|---------|
| `src/hooks/useAppNavigation.ts` | Type-safe transition methods hook |
| `src/navigation/types.d.ts` | Route name definitions and parameter types |
| `src/navigation/RootNavigator.tsx` | Main React Navigation Stack configuration |

## Inputs
- Transition destination name and parameter requirements
- New screen registration request

## Outputs
- Typesafe navigation call in component hook (e.g. `navigate('ChatDetails', { userId })`)
- Registered route mapping in `RootNavigator.tsx`

## Examples
### Registering a Route in `RootNavigator.tsx`:
```typescript
import { ScreenName } from '@/screens/ScreenName';

// Inside Stack.Navigator:
<Stack.Screen name="ScreenName" component={ScreenName} />
```

## Guardrails
- **NEVER** use standard React Navigation `useNavigation` directly in hooks or screens. Always import and use `useAppNavigation` to ensure transitions are throttled and type-checked.
- Ensure new screen routes are added to the `RootStackParamList` in `src/navigation/types.d.ts`.
- Avoid passing massive objects as navigation params. Pass resource IDs (e.g., `rideId`) and let the target screen load the data from Zustand stores or services.
