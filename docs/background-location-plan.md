# Active-ride native location implementation plan

Status: Android implementation in progress; verified changes and remaining release gates below. Updated 2026-09-20.
Purpose: durable implementation context; read this alongside Agents.md before starting work.

## Outcome and scope

- Track only an authenticated, eligible participant in a server-confirmed upcoming or active non-terminal ride, with sharing enabled and permission granted.
- Continue during ordinary background use and screen lock; stop on sharing off, ride end/cancel, logout, account change, or permission revocation.
- Use free platform location APIs; no paid tracking SDK. Native maintenance and backend changes still have engineering cost.
- No promise of zero battery use, exact callback intervals, or tracking after force-stop/force-quit.
- Drivers and passengers may explicitly opt in to sharing for a server-confirmed, non-terminal ride.
- No automatic start for scheduled rides, persisted toggle alone, reboot, or an unverified session.

## Verified repository context

| Existing file | Finding and intended treatment |
| --- | --- |
| `package.json` | RN 0.84.1, React 19.2.3; AppSpecs Codegen scans `src/specs`. Extend existing configuration. |
| `src/specs/NativeSplash.ts` | Existing typed spec, but Android/iOS implementations use legacy export patterns. Do not copy these as the new module architecture. |
| `src/hooks/useGlobalLiveLocation.ts` | Ten-second foreground-only polling; separate status retrieval from location acquisition. |
| `src/store/useLiveRideStore.ts` | Sharing toggle persisted; getCurrentPosition tied to live status; permission result not enforced. Replace these responsibilities with native state reconciliation. |
| `src/store/liveRideHelpers.ts` | rideFound is treated as an active ride even when status is CREATED; STARTED/ACTIVE strings currently affect messaging. Add validated typed eligibility. |
| `src/utils/backgroundLocation.ts` | JS timer/getCurrentPosition loop with background-actions; no external callers found under src. Retire after reference audit. Comments about guaranteed persistence, GPS shutdown, and 99% savings are unsupported. |
| `src/utils/locationQueue.ts` | Global MMKV backlog, unbounded and without ride/user identity; must not replay into a new ride. |
| `src/serviceManager/RideService.ts` | Existing updateLocation posts `{lat, lon}`; backlog posts `{backlog}` with latitude/longitude/timestamp. Server behavior remains unverified. |
| `src/constants/apiEndpoints.ts` | `/ride/{id}/location`, `/ride/{id}/location/backlog`, `/ride/live-status`; no explicit start/end endpoint identified here. |
| `src/serviceManager/tokenRefreshManager.ts` | JS-only refresh serialization; cannot safely add an independent native refresh loop for the same rotating token. |
| `src/serviceManager/NotificationService.ts` | Current live notification is dismissible and not the native service notification. Establish a single tracking-notification owner. |
| `src/utils/permissionUtils.ts` | iOS location helper currently returns true; Android requests only fine location. Implement accurate platform permission states. |
| `src/utils/storage.ts` | MMKV encryption configured from environment; do not reuse the global queue for native sensitive tracking data. |
| Android configuration | Package `com.yet.zyncride`; min SDK 24, compile/target 36; foreground-location permissions and background-actions service already declared. |
| iOS configuration | Info.plist has location usage text but background modes only remote-notification; Podfile contains Codegen/prebuilt workarounds to regression-test. |

Storybook MCP was queried but only permits /tmp; Stitch MCP was unavailable. Local atoms/hooks/utilities were inspected. No visual redesign is required.

## Architecture decisions

