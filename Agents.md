# Agent Reference Guide: ShareMyRide

This document serves as the primary technical context and rulebook for AI agents working on the ShareMyRide (Tuktuk) codebase.

## 🚀 Project Overview
ShareMyRide is a premium cab and bike-pooling application designed for a GenZ demographic. It balances high-energy movement with unwavering safety through a "Ride Pool Company" design language.

## 🛠️ Architecture: Atomic Design
We follow a strict Atomic Design hierarchy for components:
- `src/components/atoms`: Smallest building blocks (Buttons, Inputs, Typography, Spacing).
- `src/components/molecules`: Combinations of atoms forming functional units (Form fields, Header bars).
- `src/components/organisms`: Complex components forming distinct UI sections (Ride details card, User profile section).
- `src/components/templates`: Page-level layouts that define the content structure.
- `src/screens`: Fully assembled pages that are registered in the navigation system.

### Component/Screen Structure
Every component or screen must follow this file structure:
```text
ComponentName/
├── ComponentName.screen.tsx (or .tsx for components)
├── ComponentName.styles.ts  (Styled-components only)
├── useComponentName.ts      (Logic/Hook - if needed)
├── types.d.ts               (Type definitions)
└── index.ts                 (Clean exports)
```

## 📜 Development Rules & Best Practices
1. **SOLID Principles**: Always apply SOLID principles to ensure the codebase remains maintainable and scalable.
2. **File Length Limit**: Every file MUST HAVE A MAXIMUM OF **200 LINES**. If a file exceeds this, break it down into smaller, reusable components or hooks.
3. **Styling**: 
    - Use **styled-components** for all CSS.
    - NEVER write styles within the main component file; keep them in `ComponentName.styles.ts`.
    - Always refer to the global `theme` from `src/theme`.
4. **Responsiveness**: Screens MUST be dynamic. Use the scaling utilities (`scale`, `verticalScale`, etc.) to ensure the UI adapts to any screen size automatically.
5. **Keyboard Handling**: Ensure `TextInput` elements are always focused and visible above the keyboard (never hidden behind it).
6. **Design Fidelity**: DO NOT change the design of screens provided by the user. Keep the visual "Ride Pool Company" aesthetics exactly as specified.
7. **Validation**: Always implement field validation from the start to ensure data integrity.

# Agent Rule Guide: ShareMyRide

⸻


# 📜 Development Rules & Best Practices

## 🧱 1. Architecture & SOLID
- Always follow **SOLID principles** strictly.
- Maintain clear **separation of concerns**:
  - UI → Components  
  - Logic → Hooks  
  - Data/API → Services  
- Avoid tightly coupled modules.
- Prefer reusable, testable, and modular code.
- Follow **Atomic Design** strictly (atoms → molecules → organisms → templates).

---

## 📦 2. File & Component Rules
- Every file MUST have a maximum of **200 lines**.
- Follow strict component structure:

ComponentName/
ComponentName.tsx
ComponentName.styles.ts
useComponentName.ts (if needed)
types.d.ts
index.ts

- No business logic inside UI components.
- Break large components into smaller reusable units.
- Keep components focused on a single responsibility.

---

## 🎨 3. Styling Rules
- Use **styled-components** for all styling.
- NEVER write styles inside `.tsx` files.
- Always use theme from `src/styles/theme`.
- Avoid hardcoded:
- colors
- spacing
- font sizes
- Use only **design tokens from theme**.

---

## 📱 4. Responsiveness
- UI must adapt to:
- small phones
- large phones
- tablets
- Use responsive utilities:
- `scale`
- `verticalScale`
- `moderateScale`
- Avoid fixed dimensions unless absolutely necessary.
- Prefer **flex-based layouts**.

---

## ⌨️ 5. Keyboard Handling
- TextInput must NEVER be hidden behind the keyboard.
- Use:
- `KeyboardAvoidingView`
- Scroll containers where needed
- Ensure smooth UX on both **Android & iOS**.

---

## 🎯 6. Design Fidelity
- DO NOT change provided designs.
- Maintain exact **"Ride Pool Company" aesthetics**.
- Follow:
- spacing
- typography
- colors
- layout hierarchy

---

## ✅ 7. Validation
- Implement validation for all inputs.
- Validate:
- required fields
- formats (email, phone, etc.)
- Show proper error messages.

