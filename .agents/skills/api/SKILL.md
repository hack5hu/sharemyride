---
name: api
description: Centralizing API services under serviceManager and managing async network operations inside hooks.
tags: [api, services, networking, axios]
link: ../../AGENTS.md
---

# API Integration & Services Management

## Overview
Ensures all networking requests go through the central Axios client (`axiosClient.ts`) and are wrapped in domain services.

## Key Files
| File / Directory | Purpose |
|------|---------|
| `src/serviceManager/axiosClient.ts` | Axios instance setup with request/response interceptors |
| `src/serviceManager/apiEndpoints.ts` | Centralized list of API endpoints |
| `src/serviceManager/*Service.ts` | Domain services (AuthService, RideService, etc.) |

## Inputs
- Service endpoint path
- Payload/Response TypeScript interfaces
- Component trigger requirement

## Outputs
- Compiled API request methods inside a Service class
- Async execution wrapper inside a screen/component hook (managing `loading`, `error`, and `success` states)

## Examples
### Declaring a service method:
```typescript
// src/serviceManager/RideService.ts
export const RideService = {
  getAvailableRides: (payload: SearchPayload) => {
    return axiosClient.post<ApiResponse<Ride[]>>(apiEndpoints.SEARCH_RIDES, payload);
  }
};
```

### Calling the service in a hook:
```typescript
import { RideService } from '@/serviceManager/RideService';

const useAvailableRides = () => {
  const [loading, setLoading] = useState(false);

  const fetchRides = useCallback(async (params) => {
    setLoading(true);
    try {
      const response = await RideService.getAvailableRides(params);
      // Handle success...
    } catch (error) {
      // Handle error...
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, fetchRides };
};
```

## Guardrails
- **NEVER** use `fetch` or call Axios directly inside a component or custom hook. All requests must go through a class/object in `src/serviceManager/`.
- Handle errors gracefully: surface friendly messages using `showNotification(NotificationType.ERROR, ...)` instead of `Alert.alert`.
- Centralize auth header injection and base URL logic inside `axiosClient.ts`.
