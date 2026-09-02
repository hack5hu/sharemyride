---
title: Development Rules
tags: [rules, standards, linting, typescript]
link: ../../AGENTS.md
---

# Development Rules & Constraints

These development rules are absolute and must be followed by any AI agent or developer modifying the codebase. Non-compliance results in invalid code that must be redone from scratch.

## Code Structure & Conventions

### 1. No React Native Primitives
* Never import `View`, `Text`, `TouchableOpacity`, `TextInput`, or `Image` directly from `react-native`.
* Always use pre-built components from `src/components/atoms` (e.g. `Box`, `Typography`, `Button`, `Input`, `FastImage`).

### 2. Styling Rules
* **No inline styles**: Always use `styled-components`.
* **No StyleSheet.create**: Always use `styled-components`.
* **Theme Tokens Only**: Never use hardcoded hex colors or raw pixel sizes. Refer to the theme spacing (`theme.spacing.md`) and colors (`theme.colors.primary`). Theme color tokens are defined in **snake_case** (e.g., `on_surface_variant`).
* **Responsive Scaling**: Every dimension, width, height, margin, padding, border radius, and font size must be scaled using scaling utilities from `@/styles/scale`:
  - `scale(x)`: for horizontal sizing/width.
  - `verticalScale(y)`: for vertical sizing/height.
  - `moderateScale(z)`: for icons, spacing, and border radius.
  - `responsiveFont(f)`: for all typography font sizes.
* **No borders**: Do not use `borderWidth: 1`. Separate content using tonal shifts (different background colors) or negative space.

### 3. TypeScript Rules
* Strict typing is required. The `any` keyword is completely forbidden.
* Always define clear types and interfaces for component props (`ComponentNameProps`), store states, API parameters, and responses.
* Define and use **enums** for status, types, and mode constants across the codebase to ensure robust comparison (e.g. `NotificationType`, `SessionStatus`, `MessageStatus`). Never compare raw strings.

### 4. Separation of Concerns
* No business logic in UI files.
* Component file structure MUST follow:
  ```text
  ComponentName/
  ├── ComponentName.tsx           (UI layout only, logic-free, React.memo)
  ├── ComponentName.styles.ts     (styled-components only, styled definitions)
  ├── useComponentName.ts         (handlers, API calls, logic, local state hook)
  ├── ComponentName.stories.tsx   (required for atoms, molecules, organisms)
  ├── types.d.ts                  (TypeScript definitions)
  └── index.ts                    (barrel export)
  ```
* Every screen must consist of a Template from `src/components/templates/` mounted within a lightweight Screen entry point under `src/screens/`.

### 5. File Limits & Optimization
* Hard cap: **200 lines per file**. If a file exceeds this limit, refactor immediately by extracting child components or custom hooks.
* Performance: Functional components must be wrapped in `React.memo()`. Always use `useCallback` for event handlers and `useMemo` for derived computation.
* Lists: Never use React Native's `FlatList`. Always use Shopify's `FlashList` with a defined `estimatedItemSize` scaled vertically.

### 6. Storage & Security
* Auth tokens, access credentials, and sensitive PII must be stored in `react-native-keychain`.
* User preferences, lightweight state caching, and non-sensitive configs must be stored in `MMKV`. Do not store sensitive tokens in MMKV.

### 8. Import Ordering Rules
* Imports must strictly follow this order with alphabetization within each group:
  1. **External Packages**: Standard and third-party node modules (e.g., `axios`, `react`, `react-native-keychain`).
  2. **Internal Aliases (`@/*`)**: Absolute alias imports (e.g., `@/constants/apiEndpoints`, `@/store/useAuthStore`, `@/utils/logger`).
  3. **Relative Imports (`./*`, `../*`)**: Local sibling and parent files (e.g., `./useComponent`, `../types`).
* Enforced via ESLint `import/order` with auto-fix support (`eslint --fix`).

