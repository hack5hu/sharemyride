---
name: session-wrapup
description: Concluding a coding session, verifying TypeScript types, checking line-count caps, running linters/tests, and preparing a clean session handoff summary or diary.
tags: [wrapup, audit, handoff, session, validation]
link: ../../AGENTS.md
---

# Session Wrap-Up & Continuity Guide

## Overview
Automates the pre-flight wrap-up checklist at the end of a session to guarantee zero regressions, strict compliance with the project's rules, and smooth context carry-over to future sessions.

## Wrap-Up Workflow

### Step 1: Quality & Constraint Audit
1. **200-Line Limit**: Ensure no modified or newly created file exceeds 200 lines. Refactor if needed.
2. **Strict TypeScript (`any` forbidden)**: Verify all props, states, and return types are strictly typed with generics, enums, or discriminated unions.
3. **No Raw Primitives**: Ensure no raw `View`, `Text`, or `TouchableOpacity` imports from `react-native` are present.
4. **No Inline Styles & No-Line Rule**: Verify all styling is in `*.styles.ts` with no hardcoded hex/pixel values and no `borderWidth: 1`.
5. **Localization**: Confirm all user-facing copy uses `useLocale()` / `baseLocalization`.

### Step 2: Cleanliness
1. Remove all debug `console.log` statements.
2. Remove unused imports and dead code.
3. Ensure all components have corresponding `.stories.tsx` files (except templates).

### Step 3: Session Handoff Diary
Prepare a brief bulleted summary of:
- **What was accomplished**: Summary of features/fixes completed.
- **Key architecture decisions**: Any new enums, types, or services added.
- **Next steps / Pending items**: Clear action items for the next session.
