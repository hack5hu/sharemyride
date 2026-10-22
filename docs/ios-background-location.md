# iOS active-ride location — implementation handoff

## Implemented

- Swift Core Location engine with a generated RN 0.84 TurboModule spec and Objective-C++ adapter. Registered in Codegen's iOS module provider and the Xcode app target.
- Uses the same JS service, state events, ride eligibility, cancellation, auth reset, and sharing feedback as Android. Removed the competing iOS foreground JS collector/uploader.
- Explicit foreground startup only. Requests When In Use permission, requires precise location, and enables the background location mode with the visible system indicator. No Always request, relaunch, or boot tracking.
- English/Hindi system permission descriptions explain active-ride sharing and screen-lock use. System prompts follow iOS language settings, independently of the app's language selector.
- Automotive navigation activity, best accuracy, 15 m distance filter. Automatic pausing is disabled during an active session because When In Use sessions may not resume after a pause. The distance filter is not a guarantee that GPS powers off while stationary.
- Validates the driver/ride status before collecting. Checks status every 30 seconds while allowed to execute; the local validation lease expires after 120 seconds. A continuous monotonic clock includes device sleep. Delayed callbacks cannot renew an expired lease.
- Filters invalid coordinates, accuracy worse than 50 m, fixes older than 30 seconds, and implausible jumps. Uploads at most every 10 seconds and suppresses movements below 15 m.
- One native request in flight and one latest fix in memory. Exponential retry with jitter and bounded Retry-After handling. No disk queue, credentials, or location history is persisted by this module.
- Ephemeral URLSession with HTTPS/same-origin configuration, no redirects/cookies/cache, short timeouts, and a bounded iOS background assertion for each request.
- Stop, ride cancellation/ineligibility, permission loss, authentication failure, expiry, and module invalidation stop collection, clear in-memory data, and cancel requests. Late callbacks cannot resume a closed transport. Stop requests with an old session ID cannot stop a newer session.
- Only successful uploads update the shared-location timestamp. Foreground status polling sends null coordinates on both platforms.

## Verification

- Native policy/transport tests: `swift test --package-path ios/LiveLocation --scratch-path /tmp/zyncride-ios-location-tests`.
- Tests cover ride validation, HTTPS origins, bad/stale fixes, latest-only retries, single-flight requests, token rotation, acknowledgement, expiry, and late callbacks after stop.
- Full app simulator build succeeds and verifies the generated bridge, localized resources, and Swift/Objective-C++ integration.
- Twelve native tests and 31 focused JS tests pass. JS coverage includes native iOS startup, cancellation during credential loading, token synchronization, session-specific stop, and coordinate-free polling.
- Physical iPhone testing remains required: 30–60 minute locked-screen drive, stationary/resume, poor signal, airplane mode/reconnection, approximate/denied permission, device location services disabled, Low Power Mode, ride cancellation, logout, token expiry, app termination, and force-quit.
- Measure battery/hour, network traffic, location freshness and movement-resume delay on supported iOS versions; simulator results cannot establish battery performance.

## Remaining release gates

- Verify staging API payloads, null-coordinate semantics, authoritative ride status/role, and rejection of late or cross-ride writes. Cancelling a local request cannot undo a write already accepted by the server.
- Background access-token renewal still requires one shared refresh owner or ride-scoped credentials. Native memory accepts app-refreshed access tokens, but 401/403 otherwise stops sharing. There is no second refresh-token consumer.
- iOS may suspend or terminate the process. Timers are opportunities to check state, not guaranteed wakeups. A suspended process checks its lease before processing the next location or network callback; it cannot promise a wall-clock stop callback while suspended.
- Force-quit/process death ends this session; the user must reopen the app and explicitly enable sharing. No automatic restoration from stored state.
- Update App Store location disclosures and review notes, then complete release-build testing before rollout. No zero-battery-drain or production reliability claim is justified yet.

## References

- [React Native 0.84 Swift adapter](https://reactnative.dev/docs/0.84/the-new-architecture/turbo-modules-with-swift)
- [Apple background location configuration](https://developer.apple.com/documentation/corelocation/cllocationmanager/allowsbackgroundlocationupdates)
- [Apple When In Use authorization](https://developer.apple.com/documentation/corelocation/cllocationmanager/requestwheninuseauthorization())
- [Apple automatic pause behavior](https://developer.apple.com/documentation/corelocation/cllocationmanager/pauseslocationupdatesautomatically)
