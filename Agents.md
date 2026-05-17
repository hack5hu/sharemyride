# 🤖 Agent Reference Guide: ShareMyRide (Tuktuk)

---

## 🚨 ABSOLUTE LAW — READ BEFORE ANYTHING ELSE (NON-NEGOTIABLE)

> **WHEN ASKED TO DO CODE, YOU MUST ALWAYS, ALWAYS FOLLOW THE GIVEN RULES IN THIS DOCUMENT.**
> **ALWAYS CHECK THE STORYBOOK MCP SERVER FIRST to see if any component belongs there or already exists.**
> This document is the ONLY law governing every line of code written for this project.
> The AI agent MUST follow every rule in this file — for EVERY prompt, without exception, without deviation, without doing it "their own way".

### The Agent's Pre-Flight Checklist (run BEFORE writing a single line of code):
1. ✅ **Read this file.** Every rule. Every time. When asked to code, follow these rules strictly.
2. ✅ **Check Storybook MCP FIRST** — does the component already exist? Should it belong there? You must check the MCP server before writing any component code.
3. ✅ **Check if the storybook server is closed or not.** if it is then run the storybook server first and then check. **very important** (MANDATORY) *RULES TO FOLLOW*
4. ✅ **Use existing atoms** (`Button`, `Typography`, `Box`) — NEVER custom styled text/buttons.
5. ✅ **Create a Template** in `@/components/templates/` for every new screen.
6. ✅ **Use `useLocale()`** for every string — zero hardcoded text.
7. ✅ **Use `scale()`, `verticalScale()`, `moderateScale()`, `responsiveFont()`** for every dimension.
8. ✅ **No inline styles** — styled-components only.
9. ✅ **No `any` types** — TypeScript must be strict.
10. ✅ **Define and use enums** for status/type constants across the codebase to ensure robust comparisons.
11. ✅ **Use useAppNavigation** custom hook for screen transitions to keep typing clean.

> ⛔ **If any of the above are skipped, the output is INVALID and must be redone from scratch.**
> The user should NOT have to ask for compliance — compliance is the default.

---

This document is the **source of truth** for all development. AI agents must adhere to these rules strictly to maintain the "Ride Pool Company" brand identity and codebase integrity.

## 🔍 0. The "Storybook MCP" Protocol | Critical "Search-First" Protocol (MANDATORY)
Before creating **any** new component, the AI Agent must perform a "Discovery Phase" using the Storybook MCP server.

1.  **Check MCP Inventory:** Query the Storybook MCP server to see if the component (or a similar one) already exists.
2.  **The "No-Duplicate" Rule:** * If the component exists in Storybook: **Use it.**
    * If the component exists but lacks a specific feature: **Update the existing component** in its original directory.
    * **NEVER** create a duplicate component (e.g., if `PrimaryButton` exists, do not create `ActionBtn`).
    * **Rule:** If a component exists that performs 80% of the task, **extend or use it**. Do not create duplicates (e.g., do not create `CustomButton.tsx` if `Button.tsx` exists in atoms).
