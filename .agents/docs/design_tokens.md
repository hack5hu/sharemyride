---
title: Design Tokens Reference
tags: [docs, design, theme, tokens, colors]
link: ../../AGENTS.md
---

# Design Tokens Reference (Ride Pool Identity)

This document contains a complete list of colors, spacing, typography rules, and geometries configured in the design system.

---

## 🎨 Theme Colors (Material Design-derived Theme Colors)

We support both `LightTheme` and `DarkTheme` with the following naming and behavior. Theme keys must be written in **snake_case**.

| Token Name | Light Value | Dark Value | Description |
|:---|:---|:---|:---|
| `primary` | `#0058bc` | `#adc6ff` | Main brand color for action highlights |
| `primary_container` | `#0070eb` | `#004390` | Background container fill color |
| `on_primary` | `#ffffff` | `#002e69` | Text/Icon overlay on primary |
| `on_primary_container` | `#fefcff` | `#d8e2ff` | Text/Icon overlay on container |
| `secondary` | `#515f78` | `#b9c7e4` | Secondary elements/tabs |
| `secondary_container` | `#d2e0fe` | `#39475f` | Secondary highlight background |
| `on_secondary` | `#ffffff` | `#233148` | Text/Icon overlay on secondary |
| `on_secondary_container` | `#55637d` | `#d6e3ff` | Text/Icon on secondary container |
| `background` | `#f9f9f9` | `#111318` | Core background surface |
| `surface` | `#f9f9f9` | `#111318` | Default component card surface |
| `surface_variant` | `#e2e2e2` | `#44474f` | Alternative component background |
| `on_surface_variant` | `#414755` | `#c4c6d0` | Secondary copy/metadata text color |
| `error` | `#ba1a1a` | `#ffb4ab` | Error/Destructive elements color |
| `error_container` | `#ffdad6` | `#93000a` | Error feedback container background |
| `outline` | `#717786` | `#8e9099` | Split dividers and subtle line tokens |
| `warning` | `#F59E0B` | `#F59E0B` | Warning color highlights |
| `truecaller` | `#0052ff` | `#0052ff` | Truecaller button brand color |

---

## 📐 Spacing & Layout Tokens

Spacing values must never be hardcoded as numbers. Always reference the theme `spacing` mapping:

```typescript
// Spacing scale:
spacing: {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
}
```

Usage in styled-components:
```typescript
padding: ${({ theme }) => theme.spacing.md}px; /* 16px */
margin-bottom: ${({ theme }) => theme.spacing.sm}px; /* 8px */
```

---

## 🔘 Geometry & Roundness (Border Radius)

We follow standard rounded geometry rules defined in `roundness`:

```typescript
roundness: {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12, // Standard card border radius
  lg: 16,
  xl: 24,
  full: 999, // Circular avatars or pill chips
}
```

---

## 📏 Responsive Scaling Utilities

Never write raw pixel metrics. Wrap dimensions in scaling helper functions from `@/styles/scale`:

| Helper Function | Scope | Code Example |
|:---|:---|:---|
| `scale(n)` | Widths, horizontal paddings/margins | `width: ${scale(200)}px;` |
| `verticalScale(n)` | Heights, vertical paddings/margins | `height: ${verticalScale(44)}px;` |
| `moderateScale(n)` | Icons, border-radius, spacing values | `border-radius: ${moderateScale(8)}px;` |
| `responsiveFont(n)` | All font sizing definitions | `font-size: ${responsiveFont(16)}px;` |

---

## ✍️ Typography Standards

* **Font Family**: Exclusive use of **Plus Jakarta Sans** via standard `Typography` atom.
* **Weights**: Understood by `theme.fonts`:
  - `regular`: `400`
  - `medium`: `500`
  - `semiBold`: `600`
  - `bold`: `700`
