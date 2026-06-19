# 🤖 Agent Reference Guide: MaharajJI App
**Version 2.0 — Senior Engineering Standard**

---

## 🚨 ABSOLUTE LAW — READ BEFORE WRITING A SINGLE CHARACTER

> This document is the **only** law governing every line of code written for MaharajJI App.
> **Non-compliance = invalid output = redo from scratch.**
> There is no partial credit. There is no "I'll fix it later."

### Pre-Flight Checklist (mandatory before every prompt)

Run every item. Check the box mentally. Only then write code.

1. ✅ **Read this file in full.**
2. ✅ **Query Storybook MCP & Stitch MCP first.** Check Storybook for components. Use Stitch MCP to manage screens and design systems.
3. ✅ **Check `@/hooks`, `@/utils`, `@/components/atoms`** — never recreate what exists.
4. ✅ **No raw RN primitives** — `View`, `Text`, `TouchableOpacity` are forbidden; use atoms.
5. ✅ **Every screen needs a Template** in `@/components/templates/`.
6. ✅ **Every string goes through `useLocale()`** — zero hardcoded text.
7. ✅ **Every dimension uses a scaling util** — `scale()`, `verticalScale()`, `moderateScale()`, `responsiveFont()`.
8. ✅ **Styled-components only** — no inline styles, no `StyleSheet.create`.
9. ✅ **`any` is a build error** — use proper generics or discriminated unions.
10. ✅ **Enums for every status/type constant** — never compare raw strings.
11. ✅ **`useAppNavigation`** for all screen transitions.
12. ✅ **`showNotification` / `ConfirmationModal`** — never `Alert.alert`.
13. ✅ **Loader overlays** — `width: 100%`, centered, `transparent` prop.
14. ✅ **`React.memo`, `useCallback`, `useMemo`** applied by default — not as an afterthought.
15. ✅ **200-line hard cap per file** — exceed it and refactor immediately.
16. ✅ **Remove all `console.log`, dead imports, unused variables** before output.
17. ✅ **No `eslint-disable` comments** — fix the root cause.

> ⛔ Skipping any item above produces invalid output. Redo from scratch.

---

## 🔍 0. Storybook & Stitch MCP — Component, Design & Screen Protocol

**This is step zero. Always.**

```text
Discovery Phase (mandatory):
1. Components (Storybook MCP): Query Storybook MCP → does the component exist?
   YES  → import and use it as-is.
   YES but missing prop → extend it in its original file + update .stories.tsx.
   NO   → create it in the correct atomic tier, then add .stories.tsx.
2. Screens & Design Systems (Stitch MCP): Query Stitch MCP → does the design system or screen exist?
   YES  → apply the design system or use the screen.
   NO   → use Stitch MCP tools (like generate_screen_from_text) to create or generate the design system/screen.
3. If a component covers ≥ 80% of the need → extend, never duplicate.
4. After any component change → sync .stories.tsx immediately.
```

**The "No-Duplicate" rule is absolute.** `CustomButton.tsx` next to an existing `Button.tsx` = instant rejection.
**The "Design System" rule is absolute.** Always stick to the design system maintained in Stitch MCP.

`.stories.tsx` files:
- Required for every component in `atoms/`, `molecules/`, `organisms/`.
- **Never** for `templates/` or `screens/`.
- Must be created in the same folder as the component.

---

## 🏗️ 1. Architecture — Atomic Design + SOLID

### Folder Hierarchy

```
src/
├── components/
│   ├── atoms/          # Button, Typography, Box, Input, Icon, Avatar, Badge, Chip
│   ├── molecules/      # FormField, ListItem, Card, SearchBar
│   ├── organisms/      # Header, BottomSheet, Map, SessionCard
│   └── templates/      # Screen layout shells (one per screen)
├── screens/            # Screen entry points — logic-free, mount the template
├── hooks/              # Shared custom hooks
├── stores/             # Zustand stores (one file per domain)
├── serviceManager/     # Axios client + per-domain API modules
├── constants/
│   ├── baseLocalization.ts
│   └── enums.ts
├── utils/              # Pure functions — no side effects
├── styles/             # Theme, tokens, scaling utils
└── navigation/         # Stack/Tab/RootNavigator + useAppNavigation
```

