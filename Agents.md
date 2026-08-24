# 🤖 Agent Reference Guide: ShareMyRide (Tuktuk)
**Version 3.0 — AI-Agent Optimization & Developer Standard**

---

## 🚨 ABSOLUTE LAW — READ BEFORE WRITING A SINGLE CHARACTER

> This document is the **only** law governing every line of code written for ShareMyRide.
> **Non-compliance = invalid output = redo from scratch.**
> There is no partial credit. There is no "I'll fix it later."

### Pre-Flight Checklist (mandatory before every prompt)

Run every item. Check the box mentally. Only then write code.

1. ✅ **Read this file in full.**
2. ✅ **Query Storybook MCP & Stitch MCP first.** Check Storybook for components. Use Stitch MCP to manage screens and design systems.
3. ✅ **Check `@/hooks`, `@/utils`, `@/components/atoms`** — never recreate what exists.
4. ✅ **No raw RN primitives** — `View`, `Text`, `TouchableOpacity` are forbidden; use atoms.
5. ✅ **Every screen needs a Template** in `@/components/templates/`.
6. ✅ **Every string goes through `useTranslation()`** — zero hardcoded text.
7. ✅ **Every dimension uses a scaling util** — `scale()`, `verticalScale()`, `moderateScale()`, `responsiveFont()`.
8. ✅ **Styled-components only** — no inline styles, no `StyleSheet.create`.
9. ✅ **`any` is a build error** — use proper generics or discriminated unions.
10. ✅ **Enums for every status/type constant** — never compare raw strings.
11. ✅ **`useAppNavigation`** for all screen transitions.
12. ✅ **`showNotification` / `ConfirmationModal`** — never `Alert.alert`.
13. ✅ **Loader overlays** — `width: 100%`, centered, `transparent` prop.
14. ✅ **`React.memo`, `useCallback`, `useMemo`** applied by default — not as an afterthought.
15. ✅ **200-line hard cap per file** — exceed it and refactor immediately.
16. ✅ **Remove all `console.log`, dead imports, unused variables** before output.
17. ✅ **No `eslint-disable` comments** — fix the root cause.

> ⛔ Skipping any item above produces invalid output. Redo from scratch.

---

## 🔍 0. Quick-Start for AI Agents

Welcome, AI Agent! To ensure you work effectively with a limited context window:
1. **Locate Skills**: Reference `.agents/skills/SKILLS.yaml` to discover tool capabilities.
2. **Consult Instructions**: Check `.agents/instructions/` for step-by-step guidance on creating components, routing, and running tests.
3. **Verify Constraints**: Strictly adhere to `.agents/rules/development.md`.
4. **Run Tests**: Execute `yarn test` for Jest unit tests and `npx vitest` for Storybook browser-based interaction tests.

---

## 🛠️ 1. Tech Stack Overview

* **Primary Language**: TypeScript (`tsconfig.json` configured with absolute path mapping)
* **Framework**: React Native 0.84.1 & React 19.2.3 (React Native CLI-based codebase)
* **Build System / Package Manager**: Gradle (Android), CocoaPods (iOS) / Yarn (using `yarn.lock`)
* **Test Frameworks**: Jest (unit testing) and Vitest + Playwright (Storybook interaction testing)
* **Styling & Theme Engine**: Styled Components (`styled-components/native`)
* **State Management**: Zustand (stores defined in `src/store/`)
* **Central Networking Client**: Axios instance located in `src/serviceManager/`
* **Local Storage / Secure Storage**: MMKV (`react-native-mmkv`) & Keychain (`react-native-keychain`)

---

## 🎨 2. Design Tokens Reference

