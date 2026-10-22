import CoreLocation
import Foundation

// Main-queue owned; one request and one fresh fix in memory, with no disk replay.
final class TrackingTransport {
    private let config: TrackingConfig
    private let http: TrackingHTTPClient
    private let now: () -> TimeInterval
    private let stop: (TrackingReason) -> Void
    private let verified: () -> Void
    private let publish: (TrackingReason, CLLocation?) -> Void
    private var active = true
    private var busy = false
    private var pending: CLLocation?
    private var lastSent: CLLocation?
    private var verifiedAt: TimeInterval?
    private var lastCheck: TimeInterval?
    private var lastUpload: TimeInterval?
    private var retryAt: TimeInterval = 0
    private var backoff: TimeInterval = 5
    private let startedAt: TimeInterval

    init(config: TrackingConfig, http: TrackingHTTPClient = TrackingHTTP(),
         now: @escaping () -> TimeInterval = TrackingClock.now,
         stop: @escaping (TrackingReason) -> Void, verified: @escaping () -> Void,
         publish: @escaping (TrackingReason, CLLocation?) -> Void) {
        self.config = config; self.http = http; self.now = now
        self.stop = stop; self.verified = verified; self.publish = publish
        startedAt = now()
    }

    func offer(_ fix: CLLocation) { pending = fix; tick() }

    func tick() {
        guard active else { return }
        let time = now()
        guard time - (verifiedAt ?? startedAt) < TrackingPolicy.lease else { stop(.expired); return }
        guard !busy, time >= retryAt else { return }
        if lastCheck == nil || time - lastCheck! >= TrackingPolicy.statusInterval { validate() }
        else if verifiedAt != nil && (lastUpload == nil || time - lastUpload! >= TrackingPolicy.uploadInterval) { upload() }
    }

    private func validate() {
        lastCheck = now()
        request(config.statusURL, body: ["lat": NSNull(), "lng": NSNull(), "liveLocationEnabled": true]) { [weak self] json in
            guard let self else { return }
            guard TrackingPolicy.eligible(json, rideID: config.rideID) else { stop(.ineligible); return }
            verifiedAt = now()
            verified()
        }
    }

    private func upload() {
        guard let fix = pending else { return }
        pending = nil
        guard TrackingPolicy.acceptable(fix, previous: nil),
              lastSent == nil || fix.distance(from: lastSent!) >= 15 else { return }
        lastUpload = now()
        request(config.uploadURL, body: ["lat": fix.coordinate.latitude, "lon": fix.coordinate.longitude],
                failure: { [weak self] in
                    guard let self, pending == nil else { return }
                    pending = fix
                }) { [weak self] _ in
            guard let self else { return }
            lastSent = fix
            publish(.none, fix)
        }
    }

    private func request(_ url: URL, body: [String: Any], failure: @escaping () -> Void = {},
                         success: @escaping ([String: Any]?) -> Void) {
        busy = true
        let token = config.token
        http.post(url, token: token, body: body) { [weak self] code, json, retryAfter in
            guard let self, active else { return }
            busy = false
            // A callback arriving after suspension cannot renew an already expired lease.
            guard now() - (verifiedAt ?? startedAt) < TrackingPolicy.lease else { stop(.expired); return }
            switch code {
            case 200...299: backoff = 5; retryAt = 0; success(json)
            case 401 where token != config.token: failure(); lastCheck = nil
            case 401, 403: stop(.auth)
            case 400...499 where code != 429: stop(.ineligible)
            default:
                failure()
                retryAt = now() + max(retryAfter, backoff + Double.random(in: 0..<1))
                backoff = min(backoff * 2, 120)
                publish(.offline, nil)
            }
        }
    }

    func close() {
        active = false; pending = nil; lastSent = nil
        http.cancel()
    }
}
