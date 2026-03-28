# Agent Reference Guide: ShareMyRide

This document serves as the primary technical context and rulebook for AI agents working on the ShareMyRide (Tuktuk) codebase.

## 🚀 Project Overview
ShareMyRide is a premium cab and bike-pooling application designed for a GenZ demographic. It balances high-energy movement with unwavering safety through a "Kinetic Sanctuary" design language.

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
6. **Design Fidelity**: DO NOT change the design of screens provided by the user. Keep the visual "Kinetic Sanctuary" aesthetics exactly as specified.
7. **Validation**: Always implement field validation from the start to ensure data integrity.

## 🎨 Design System: "Kinetic Sanctuary"
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
