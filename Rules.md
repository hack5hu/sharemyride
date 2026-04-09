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
• Fix all ESLint issues.
• Fix all TypeScript errors.
• Remove:
• unused variables
• dead code
• console logs (unless required)
• Maintain consistent naming conventions.

⸻

🔄 14. Reusability
• Extract reusable logic into hooks.
• Avoid duplication across components.
• Create shared UI components when needed.

⸻

🧪 15. Testing (Recommended)
• Write unit tests for:
• hooks
• utilities
• Use Jest + React Native Testing Library.
• Ensure critical flows are covered.

⸻

⚠️ 16. Critical Rules
• Do NOT break existing functionality.
• Do NOT change business logic unnecessarily.
• Focus on:
• scalability
• readability
• maintainability
• production readiness

---

## 🚀 17. Performance

- Keep all the text in baseLocalization.
- Use:
- call all the text from baseLocalization