For detailed visual specs, see [design_tokens.md](file:///.agents/docs/design_tokens.md).

* **Colors** (Accessible via `theme.colors.*` in snake_case):
  - Primary Action: `primary` (`#0058bc` / `#adc6ff`)
  - Container Backgrounds: `primary_container` (`#0070eb` / `#004390`)
  - Screen Backgrounds: `background` (`#f9f9f9` / `#111318`)
  - Neutral Secondary Surface: `surface_variant` (`#e2e2e2` / `#44474f`)
  - Typography Copy: `on_surface_variant` (`#414755` / `#c4c6d0`)
* **Spacing Guidelines**: `xs: 4px`, `sm: 8px`, `md: 16px`, `lg: 24px`, `xl: 32px`, `xxl: 40px` (use `theme.spacing.*`).
* **Border Radii**: `none: 0`, `xs: 4`, `sm: 8`, `md: 12` (default card radius), `lg: 16`, `xl: 24`, `full: 999`.
* **Typography**: Plus Jakarta Sans only. Scale size with `responsiveFont()`.

---

## 📁 3. Components Catalog

The codebase enforces **Atomic Design**. Below is an inventory of all reusable components:

### Atoms (`src/components/atoms/`)
* `Avatar`, `Badge`, `Box`, `Button`, `CategoryIcon`, `Checkbox`, `Chip`, `ColorChip`, `CounterButton`, `DurationChip`, `Handlebar`, `IconButton`, `Input`, `Loader`, `MapPin`, `MessageStatus`, `ModalBackdrop`, `SeatButton`, `SectionHeader`, `StatValue`, `StatusBadge`, `Surface`, `Tag`, `Toggle`, `Typography`, `UserLocationMarker`, `VerifiedBadge`, `ZyncRideLogo`.

### Molecules (`src/components/molecules/`)
* `AvatarPicker`, `BentoMapPreview`, `CategoryButton`, `ChatMapPreview`, `CommonHeader`, `CompactRideItem`, `DatePickerInput`, `DobInput`, `DriverProfileSummary`, `ETAInfo`, `EmptyState`, `FareCard`, `FrontSeatPremium`, `GenderSelector`, `GlassSearchBar`, `InfoBar`, `InfoBox`, `LiveLocationToggle`, `LocationDetailsCard`, `LocationInput`, `LocationListItem`, `MapControlsFABs`, `MessageBubble`, `MessageItem`, `MultiStopCard`, `Notification`, `OtpInput`, `PreferenceCard`, `PriceCounter`, `ProfileMenuItem`, `ReasonSelectorItem`, `RideTimeline`, `RideTimestampRow`, `RideTypeToggle`, `RiderCard`, `RouteIndicator`, `SafetyBanner`, `ScreenHeader`, `ScreenShell`, `SearchInput`, `SeatLegend`, `SeatSummaryBar`, `SegmentPricingCard`, `SelectionPreviewCard`, `SocialButton`, `StatItem`, `StopItem`, `TimeDial`, `Toast`, `TrustInfoBar`, `VehicleCard`, `VehicleHorizontalList`, `VehicleToggle`, `VehicleTypeCard`.

### Organisms (`src/components/organisms/`)
* `ActionSheetModal`, `BottomNav`, `CancelRideModal`, `CarFloorPlan`, `ChatAppHeader`, `ChatInputSection`, `ConfirmationModal`, `DriverSection`, `GlobalNotification`, `IdentityProfileCard`, `LocationBottomSheet`, `LocationInputsBento`, `LoginForm`, `MapActionFAB`, `MapContextOverlay`, `MapSearchOverlay`, `MapViewer`, `MatchedRideBento`, `MiddleStopSearchOverlay`, `MiddleStopsList`, `MonthCalendar`, `MyRidesHeader`, `NetworkLoggerModal`, `OlaMap`, `PassengerManagement`, `PreferencesSection`, `ProfileHeader`, `RecentMessagesSection`, `ReportIssueModal`, `RideCard`, `RideComfortSection`, `RideFareCard`, `RideFiltersModal`, `RideItem`, `RideListHeader`, `RideStatsStrip`, `RideSummaryCard`, `RideVehicleCard`, `RidersHorizontalList`, `RouteCard`, `RouteJourney`, `SafetyTrustCard`, `SegmentPricingSheet`, `SocialSection`, `TimePickerCard`, `TrustScoreCard`, `UpcomingRideCard`.

### Templates (`src/components/templates/`)
* `AvailableRidesTemplate`, `BookRideInfoTemplate`, `BookSeatSelectionTemplate`, `BookingConfirmedTemplate`, `CancelRideTemplate`, `ChatDetailsTemplate`, `ChatListTemplate`, `DateSelectionTemplate`, `DummyTemplate`, `EditProfileTemplate`, `LocalRideResultsTemplate`, `LocationSelectionTemplate`, `LoginTemplate`, `MapPickerTemplate`, `MiddleStopMapTemplate`, `MiddleStopsTemplate`, `MyRideDetailsTemplate`, `MyRidesTemplate`, `NetworkLogsTemplate`, `OTPVerificationTemplate`, `PriceSelectionTemplate`, `ProfileHubTemplate`, `ProfileSetupTemplate`, `PublishSuccessTemplate`, `RatingTemplate`, `RequestTypeTemplate`, `RideDetailsTemplate`, `RideInformationTemplate`, `RideRouteMapTemplate`, `RouteSelectionTemplate`, `SeatSelectionTemplate`, `SelectLocationTemplate`, `SettingsTemplate`, `SplashTemplate`, `SuggestionsTemplate`, `SummaryPublishTemplate`, `SupportTemplate`, `TimeSelectionTemplate`, `TravelPreferencesTemplate`, `UserProfileDetailTemplate`, `VehicleDetailsTemplate`, `VehicleListTemplate`.

---

## 📈 4. Concrete Recommendations Report (Priority Matrix)

### AI Agent Navigability
* **Aliased Pathing**: TS paths (`@/*`, `atoms/*`, `molecule/*`, `organism/*`, `template/*`, `services/*`, `store/*`) simplify module references and eliminate deep relative imports (`../../`). Always import via aliases.
* **Bounded Components**: Every component has a dedicated folder containing UI, styles, types, and logic hook. Do not spread component files across folders.
* **Global Component Placement**: Reusable UI components must live in global directories (`src/components/atoms`, `src/components/molecules`, `src/components/organisms`). Do not create local `components/` subfolders nested inside templates or screens.

### Context Efficiency
* **Line Limit**: Keep files strictly under **200 lines**. This keeps context footprints small and limits the tokens generated in diffs.
* **Atomic State Selectors**: When consuming Zustand store values in logic hooks, import only the specific fields needed rather than the whole store object.

### Code Discoverability
* **Component Indexing**: Use component barrel export `index.ts` files to easily search export maps.
* **Component Inventory**: Refer to Section 3 of this document to identify existing controls before authoring new ones.

### Task Decomposition
* Split any new screen or feature request into independent, verifiable sub-tasks:
  1. Declare localized labels in `en.ts` / `hi.ts`.
  2. Register navigation parameters in `types.d.ts`.
  3. Author styled components in `styles.ts`.
  4. Write core state/handlers in `useHook.ts`.
  5. Assemble the Template file.
  6. Mount in a screen container file under `src/screens/`.
  7. Add story files and verify in Storybook.

### Dependency Clarity
* **Lock-file Sync**: Never run modifications to package versions without committing the updated `yarn.lock` along with `package.json`.
* **Central Services**: Maintain the central Axios client (`axiosClient.ts`) to manage tokens and api routes. Never call Axios inline in hooks.

### Build/Test Isolation
* Test files are isolated from bundle paths. Run local `yarn test` commands to verify logic changes in isolation.
* Use Vitest browser tests (`npx vitest`) to execute specific Stories verification without launching full Android/iOS simulators.

### Documentation Quality
* Document component props in `types.d.ts` and write docstrings on public utilities in `src/utils/` to give agents immediate auto-complete context.

### Repository Scalability
* As the workspace grows, transition toward a monorepo setup (e.g. Turborepo) where shared mobile UI components are structured into a package distinct from screens.

### Developer Onboarding
* Run `yarn start` and launch simulators with `yarn android` or `yarn ios`. Use `yarn storybook` to launch visual testing immediately.

### Multi-agent Parallel Development
* **Isolation Branches**: Agents should always compile and test changes inside dedicated git branches prefixed with `agent/`.
* **Atomic commits**: Commit changes incrementally by component bounds to prevent merge conflicts.
* **State Cleanliness**: Enums must be used for comparisons to avoid branch merge issues on string mutations.

---

## 🌳 5. Created Directory Structure (`tree -L 3 .agents`)

```text
.agents/
├── docs/
│   ├── architecture.md
│   └── design_tokens.md
├── instructions/
│   ├── components.md
│   ├── navigation.md
│   └── testing.md
├── rules/
│   └── development.md
└── skills/
    ├── api/
    │   └── SKILL.md
    ├── components/
    │   └── SKILL.md
    ├── localization/
    │   └── SKILL.md
    ├── navigation/
    │   └── SKILL.md
    ├── storybook/
    │   └── SKILL.md
    ├── SKILLS.yaml
    └── update_skills.sh
```

---

## 🎯 6. TL-Checklist (Verification)

> **"Team Lead Checklist: Verify that `Agents.md` is in the root, `.agents/skills/SKILLS.yaml` is fully populated, the automation script `update_skills.sh` runs successfully, and all rule/instruction markdown documents are present."**