---

## 🧠 8. State Management
- Use **Zustand** for global state.
- Keep stores:
- minimal
- modular
- predictable
- Avoid unnecessary global state.

---

## 🌐 9. API & Networking
- Use centralized **Axios client**.
- Implement:
- request interceptors
- response interceptors
- error handling
- No direct API calls inside components.

---

## 🔐 10. Storage & Security
- Use **Keychain** for sensitive data (tokens).
- Use **MMKV** for local storage.
- Never store sensitive data in plain storage.
- Handle token expiration securely.

---

## 🚀 11. Performance
- Avoid unnecessary re-renders.
- Use:
- `useMemo`
- `useCallback`
- `React.memo`
- Split heavy components.
- Lazy load where needed.

---

## 📂 12. Imports & Structure
- Use alias imports:

@/components/...

	•	Avoid relative imports like:

../../components/...


	•	Keep folder structure clean and consistent.

⸻

🧹 13. Code Quality
	•	Fix all ESLint issues.
	•	Fix all TypeScript errors.
	•	Remove:
	•	unused variables
	•	dead code
	•	console logs (unless required)
	•	Maintain consistent naming conventions.

⸻

🔄 14. Reusability
	•	Extract reusable logic into hooks.
	•	Avoid duplication across components.
	•	Create shared UI components when needed.

⸻

🧪 15. Testing (Recommended)
	•	Write unit tests for:
	•	hooks
	•	utilities
	•	Use Jest + React Native Testing Library.
	•	Ensure critical flows are covered.

⸻

⚠️ 16. Critical Rules
	•	Do NOT break existing functionality.
	•	Do NOT change business logic unnecessarily.
	•	Focus on:
	•	scalability
	•	readability
	•	maintainability
	•	production readiness

---

## 🚀 17. Performance
- Keep all the text in baseLocalization.
- Use:
- call all the text from baseLocalization

## 🎨 Design System: "Ride Pool Company"
**Creative North Star**: Editorial Fluidity & Organic Sophistication.

### Core Styling Rules:
1. **The "No-Line" Rule**: DO NOT use 1px solid borders to section off content.
    - Use **Tonal Shifts** (e.g., `surface_container` vs `surface`).
    - Use **Negative Space** (spacing tokens).
    - Use **Soft Transitions** (gradients or subtle surface variants).
2. **Geometry**: Use `roundness.md` (12px) for most functional containers.
3. **Typography**: **Plus Jakarta Sans** is the sole typeface. 
4. **Elevation**: Use subtle, tinted ambient shadows for floating elements ("Higher is Lighter" rule).
5. **Gradients**: Use linear gradients (Primary to Primary Container at 135°) for main CTAs.


## 📏 Responsiveness & Scaling
ALWAYS use the responsive utilities from `src/styles`:
- `scale(size)`: For horizontal scaling (width, horizontal padding).
- `verticalScale(size)`: For vertical scaling (height, vertical padding).
- `moderateScale(size, factor)`: For icons, spacing, and elements that shouldn't scale aggressively.
- `responsiveFont(size)`: Specifically optimized for typography across device classes.
- `selectByWidth({})`: Use for device-specific overrides (Small, Medium, Large, Tablet).

## 🔗 Path Aliases
| Alias | Target Directory |
| :--- | :--- |
| `@/*` | `src/*` |
| `atoms/*` | `src/components/atoms/*` |
| `molecule/*` | `src/components/molecules/*` |
| `organism/*` | `src/components/organisms/*` |
| `template/*` | `src/components/templates/*` |
| `assets/*` | `src/assets/*` |
| `constants/*` | `src/constants/*` |
| `navigation/*` | `src/navigation/*` |
| `screens/*` | `src/screens/*` |
| `services/*` | `src/serviceManager/*` |
| `store/*` | `src/store/*` |
| `utils/*` | `src/utils/*` |

## 📁 Directory Map
- `src/assets`: Images, icons, and static fonts.
- `src/constants`: Global application constants and configuration.
- `src/navigation`: Navigation container and stack definitions.
- `src/serviceManager`: API clients, hooks, and external service integrations.
- `src/store`: State management (Zustand/Redux).
- `src/theme`: Theme type definitions and Light/Dark variants.
- `src/utils`: Helper functions and shared utilities.
- `scripts`: Configuration scripts for build and aliases.