1. Build a Codegen Turbo Native Module for installed RN 0.84.1, using version-matched documentation. A framework upgrade is separate work.
2. Add `src/specs/NativeLiveLocation.ts`: typed async commands, typed Codegen event emitters, and explicit DTOs. No new legacy bridge module or handwritten JSI layer.
3. Kotlin implements the generated Android spec; Swift owns iOS Core Location, with a thin Objective-C++ adapter implementing the generated spec.
4. The native session owns location subscription, filtering, uploads, queue, and stop semantics independently of React mounts and JS timers.
5. JS commands enter through `src/serviceManager/LiveLocationService.ts`; `useGlobalLiveLocation` subscribes and reconciles UI state without starting a second collector.
6. Reuse central endpoint/environment configuration. Proposed native HTTP adapters use OkHttp/URLSession because Axios cannot execute while JS is suspended.
7. This is an explicit architectural exception to the API skill's Axios-only rule for background transport. Document that narrow exception during implementation; ordinary JS API calls stay in domain services/Axios.
8. Prefer HTTPS uploads to another native STOMP/WebSocket connection. Keep the existing chat connection independent.
9. Fabric concerns UI rendering; this feature needs a TurboModule, not a new Fabric component.
10. Use a serial native session coordinator; location callbacks, network results, and JS commands must not race. Never block JS or the UI thread with I/O.

Proposed contract: `startTracking(config)`, `stopTracking(reason)`, `getTrackingState()`, `updateSession(config)`, plus `onLocationUpdate` and `onTrackingStateChanged`.
Start resolves with actual native state, not just command receipt. Repeat start for the same session is idempotent; switching ride first stops/purges the old session.
DTOs include session ID, ride ID, timestamp, coordinates, accuracy, optional speed/bearing, state and reason codes. Validate all options natively.
Use app enums mapped to Codegen-supported scalar DTO fields, with native enums and contract tests; avoid unsupported TS constructs in specs.
Events update UI only. `getTrackingState()` recovers current truth after reconnect; an event subscriber is not required for uploads.

## Phase 1 — verify backend and authentication contracts

- Verify actual ride start/end triggers and authoritative statuses; do not interpret rideFound, a scheduled time, or a successful toggle as a start event.
- Confirm driver/passenger authorization, endpoint payloads, response/error schema, timestamp units, ordering, and deduplication support.
- Confirm `/ride/live-status` semantics before sending null coordinates: it may currently combine sharing updates and status retrieval.
- Prefer a server-issued, ride-scoped tracking credential with limited permissions, expiry and revocation, stored securely natively. Its existence is not assumed.
- Define renewal without JS, server cancellation propagation, and a bounded session lease. Remote cancellation while offline cannot be known instantly; lease expiry must stop collection.
- If ride-scoped credentials cannot be added, design a single native auth coordinator shared by JS and background uploads, including secure token rotation. Never run competing refresh owners.
- Treat this phase as a production integration gate. Build/test the platform engine with mocked transport while contracts are resolved.
- Keep user credentials in Keychain/Android Keystore-backed storage; verify locked-device accessibility, including before first unlock. Never embed tokens or log coordinates.

## Phase 2 — shared lifecycle and policy

- Define lifecycle states: STOPPED, STARTING, TRACKING, STOPPING, BLOCKED; model connectivity and motion separately to avoid ambiguous combined states.
- Start only after validated ride eligibility, foreground user action, consent, location services and permissions. A persisted preference is not running state.
- Include a session generation on async operations. Discard callbacks and upload completions from invalidated generations.
- Stop first invalidates the session, unregisters location callbacks, cancels pending requests/retries, deletes queued data/credentials and removes the service notification.
- A request already received by the server cannot be unsent; server-side ride/session validation must reject late writes.
- On app foreground/relaunch, reconcile native state with backend state before allowing restart. Navigation away must not stop an active ride.
- A process death is different from screen lock; default to no blind restart. Record interrupted tracking and require eligible foreground reconciliation to resume.
- Use monotonic elapsed time for throttling and UTC capture timestamps for upload; validate timestamp age and coordinate ranges. Zero latitude/longitude can be valid.
- Filter stale fixes, implausible jumps and accuracy-aware jitter using meter-based distance. Do not label simple filters as fraud prevention.

## Phase 3 — Android engine

