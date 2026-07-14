---
name: localization
description: Consuming and declaring localized copy across English and Hindi using useTranslation and base localization assets.
tags: [localization, translations, i18n]
link: ../../AGENTS.md
---

# Localization Management (i18n)

## Overview
Assists in preventing hardcoded strings by referencing structured keys from `en.ts` and `hi.ts` via the `useTranslation` hook.

## Key Files
| File / Folder | Purpose |
|------|---------|
| `src/hooks/useTranslation.ts` | Hook exporting the `t` translator function |
| `src/constants/localization/en.ts` | Core English translation key mappings |
| `src/constants/localization/hi.ts` | Mirror Hindi translation key mappings |
| `src/constants/localization/types.ts` | Type definitions verifying both locales are aligned |

## Inputs
- Static copy modifications or new copy requirements
- Translation keys hierarchy (e.g. `notification.loginSuccess`)

## Outputs
- Updated `en.ts` and `hi.ts` translation catalogs matching type specs
- UI component using `t('path.to.key')` instead of hardcoded text

## Examples
### Consuming Translations:
```typescript
import { useTranslation } from '@/hooks/useTranslation';

const MyComponent = () => {
  const { t } = useTranslation();
  return <Typography>{t('auth.login.title')}</Typography>;
};
```

### Interpolating Parameters:
```typescript
// en.ts: otp_resend: "Resend OTP in {seconds}s"
t('auth.otp.otp_resend', { seconds: 30 })
```

## Guardrails
- **NEVER** write raw text in a UI file. Every single user-facing string must reside in the translation files.
- Always add new translation keys to **both** `en.ts` and `hi.ts`.
- Ensure parameter placeholders are enclosed in single curly braces (e.g., `{seconds}`) to match the hook implementation in `useTranslation.ts`.
- Maintain strict typing: `hi.ts` must exactly match the schema of `en.ts` as verified in `types.ts`.