### Component Folder — Exact Pattern (no deviation)

```
ComponentName/
├── ComponentName.tsx           # UI only — React.memo, zero business logic
├── ComponentName.styles.ts     # Styled-components only
├── useComponentName.ts         # All handlers, API calls, derived state
├── ComponentName.stories.tsx   # Required for atoms/molecules/organisms
├── types.d.ts                  # Interfaces and prop types
└── index.ts                    # Barrel export
```

**Screen folder** mirrors the same pattern, substituting `.screen.tsx` for `.tsx` and adding no `.stories.tsx`.

### SOLID in Practice

| Principle | Rule |
|---|---|
| **S** — Single Responsibility | One component = one job. Logic hook separate from UI file. |
| **O** — Open/Closed | Add behaviour via props, not by editing internals. |
| **L** — Liskov Substitution | Custom `Input` must accept all standard `TextInputProps`. |
| **I** — Interface Segregation | No component receives props it does not use. Split the interface. |
| **D** — Dependency Inversion | Screens depend on service abstractions, not Axios directly. |

---

## 📐 2. TypeScript — Senior-Level Strictness

### Non-negotiable rules

```typescript
// ✅ Discriminated unions over boolean soup
type SessionState =
  | { status: SessionStatus.AVAILABLE }
  | { status: SessionStatus.BOOKED; host: Host }
  | { status: SessionStatus.COMPLETED; receipt: Receipt };

// ✅ Generics instead of any
function useApi<TRequest, TResponse>(
  endpoint: ApiEndpoint,
): ApiHookResult<TRequest, TResponse> { ... }

// ✅ Branded types for IDs — prevents accidental swaps
type UserId  = string & { readonly __brand: 'UserId' };
type SessionId = string & { readonly __brand: 'SessionId' };

// ✅ Exhaustive switch — compiler enforces all cases handled
function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${JSON.stringify(value)}`);
}

// ✅ Readonly for data that must not mutate
type UserProfile = Readonly<{
  id: UserId;
  name: string;
  phone: string;
}>;

// ❌ NEVER
const data: any = response.data;
(navigation as any).navigate('Home');
```

### Interface naming

- Props interfaces: `ComponentNameProps`
- API request: `CreateSessionRequest`
- API response: `CreateSessionResponse`
- Store state: `SessionStoreState`
- Store actions: `SessionStoreActions`
- Combined store type: `SessionStore = SessionStoreState & SessionStoreActions`

---

## 🎨 3. Design System & Styling

### Styled-Components Contract

```typescript
// ✅ Correct — theme tokens + scaling utils
const Container = styled(Box)`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${moderateScale(12)}px;
`;

// ✅ Conditional styles via props — no inline style objects
const Card = styled(Box)<{ isActive: boolean }>`
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary_container : theme.colors.surface};
`;

// ❌ NEVER — inline styles
<View style={{ padding: 16, color: '#FF5733' }} />