- Add generated-spec module/package registration in MainApplication; separate service, location provider, session coordinator, uploader, queue and notification files, each under 200 lines.
- Use FusedLocationProviderClient with LocationRequest.Builder, priority, min update interval and min update distance. Pin compatible dependencies after inspecting the resolved Gradle graph.
- Start the location foreground service while an Activity is visible, after coarse/fine runtime permission handling; immediately meet the foreground notification deadline.
- Keep FOREGROUND_SERVICE and FOREGROUND_SERVICE_LOCATION plus service type location; do not request ACCESS_BACKGROUND_LOCATION by default for this foreground-started flow.
- Handle approximate-only access, location disabled, service-start exceptions and revoked permission as explicit states; do not mark tracking active prematurely.
- Notification denial is not itself a location permission denial. Follow platform foreground-service requirements and accurately explain visibility to the user.
- Use one quiet ongoing notification with valid navigation and native Stop sharing action. Stop must work without JS; reconcile sharing state on next UI connection.
- Use structured cancellation and off-main-thread transport. Avoid continuous wake locks, exact alarms, and WorkManager for 5–10 second tracking.
- Default service restart policy to START_NOT_STICKY for v1. Test task dismissal separately from Android force-stop; do not add boot auto-start.

## Phase 4 — iOS engine

- Implement CLLocationManager on its appropriate main-thread/run-loop context; retain it in the native session independently of the TurboModule event subscription.
- Enable location background mode, allowsBackgroundLocationUpdates and the background indicator; use automotiveNavigation activity type.
- Start with When In Use authorization for a foreground-started ride. Add Always only if a separately verified product requirement demands it.
- Handle not-determined, denied/restricted, reduced accuracy and disabled location services explicitly; add accurate localized purpose text.
- Start with desiredAccuracy around nearest-ten-meters and distanceFilter 15 m, then tune from physical-device results. Do not default to best-for-navigation accuracy.
- For continuous active rides, start with automatic pausing disabled: in-use authorization plus automatic pause can prevent background resumption. Measure the tradeoff.
- Let Core Location provide background execution opportunities; complete small native uploads within available time. URLSession/background tasks are not perpetual execution guarantees.
- No fake audio session, recurring JS timer, or silent-push dependence. No automatic recovery promise after force-quit or reboot.
- Verify actual app deployment target and RN minimum support before adopting newer Core Location APIs; do not infer it from the Podfile's 15.1 floor workaround.

## Phase 5 — battery, upload and queue policy

Initial tunable values, not guaranteed OS delivery intervals or measured battery claims:

| Condition | Initial policy |
| --- | --- |
| Android moving | Target 10 s callbacks, minimum interval 5 s, minimum displacement 15 m; high accuracy only for active ride requirements. |
| iOS moving | Event-driven Core Location, 15 m filter; no synthetic 10 s location timer. |
| Network sends | At most one location request per 10 s; send the first acceptable fix promptly, coalesce newer fixes. |
| Stationary | Suppress duplicate location uploads. Keep reliable movement detection; Android balanced-power/longer intervals are a measured follow-up, not an automatic GPS-off claim. |
| Fix quality | Initial maximum age 30 s and accuracy target 50 m; report degraded/stale state when no acceptable fix exists. |
| Offline | Queue up to 100 points or 15 min, whichever bound expires first; drop oldest, scope by user + ride + session. |
| Retry | Exponential backoff with jitter, initially 5 s up to 120 s; obey Retry-After, stop on terminal auth/ride errors. |