3.  **Syncing:** Any updates made to a component must be reflected in its corresponding `.stories.tsx` file immediately to keep the MCP server up to date.
4.  Check `@/hooks` and `@/utils`.

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
├── ComponentName.screen.tsx        (Logic-free UI, React.memo)
├── ComponentName.styles.ts         (Styled-components only)
├── useComponentName.ts             (Handlers, API calls, Logic)
├── ComponentName.stories.tsx       (create only for common components. required for MCP Visibility)
├── types.d.ts                      (Interfaces)
└── index.ts                        (Clean Export)
```

---

## 🎨 3. Styling & "Ride Pool" Design System
**Creative North Star:** Editorial Fluidity & Organic Sophistication.

* **Styled Components Only:** No inline styles. No `StyleSheet.create`.
* **The "No-Line" Rule:** Do **not** use `borderWidth: 1`. Use **Tonal Shifts** (different surface colors) or **Negative Space** to separate content.
* **Typography:** Use **Plus Jakarta Sans** only. Access via `theme` or `Typography` atom.
*   **Tokens:** Never use hardcoded colors or spacing. Use `theme.colors` and `theme.spacing`. Use **snake_case** for theme color tokens (e.g., `on_surface_variant`, not `onSurfaceVariant`).
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

## 🌍 13. Localization (Zero Hardcoding)
* **Rule:** **Zero** "String Literals" in UI files.
* **language**: The default language is `english`, 2nd language is `hindi`.
* **Storage:** All text must live in `@/constants/baseLocalization`.
* **Format:** Use hierarchical keys: `auth.login.title` or `errors.server_error`.
* **Dynamic Text:** Use interpolation (e.g., `{{count}}`) for variables.


---

## 🌍 14. RULES:
* do not use React native's component. use only components from @/components folder. **very important** (MANDATORY) *RULES TO FOLLOW*
* do not create components. first check if the component is already in the Storybook MCP server, if not then create it. **very important** (MANDATORY) *RULES TO FOLLOW*
* always apply "No-Line" design aesthetics, and ensure 100% localization and strict TypeScript typing. **very important** (MANDATORY) *RULES TO FOLLOW*
* do not use inline styles. use only styled-component. **very important** (MANDATORY) *RULES TO FOLLOW*
* do not use hardcoded hex codes or pixel values. **very important** (MANDATORY) *RULES TO FOLLOW*
* always use localizations. **very important** (MANDATORY) *RULES TO FOLLOW*
* optimise the code for performance. **very important** (MANDATORY) *RULES TO FOLLOW*
* do not use any api directly. use the @/services folder. **very important** (MANDATORY) *RULES TO FOLLOW*
* create small functions for each task. **very important** (MANDATORY) *RULES TO FOLLOW*
* follow SOLID principles. **very important** (MANDATORY) *RULES TO FOLLOW*
* create *.stories.tsx file for each component in component folder except templates, only if not exist in storybook MCP server. **very important** (MANDATORY) *RULES TO FOLLOW*
* first check the storybook MCP server to see if the component already exists, if not then create it. **very important** (MANDATORY) *RULES TO FOLLOW*
* never create .stories.tsx file for any other folder outside the components folder. this is very important. **very important** (MANDATORY) *RULES TO FOLLOW*
* create template for new screens, and save them in @/components/templates folder. **very important** (MANDATORY) *RULES TO FOLLOW*
* always make and use enums for status/type constants across the codebase to ensure robust comparisons. **very important** (MANDATORY) *RULES TO FOLLOW*
* always use the custom navigation hook (useAppNavigation) for screen transitions instead of raw hook to ensure clean types without 'as any' casts. **very important** (MANDATORY) *RULES TO FOLLOW*

---

## 🚫 15. Zero-Tolerance Enforcement

> These rules are **non-negotiable** and apply to **every single prompt** — no exceptions.

* **NEVER skip the pre-flight checklist.** Every prompt must go through it.
* **NEVER use raw `Text`, `View`, `TouchableOpacity`** from React Native. Always use atoms from `@/components/atoms`.
* **NEVER write hardcoded strings** in UI files. Use `useLocale()` always.
* **NEVER write hardcoded pixel values or hex codes.** Use theme tokens and scaling utils.
* **NEVER create a screen without a Template** in `@/components/templates/`.
* **NEVER use inline styles.** Styled-components only.
* **NEVER do things your own way.** If something is unclear, ask the user — do not improvise.
* **ALWAYS check Storybook MCP before creating any component.**
* **ALWAYS follow the 200-line rule.** Refactor immediately if exceeded.
* **ALWAYS use `React.memo`, `useCallback`, `useMemo`** for performance.
* **ALWAYS define and use enums** for status/type constants across the codebase to ensure robust comparisons.
* **ALWAYS use the custom navigation hook (useAppNavigation)** for screen transitions instead of raw hooks or raw navigation calls to avoid 'as any' casts.

> 💬 If the AI ever violates any rule above, the correct response is to **redo the work from scratch** following the rules — not patch it.