// ❌ NEVER — hardcoded values
const Title = styled(Text)`font-size: 18px; color: #1A1A2E;`;
```

### Design Rules

| Rule | Detail |
|---|---|
| **No borders** | Use tonal background shifts or negative space — never `borderWidth`. |
| **Typography** | Plus Jakarta Sans exclusively, via `Typography` atom or `theme.fonts`. |
| **Color tokens** | `theme.colors.on_surface_variant` — snake_case only. |
| **Spacing tokens** | `theme.spacing.xs/sm/md/lg/xl` — never raw numbers. |
| **Shadows** | Tinted ambient. Higher elevation = lighter background. |
| **Gradients** | Primary → Primary Container at 135° for CTA buttons. |
| **Icons** | SVG via `react-native-svg`. No PNG icons. |

### Scaling Utils — Usage Matrix

| Util | Use For |
|---|---|
| `scale(n)` | Width, horizontal padding/margin |
| `verticalScale(n)` | Height, vertical padding/margin |
| `moderateScale(n)` | Border radius, icon size, spacing |
| `responsiveFont(n)` | Font size |

---

## 📱 4. Responsiveness & Accessibility

- **Keyboard safety:** Every form screen must use `KeyboardAwareScrollView` or `KeyboardAvoidingView` with correct `behavior` per platform.
- **Scroll views:** Always set `showsVerticalScrollIndicator={false}` unless content length is ambiguous.
- **Hit slop:** Touchable targets smaller than `44×44` must include `hitSlop`.
- **Accessibility:** Every interactive element must have `accessibilityLabel`, `accessibilityRole`, and `accessibilityHint` where relevant.
- **Safe area:** Screens must respect `useSafeAreaInsets()` — never hardcode status bar height.

---

## 🔗 5. Path Aliases — Required Always

```typescript
// ✅ Always
import { Button } from 'atoms/Button';
import { useSessionStore } from '@/stores/useSessionStore';
import { SessionService } from 'services/SessionService';

