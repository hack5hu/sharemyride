# 🤖 Agent Reference Guide: ShareMyRide (Tuktuk)

This document is the **source of truth** for all development. AI agents must adhere to these rules strictly to maintain the "Ride Pool Company" brand identity and codebase integrity.

## 0. Critical "Search-First" Protocol

Before creating **any** new component, hook, or utility, the AI **MUST**:
1.  Scan `@/components/atoms`, `@/components/molecules`, and `@/components/organisms`.
2.  Check `@/hooks` and `@/utils`.
3.  **Rule:** If a component exists that performs 80% of the task, **extend or use it**. Do not create duplicates (e.g., do not create `CustomButton.tsx` if `Button.tsx` exists in atoms).

---

## 🎯 1. Core Architectural Principles
* **Atomic Design:** Components must live in `atoms`, `molecules`, `organisms`, or `templates`.
* **SOLID & Modular:** 
We follow **Atomic Design** combined with **SOLID** principles:
**S - Single Responsibility:** One component = one job. Logic lives in `useComponentName.ts`, UI lives in `ComponentName.tsx`.
**O - Open/Closed:** Components should be open for extension (via props) but closed for modification.
**L - Liskov Substitution:** Shared UI components must handle standard props (e.g., a custom `Input` should accept standard `TextInputProps`).
**I - Interface Segregation:** Don't force a component to depend on props it doesn't use. Use specific TypeScript interfaces.
**D - Dependency Inversion:** High-level modules (Screens) shouldn't depend on low-level modules. Both should depend on abstractions (Services/Context).
* **The 200-Line Rule:** No file shall exceed **200 lines**. Exceeding this requires immediate refactoring into smaller sub-components or hooks.
* **Clean Exports:** Every component folder must contain an `index.ts` for clean barrel exports.

---

## 📁 2. Component Structure
Every component or screen folder must follow this exact pattern:
Strictly adhere to this folder pattern. **No file exceeds 200 lines.**

```text
ComponentName/
├── ComponentName.tsx        (UI only - React.memo recommended)
├── ComponentName.styles.ts  (Styled-components only)
├── useComponentName.ts      (Logic/State/Handlers - Custom Hook)
├── types.d.ts               (TypeScript interfaces/types)
└── index.ts                 (Export * from './ComponentName')
```

---

## 🎨 3. Styling & "Ride Pool" Design System
**Creative North Star:** Editorial Fluidity & Organic Sophistication.

* **Styled Components Only:** No inline styles. No `StyleSheet.create`.
* **The "No-Line" Rule:** Do **not** use `borderWidth: 1`. Use **Tonal Shifts** (different surface colors) or **Negative Space** to separate content.
* **Typography:** Use **Plus Jakarta Sans** only. Access via `theme` or `Typography` atom.
* **Tokens:** Never use hardcoded colors or spacing. Use `theme.colors` and `theme.spacing`.
* **Shadows:** Use tinted ambient shadows. "Higher is Lighter" (higher elevation = lighter background color).
* **Gradients:** Use linear gradients (Primary to Primary Container at 135°) for main Action buttons.



---

## 📱 4. Responsiveness & UI/UX
* **Scaling Utils:** Wrap every dimension in scaling functions from `src/styles`:
    * `scale(x)`: Horizontal/Width.
    * `verticalScale(y)`: Vertical/Height.
    * `moderateScale(z)`: Icons/Spacing.
    * `responsiveFont(f)`: Font sizes.
* **Keyboard Safety:** Elements must never be hidden by the keyboard. Use `KeyboardAvoidingView` or `KeyboardAwareScrollView`.
* **Pre-built Atoms:** Never use React Native's `View`, `Text`, or `TouchableOpacity` directly. Use components from `src/components/atoms`.
* **Transitions:** Use smooth fade animations for screen navigation.

---

## ⚙️ 5. Logic, State & Data
* **State:** Use **Zustand** for global state. Keep stores modular.
* **API:** Use **Axios** with a centralized client (`src/serviceManager`). Use interceptors for tokens and error handling.
* **Localization:** No hardcoded strings. Every piece of text must come from `baseLocalization`.
* **Storage:** * `MMKV` for fast local storage.
    * `Keychain` for sensitive tokens.
* **Memorization:** Use `useCallback`, `useMemo`, and `React.memo` by default to prevent unnecessary re-renders.

---

## 🔗 6. Path Aliases
AI must use alias imports to avoid deep relative paths (`../../`).

| Alias | Target Directory |
| :--- | :--- |
| `@/*` | `src/*` |
| `atoms/*` | `src/components/atoms/*` |
| `molecule/*` | `src/components/molecules/*` |
| `organism/*` | `src/components/organisms/*` |
| `screens/*` | `src/screens/*` |
| `utils/*` | `src/utils/*` |
| `services/*` | `src/serviceManager/*` |

---

## 🛡️ 7. Error Handling & Quality
* **Error Boundaries:** All major screen segments must be wrapped in an Error Boundary.
* **Modals:** Use the custom `Modal` atom/organism for alerts and confirmations.
* **Logging:** Use the project's custom Logger that toggles behavior between Development and Production.
* **Validation:** All forms must have validation (Zod/Yup) with user-friendly error messages shown via the UI.
* **TypeScript:** `any` is strictly forbidden. Fix all linter and type errors before finalizing code.

---

## ⚠️ 8. Critical "Do Not" List
1.  **Do NOT** modify existing business logic unless explicitly requested.
2.  **Do NOT** change provided UI designs; maintain "Ride Pool" fidelity.
3.  **Do NOT** create duplicate components/hooks if they exist in `src/components/...`.
4.  **Do NOT** use `fetch` API.
5.  **Do NOT** use hardcoded hex codes or pixel values.

---

## 📝 9. User-Friendly UI Additions
* **Haptics:** Add subtle haptic feedback (Success/Error/Impact) for primary button actions.
* **Transitions:** Use `LayoutAnimation` or `Reanimated` for smooth UI entries.
* **Empty States:** Always provide a visual "No Data Found" component for lists.
* **Feedback:** Show a Toast or Snack-bar for every background action (e.g., "Profile Updated").

---

## 🔐 10. Safety & Clean Code
* **No `any`:** TypeScript must be strict.
* **Path Aliases:** Use `@/atoms`, `@/molecule`, `@/organism`, `@/services`.
* **Clean-up:** Remove `console.log`, unused imports, and dead code before submission.
* **Logging:** Use the internal `Logger` utility for production-safe debugging.

---

## 🌐 11. Data & Networking
* **API:** Use **Axios**. No `fetch`. Use the `useApi` custom hook for all requests.
* **State:** Use **Zustand**. Keep stores small (e.g., `useUserStore`, `useRideStore`).
* **Localization:** **ZERO** hardcoded strings. Use `baseLocalization.t('key')`.
* **Storage:** Use `MMKV` for persistence and `Keychain` for sensitive tokens.

---

## 🚀 12. Optimization & Performance (User-Friendly Code)
* **Memoization:** Wrap all functional components in `React.memo`. Wrap handlers in `useCallback` and expensive calculations in `useMemo`.
* **Asset Optimization:** Use SVGs (via `react-native-svg`) instead of PNGs where possible.
* **Lazy Loading:** Use dynamic imports for heavy screens to improve startup time.
* **List Optimization:** Always use `FlashList` (Shopify) instead of `FlatList` for better performance.

---





