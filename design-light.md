# Design System Strategy: The Ride Pool Company

## 1. Overview & Creative North Star

The "Ride Pool Company" is the creative North Star of this design system. For a cab and bike-pooling application, we must balance the high-energy, "on-the-move" lifestyle of a GenZ demographic with the unwavering safety required for shared transit.

We move away from the "utility-first" look of legacy ride-sharing apps. Instead, we embrace **Editorial Fluidity**. This means using intentional asymmetry, generous white space, and a "layered paper" aesthetic. By avoiding harsh borders and rigid grids, we create an interface that feels like a premium concierge service—organic, breathing, and sophisticated.

## 2. Color Philosophy & The "No-Line" Rule

This system utilizes a sophisticated palette of deep forest greens (`primary`) and supporting muted greens (`secondary`) to establish an immediate sense of growth and reliability, with an accent of plum (`tertiary`).

### The "No-Line" Rule

**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off content. In this system, boundaries are defined strictly by:

1. **Tonal Shifts:** Placing a `surface_container_low` card against a `surface` background.
2. **Negative Space:** Using the spacing scale (e.g., `spacing.8`) to create "invisible" barriers.
3. **Soft Transitions:** Utilizing the `surface_variant` to subtly distinguish a header from a body without a hard stroke.

### Surface Hierarchy & Nesting

Treat the UI as a physical stack.

- **Base:** `surface` (#f5fbf4) serves as the floor.
- **Secondary Zones:** Use `surface_container` (#eaefe9) for large content areas like map sidebars or profile sections.
- **Floating Elements:** Interactive cards must use `surface_container_lowest` (#ffffff) to provide a "lifted" look that suggests priority.

### The "Glass & Gradient" Rule

To inject a premium feel, use Glassmorphism for persistent elements (like a floating bottom navigation bar). Use a backdrop-blur of 12px-16px paired with a 60% opacity `surface_container_lowest`. For primary CTAs, apply a subtle linear gradient from `primary` (#04885b) to `primary_container` (#00875a) at a 135-degree angle. This adds "soul" and depth that static hex codes cannot provide.

## 3. Typography: Editorial Authority

We use **Plus Jakarta Sans** as our sole typeface. Its geometric yet friendly curves perfectly mirror our "Round 12" geometry.

- **Display (lg/md/sm):** Used for "Status" screens (e.g., "Your ride is here"). Use `display-md` with `on_surface` to grab attention through scale, not weight.
- **Headline & Title:** These are your directional anchors. `headline-sm` should be used for section titles to give the app an editorial, magazine-like feel.
- **Body & Label:** Use `body-md` for all primary information. For secondary metadata (like "License Plate" or "Time of Arrival"), use `label-md` with the `on_surface_variant` color to create a clear visual hierarchy.

## 4. Elevation & Depth: The Layering Principle

Hierarchy is achieved through **Tonal Layering** rather than structural lines.

- **Ambient Shadows:** For high-priority floating actions (like "Book Now"), use a shadow with a 24px blur and 6% opacity. The shadow color must be a tinted version of `on_surface` (#171d19) to ensure it feels like a natural shadow cast in a green-tinted environment.
- **The "Ghost Border" Fallback:** If accessibility requirements demand a container edge, use the `outline_variant` (#bdcac0) at **15% opacity**. This creates a "Ghost Border" that defines a shape without cluttering the visual field.
- **Nesting Depth:** Always follow the "Higher is Lighter" rule. An inner card sitting on a `surface_container` should be `surface_container_lowest` (Pure White) to visually "pop" toward the user.

## 5. Components & Primitives

### Buttons: The Kinetic Anchor

- **Primary:** Gradient of `primary` to `primary_container`. Corner radius: `rounded.md` (12px). Typography: `title-sm` (Semi-bold).
- **Secondary:** No background. Use a "Ghost Border" (15% opacity `outline_variant`) and `primary` text.
- **Interaction:** On hover/tap, the gradient should shift slightly in angle, or the `surface_tint` should increase in intensity.

### Input Fields: The Soft Entry

- **Styling:** Avoid boxes. Use a `surface_container_high` background with a `rounded.md` corner.
- **States:** On focus, transition the background to `surface_container_lowest` and add a 2px `primary` ghost-border (20% opacity).

### Cards & Lists: The No-Divider Rule

- **Constraint:** Never use a horizontal line to separate list items (e.g., "Previous Trips").
- **Solution:** Use a 12px vertical gap (`spacing.3`) between items. Each list item should be its own subtle `surface_container_low` shape, or simply separated by intentional white space.

### Additional Signature Components

- **Trust Badge:** A small, `primary_fixed` container with `on_primary_fixed_variant` text, used to highlight "Verified Drivers" or "Safety Inspected" bikes.
- **Route Pulse:** A custom map marker using a `primary` glow with a 40% opacity `primary_fixed_dim` outer ring to indicate real-time movement.

## 6. Do’s and Don’ts

### Do:

- **Do** use asymmetrical margins (e.g., more padding at the top than the bottom) to create a premium, custom layout.
- **Do** leverage the `tertiary` (#6a6ec3) sparingly for safety alerts or "End Trip" actions to provide high-contrast urgency without breaking the green harmony.
- **Do** use `rounded.full` for small avatars and status chips, but stick to `rounded.md` (12px) for all functional containers.

### Don't:

- **Don't** use pure black (#000000) for text. Use `on_surface` (#171d19) to maintain the soft, organic vibe.
- **Don't** use standard 1px dividers. If you feel the need for a divider, increase your `spacing` token instead.
- **Don't** use high-intensity drop shadows. If the shadow is easily visible, it's too dark. It should feel like a "suggestion" of depth.

# Design System Document

This document outlines the core visual characteristics of our design system.

## Theme Details

- **Color Mode**: Light
- **Seed Color**: `#00875A`
- **Color Variant**: Content
- **Headline Font**: Plus Jakarta Sans
- **Body Font**: Plus Jakarta Sans
- **Label Font**: Plus Jakarta Sans
- **Roundedness**: Moderate (2)
- **Spacing**: Normal (2)

## Color Palette

Our primary color palette is derived to ensure consistency and brand recognition:

- **Primary Color**: `#04885b` (Used for primary actions, key interactive elements)
- **Secondary Color**: `#597f6a` (Used for supporting elements, secondary actions)
- **Tertiary Color**: `#6a6ec3` (Used for accents, highlights, badges)
- **Neutral Color**: `#737873` (Used for backgrounds, surfaces, text in neutral contexts)