// ❌ Never
import { Button } from '../../../components/atoms/Button';
```

| Alias | Maps To |
|---|---|
| `@/*` | `src/*` |
| `atoms/*` | `src/components/atoms/*` |
| `molecule/*` | `src/components/molecules/*` |
| `organism/*` | `src/components/organisms/*` |
| `screens/*` | `src/screens/*` |
| `utils/*` | `src/utils/*` |
| `services/*` | `src/serviceManager/*` |

---

## ⚙️ 6. State Management — Zustand

### Store anatomy

```typescript
// src/stores/useSessionStore.ts

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandMMKVStorage } from '@/utils/zustandMMKVStorage';
import type { SessionStore, SessionStoreState } from './types.d';

const initialState: SessionStoreState = {
  activeSession: null,
  sessionHistory: [],
  status: SessionStatus.IDLE,
};

export const useSessionStore = create<SessionStore>()(
  persist(
    immer((set) => ({
      ...initialState,

      setActiveSession: (ride) =>
        set((state) => { state.activeSession = ride; }),

      clearSession: () =>
        set((state) => { Object.assign(state, initialState); }),
    })),
    { name: 'session-store', storage: createJSONStorage(() => zustandMMKVStorage) },
  ),
);
```

### Selector pattern — prevent unnecessary re-renders

```typescript
// ✅ Select only what the component needs
const activeSession = useSessionStore((s) => s.activeSession);
const setActiveSession = useSessionStore((s) => s.setActiveSession);

// ❌ Subscribes to the entire store — causes re-renders on unrelated changes
const store = useSessionStore();
```

### Store file rules

- One file per domain: `useSessionStore`, `useUserStore`, `useHostStore`, `useMapStore`.
- No store imports another store — use derived selectors or compose at the hook level.
- State must be serializable (no class instances, no functions in state).

---

## 🌐 7. Service Layer & API

### Structure

```
src/serviceManager/
├── axiosClient.ts          # Base Axios instance + interceptors
├── endpoints.ts            # All URL strings as an enum
├── types.d.ts              # ApiResponse<T>, ApiError
├── SessionService.ts          # Ride-domain API functions
├── UserService.ts
└── index.ts                # Barrel export
```

### `useApi` hook — required for every request

```typescript
// @/hooks/useApi.ts
function useApi<TRequest, TResponse>(
  serviceMethod: (payload: TRequest) => Promise<ApiResponse<TResponse>>,
): UseApiResult<TRequest, TResponse>
```

Usage in a logic hook:

```typescript
// ✅ Correct
const { execute, data, isLoading, error } = useApi(SessionService.createRide);

const handleBook = useCallback(async () => {
  const result = await execute({ hostId, timeSlot });
  if (result.success) {
    setActiveSession(result.data);
    showNotification({ type: NotificationType.SUCCESS, message: t('session.booked') });
  }
}, [execute, hostId, timeSlot, setActiveSession, t]);

// ❌ Never call Axios directly in a component or logic hook
import axios from 'axios';
const res = await axios.get('/ride');
```

### Endpoint enum

```typescript
// src/serviceManager/endpoints.ts
export enum ApiEndpoint {
  CREATE_SESSION   = '/sessions',
  CANCEL_SESSION   = '/sessions/:id/cancel',
  SESSION_HISTORY  = '/sessions/history',
  USER_PROFILE  = '/users/me',
}
```

### Interceptors (axiosClient.ts responsibilities)

1. Attach `Authorization: Bearer <token>` from Keychain on every request.
2. Refresh token on 401, retry the original request once, then sign out.
3. Transform snake_case responses to camelCase (using `humps` or similar).
4. Log errors via the internal `Logger` utility — never `console.error`.

---

## 🌍 8. Localization — Zero Hardcoding

### Structure

```typescript
// @/constants/baseLocalization.ts
export const en = {
  auth: {
    login: { title: 'Welcome back', subtitle: 'Sign in to continue' },
    otp:   { title: 'Verify number', resend: 'Resend in {{seconds}}s' },
  },
  session: {
    booked: 'Your ride is confirmed!',
    cancelled: 'Ride cancelled.',
  },
  errors: {
    server_error: 'Something went wrong. Try again.',
    network_error: 'No internet connection.',
  },
};

export const hi: typeof en = { ... };
```

### In hooks

```typescript
const { t } = useLocale();
const title = t('auth.login.title');                      // static
const label = t('auth.otp.resend', { seconds: 30 });     // interpolated
```

**Rules:**
- Keys are dot-separated, hierarchical: `domain.screen.element`.
- Hindi (`hi`) must mirror the `en` type exactly — TypeScript enforces this.
- Dynamic values use `{{placeholder}}` interpolation.
- **Zero** string literals in any `.tsx` or `.ts` UI/logic file.

---

## 🏷️ 9. Enums — Mandatory for Every Constant

```typescript
// src/constants/enums.ts

export enum SessionStatus {
  IDLE       = 'IDLE',
  AVAILABLE  = 'AVAILABLE',
  BOOKED    = 'BOOKED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED  = 'COMPLETED',
  CANCELLED  = 'CANCELLED',
}

export enum NotificationType {
  SUCCESS = 'SUCCESS',
  ERROR   = 'ERROR',
  WARNING = 'WARNING',
  INFO    = 'INFO',
}

export enum PaymentMethod {
  CASH  = 'CASH',
  UPI   = 'UPI',
  CARD  = 'CARD',
}

export enum MessageStatus {
  SENT      = 'SENT',
  DELIVERED = 'DELIVERED',
  READ      = 'READ',
}
```

**Enum rules:**
- All values are strings (safe for serialization and logging).
- Never compare raw strings: `if (status === 'COMPLETED')` → ❌.
- Always: `if (status === SessionStatus.COMPLETED)` → ✅.
- Export every enum from `@/constants/enums.ts` — single source of truth.

---

## 🧭 10. Navigation — `useAppNavigation`

```typescript
// @/navigation/useAppNavigation.ts
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from './types.d';

export const useAppNavigation = () =>
  useNavigation<RootStackNavigationProp>();
```

Usage:

```typescript
// ✅
const navigation = useAppNavigation();
navigation.navigate('SessionDetails', { sessionId });
navigation.goBack();

// ❌ — raw hook with type cast
const navigation = useNavigation();
(navigation as any).navigate('SessionDetails', { sessionId });
```

Navigation types must be declared exhaustively in `src/navigation/types.d.ts`.

---

## 🔔 11. Notifications & Modals

```typescript
// ✅ Auto-dismissing toast
showNotification({
  type: NotificationType.SUCCESS,
  message: t('profile.updated'),
  duration: 3000,
});

// ✅ Interactive confirmation
<ConfirmationModal
  visible={showCancelModal}
  title={t('session.cancel.title')}
  message={t('session.cancel.message')}
  onConfirm={handleCancelSession}
  onDismiss={() => setShowCancelModal(false)}
  confirmLabel={t('common.confirm')}
  cancelLabel={t('common.cancel')}
/>

// ❌ Never
Alert.alert('Cancel?', 'Are you sure?', [...]);
```

---

## ⚡ 12. Performance — Non-Negotiable Defaults

### Memoization

```typescript
// Every component
export const SessionCard = React.memo(({ ride, onPress }: SessionCardProps) => {
  // ...
});

// Every handler
const handlePress = useCallback(() => {
  onPress(session.id);
}, [onPress, session.id]);

// Every derived value
const formattedPrice = useMemo(
  () => formatCurrency(session.fare, session.currency),
  [session.fare, session.currency],
);
```

### Lists

```typescript
// ✅ Always FlashList
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={sessions}
  renderItem={renderSessionCard}
  estimatedItemSize={verticalScale(96)}
  keyExtractor={(item) => item.id}
/>

// ❌ Never FlatList
<FlatList ... />
```

### Images

```typescript
// ✅ FastImage with priority and cache policy
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: host.avatarUrl, priority: FastImage.priority.normal }}
  style={avatarStyle}
/>
```

### Animations

- Use `react-native-reanimated` (v3) — never `Animated` from React Native core.
- Use `LayoutAnimation` for simple enter/exit transitions only.
- Shared element transitions: `react-navigation-shared-element`.

---

## 🛡️ 13. Error Handling

### Error Boundaries

Every major screen section must be wrapped:

```typescript
import { ErrorBoundary } from '@/components/organisms/ErrorBoundary';

<ErrorBoundary fallback={<ErrorFallback onRetry={refetch} />}>
  <SessionMapSection />
</ErrorBoundary>
```

### Form Validation

```typescript
// Zod schema
const loginSchema = z.object({
  phone: z.string().min(10).max(10).regex(/^[6-9]\d{9}$/),
  otp:   z.string().length(6),
});

type LoginForm = z.infer<typeof loginSchema>;

// react-hook-form
const { control, handleSubmit, formState: { errors } } = useForm<LoginForm>({
  resolver: zodResolver(loginSchema),
});
```

Validation errors render inline via the `FormField` molecule — never via `Alert`.

### API error handling

```typescript
// In useApi — centralized, never per-component
if (isAxiosError(err)) {
  const code = err.response?.status;
  if (code === 401) authStore.signOut();
  if (code === 422) handleValidationErrors(err.response.data.errors);
  Logger.error('API Error', { endpoint, code, message: err.message });
}
```

---

## 🔐 14. Security & Storage

| Data | Storage |
|---|---|
| Auth tokens (access/refresh) | `react-native-keychain` |
| User preferences, cache | `MMKV` |
| Sensitive PII | `Keychain` — never MMKV |
| Navigation state, UI state | Zustand (in-memory) |

**Rules:**
- Never store tokens in MMKV.
- Never log tokens, card numbers, or PII — use `Logger.redact()`.
- Deep-link params must be validated before navigation.
- All API payloads must be validated with Zod before submission.

---

## 📝 15. Naming Conventions

| Thing | Convention | Example |
|---|---|---|
| Component file | PascalCase | `SessionCard.tsx` |
| Hook file | camelCase, `use` prefix | `useSessionStore.ts` |
| Store file | camelCase, `use` prefix | `useUserStore.ts` |
| Service file | PascalCase, `Service` suffix | `SessionService.ts` |
| Enum | PascalCase | `SessionStatus` |
| Enum value | SCREAMING_SNAKE | `SessionStatus.IN_PROGRESS` |
| Type / Interface | PascalCase | `SessionCardProps` |
| Styled component | PascalCase, semantic name | `ContentWrapper`, `PriceLabel` |
| Theme color token | snake_case | `on_surface_variant` |
| Localization key | dot.separated.snake | `session.cancel.title` |
| Constants | SCREAMING_SNAKE | `MAX_RETRY_COUNT` |

---

## 🧹 16. Code Quality — Before Every Submission

Run this checklist mentally before outputting any code:

- [ ] Zero `console.log` — use `Logger`.
- [ ] Zero `any` — use generics or union types.
- [ ] Zero hardcoded strings — all through `useLocale()`.
- [ ] Zero hardcoded colors / pixels — theme tokens + scaling utils.
- [ ] Zero raw RN primitives (`View`, `Text`, `TouchableOpacity`).
- [ ] Zero inline styles.
- [ ] Zero `Alert.alert`.
- [ ] Zero `eslint-disable` comments.
- [ ] Zero duplicate components.
- [ ] Zero relative imports deeper than 1 level — use aliases.
- [ ] No file exceeds 200 lines.
- [ ] All enums defined and used — no raw string comparisons.
- [ ] `React.memo`, `useCallback`, `useMemo` applied.
- [ ] `.stories.tsx` created/updated for any atoms/molecules/organisms touched.
- [ ] Template created in `@/components/templates/` for any new screen.
- [ ] `useAppNavigation` used — no raw `useNavigation`.
- [ ] Types compiled — no TypeScript errors.

---

## 🚫 17. Critical "Do Not" List

1. Do **NOT** modify existing business logic unless explicitly asked.
2. Do **NOT** deviate from the provided UI design — MaharajJI App fidelity is non-negotiable.
3. Do **NOT** create duplicate components — always extend existing ones.
4. Do **NOT** use the `fetch` API — use `useApi` with the Axios client.
5. Do **NOT** use hardcoded hex codes or pixel values.
6. Do **NOT** use `Alert.alert` — ever.
7. Do **NOT** use hardcoded string literals in any UI or logic file.
8. Do **NOT** render a loader without `width: 100%`, centered, with `transparent` prop.
9. Do **NOT** use `FlatList` — use `FlashList`.
10. Do **NOT** call Axios directly in components or screens.
11. Do **NOT** store sensitive tokens in MMKV.
12. Do **NOT** use `as any` casts — fix the type properly.
13. Do **NOT** suppress lint errors with comments — fix the root cause.
14. Do **NOT** create `.stories.tsx` for `templates/` or `screens/`.
15. Do **NOT** improvise when requirements are unclear — ask the user.

---

## 🎯 18. Senior-Level Code Signals

Every output must demonstrate these:

**Defensive code:** Handle every edge case — empty lists, null data, network failure, slow loading — visually and logically.

**Composability:** Components accept render props or slot-based children for extension without modification.

**Type narrowing:** Use guards (`isAxiosError`, discriminated union narrowing) rather than casting.

**Semantic naming:** `PriceLabel` not `Text3`. `ContentWrapper` not `View2`. `handleConfirmCancel` not `handleClick`.

**Separation of concerns:** The `.tsx` file has zero business logic. The logic hook has zero JSX. The styles file has zero logic.

**Predictable state:** Zustand state transitions are pure and follow a clear, documented flow (e.g., `IDLE → AVAILABLE → BOOKED → IN_PROGRESS → COMPLETED`).

**Minimal API surface:** Components expose only the props they need. Internal state stays internal.

---

## ⚠️ 19. Zero-Tolerance Enforcement

> These are non-negotiable. No exceptions. No workarounds.

* **NEVER skip the pre-flight checklist.**
* **NEVER use raw `Text`, `View`, `TouchableOpacity`** — atoms only.
* **NEVER write hardcoded strings** — `useLocale()` always.
* **NEVER hardcode pixel values or hex codes** — theme tokens + scaling utils.
* **NEVER create a screen without a Template** in `@/components/templates/`.
* **NEVER use inline styles** — styled-components only.
* **NEVER use `any`** — strict TypeScript.
* **NEVER duplicate a component** — check Storybook MCP and Stitch MCP first.
* **NEVER exceed 200 lines** per file — refactor immediately.
* **NEVER skip `React.memo`, `useCallback`, `useMemo`**.
* **NEVER compare raw strings** where an enum exists.
* **NEVER use raw `useNavigation`** — `useAppNavigation` only.
* **NEVER use `Alert.alert`** — `ConfirmationModal` or `showNotification` only.
* **NEVER suppress lint errors** — fix the root cause.
* **NEVER improvise** — ask the user when something is unclear.

> 💬 If any rule above is violated, the correct response is **redo from scratch** — not patch it.