- Prefer one small encrypted native queue per session; protect its encryption key with platform secure storage. Store preferences only in MMKV.
- Queue entries have capture time and sequence/idempotency identity. Remove only acknowledged entries; server history must not overwrite latest position with older backlog.
- Upload batches only if verified backend semantics support them. Otherwise send latest-only until a history contract is available.
- Retries use platform-permitted execution; iOS retry times are not guaranteed background wakeups. Bound concurrency to one upload per session.
- Delete queue on stop/account switch. Never import the existing unscoped backlog into a new session.
- Separate heartbeat/lease renewal from new position: an old position is never reported with a fresh capture timestamp. Choose cadence with backend in Phase 1.
- Measure energy before enabling adaptive sampling; distance filters and automotive mode are hints, not hardware power guarantees.

## Phase 6 — integrate and retire competing behavior

- Replace live-status-triggered getCurrentPosition with cached native fix/state where appropriate; stop parallel hook polling from collecting location.
- Keep foreground ETA/ride-status refresh independently rate-limited and single-flight; preserve passenger viewing and non-ride map lookup.
- Wire start to actual validated start flow; wire stop through cancellation, completion, sharing toggle, AuthService logout, token-expiry logout and resetAllStores.
- Refactor touched oversized store/helper/service files into focused typed files; remove touched any types and raw status comparisons.
- Reuse LiveLocationToggle, GlobalNotification, ConfirmationModal and existing atoms. Show actual tracking, waiting-for-fix, stale/offline and blocked state distinctly.
- Add English/Hindi copy through existing translation hooks; pass translated notification text to native and use localized platform permission resources where required.
- Remove the unused background-actions tracker/service/dependency only after whole-repository reference audit; retain community geolocation for other map features if still needed.
- Update package.json/yarn.lock and native lockfiles together if dependencies change. Never modify generated Codegen output manually.
- Ship with a native capability/version check for OTA compatibility; older binaries must not show tracking as active when the module is absent. Requires a store binary release.

## Phase 7 — verification and release criteria

- Run Codegen and build Android and iOS early, then test release builds; check existing Podfile source-rewriting workarounds do not drop new generated sources.
- Jest: eligibility, denied permissions, duplicate starts, ride/account switch, stale async results, stop during upload, auth expiry, lease expiry, and UI reconciliation.
- Native unit/integration tests: callback cancellation, notification Stop without JS, queue bounds/acknowledgments, jitter filters, retry cancellation and secure session cleanup.
- Storybook/Vitest: toggle reflects native outcome, blocked/degraded messages and translation. These tests do not validate background behavior.
- Physical devices: screen locked for 30–60 min, stationary-to-moving transition, tunnels, offline/reconnect, low power, revoked permission, approximate location, process death and explicit force-stop/quit.
- Include supported minimum/latest OS versions and multiple Android OEMs; simulate backend cancellation, token rotation and late/out-of-order writes.
- Compare tracking off/on over matched routes and stationary periods: battery percentage/hour, CPU/wake time, network requests/bytes, location age and movement-resume delay.
- Record measurements with device/OS/conditions; agree battery and freshness release budgets from evidence, not a universal promised percentage.
- Acceptance: one collector/uploader; no accepted cross-ride or post-stop writes; bounded encrypted queue; truthful UI; working screen-lock tracking; documented force-stop limits.
- Run yarn typecheck, yarn lint, relevant Jest and npx vitest run, native tests/builds and changed-file line-count checks. Record pre-existing failures separately.
- Recheck current Play/App Store location disclosures and service declarations at release; provide ride-specific purpose descriptions and review instructions.
- Keep a capability/feature gate for staged rollout and a stop path on disable; update this document with verified contracts, final values and device evidence.

## Reference guidance

- [RN 0.84 Turbo Native Modules](https://reactnative.dev/docs/0.84/turbo-native-modules-introduction)
- [RN 0.84 Swift adapter](https://reactnative.dev/docs/0.84/the-new-architecture/turbo-modules-with-swift)
- [RN 0.84 architecture release notes](https://reactnative.dev/blog/2026/02/11/react-native-0.84)
- [Android location foreground services](https://developer.android.com/develop/background-work/services/fgs/service-types)
- [Android battery guidance](https://developer.android.com/develop/sensors-and-location/location/battery)
- [Google LocationRequest](https://developers.google.com/android/reference/com/google/android/gms/location/LocationRequest)
- [Apple background location](https://developer.apple.com/documentation/corelocation/handling-location-updates-in-the-background)
- [Apple When In Use authorization](https://developer.apple.com/documentation/CoreLocation/CLLocationManager/requestWhenInUseAuthorization%28%29)
- [Apple automatic pause caveat](https://developer.apple.com/documentation/corelocation/cllocationmanager/pauseslocationupdatesautomatically)

Next implementation step: verify the staging backend contract and shared authentication ownership, then run the physical-device release checks below.

## Android implementation handoff — 2026-09-20

- Implemented generated-spec Kotlin TurboModule, typed state events, foreground-only permission-gated startup, and native notification Stop action.
- Native ride validation precedes location collection; checks every 30 seconds with a 120-second local validation lease. A missing/invalid ride or terminal HTTP response stops tracking.
- Native uploader is the only Android coordinate uploader. Foreground ride-status calls use null coordinates, preserving viewing/ETA polling separately.
- Collection requests 10-second/15-meter updates; validates accuracy, age and implausible jumps. Uploads are single-flight, coalesced and rate-limited.
- Retry buffer deliberately holds one latest fix in memory (30-second freshness), not historical replay or disk persistence. New fixes supersede failed older fixes.
- The unreferenced JS background loop and global MMKV location queue were removed. The installed background-actions dependency/Pod entry remains for a separate dependency cleanup.
- Cancellation responses stop the matching ride immediately; auth/store reset stops tracking. Native states reconcile on foreground; persisted toggles cannot restart collection.
- English/Hindi native notification resources and JS failure messages added. iOS now has its own native engine; see [iOS handoff](ios-background-location.md).
- Credentials are read from existing Keychain by JS and held in native memory only. JS token refresh updates the running session. Native 401/403 stops with a visible state; no competing native refresh loop was introduced.
- IMPORTANT: uninterrupted tracking across background token expiry still requires the Phase 1 ride-scoped credential/shared-refresh contract. This is a remaining release gate, not a completed capability.
- IMPORTANT: verify live-status null-coordinate semantics, authoritative status/role fields, and server rejection of late writes against staging. Requests already accepted remotely cannot be cancelled retroactively.
- Android debug Kotlin compilation and four JVM buffer tests passed. Twenty focused JS tests passed. Full Jest: 58 tests passed; App.test fails loading the existing navigation dependency.
- TypeScript: 23 errors, identical to clean HEAD baseline; no added errors. Changed TS files lint clean; whole-repository lint is blocked by existing typed-rule configuration on index.js.
- Physical-device screen-lock, permission-revocation, OEM/process lifecycle, release-build and battery profiling are not yet performed. Do not describe this as production-validated until those checks and backend gates pass.

### Tracking feedback follow-up

- Both active-ride screens show connecting, live, delayed, connection interrupted, paused, and actionable auth/permission failure states in English/Hindi.
- Live means the most recently acknowledged location fix is no more than 30 seconds old; receiving GPS alone never marks sharing live. Foreground UI ages the label every five seconds without extra network requests.
- Pending startup is visible and cancellable; duplicate starts are ignored and late completion cannot re-enable sharing.
- Native acknowledged-fix time crosses the generated TurboModule bridge; iOS now uses native acknowledgement through the same bridge.
- Updated Android compilation/four JVM tests, iOS simulator build/12 Swift tests, and 31 focused JS tests pass. TypeScript still matches the 23 pre-existing errors. Changed source files lint clean.
- Storybook browser checks are blocked before test execution by existing Firebase aliases and React Native Web CommonJS loading. Physical-device measurements remain pending; only an emulator is attached.
- Awaiting backend repository/staging documentation for null-coordinate handling, terminal ride validation, token rotation, and late-write rejection. No new independent refresh-token consumer was added.
