import CoreLocation
import Foundation
import UIKit

// All entry points, Core Location callbacks and HTTP completions run on the main queue.
@objc(LiveLocationManager) final class LiveLocationManager: NSObject {
    let location = CLLocationManager()
    var config: TrackingConfig?
    var transport: TrackingTransport?
    var running = false
    var reason = TrackingReason.none
    var lastLocation: CLLocation?
    var lastUploadedTimestamp: Double = 0
    private var completion: ((NSDictionary) -> Void)?
    private var timer: Timer?
    private var observer: NSObjectProtocol?
    private var startedAt: TimeInterval = 0
    private var invalidated = false
    @objc var onState: ((NSDictionary) -> Void)?

    override init() {
        super.init()
        location.delegate = self
        location.activityType = .automotiveNavigation
        location.desiredAccuracy = kCLLocationAccuracyBest
        location.distanceFilter = 15
        // With When In Use permission, an automatic pause can prevent background resumption.
        location.pausesLocationUpdatesAutomatically = false
        location.showsBackgroundLocationIndicator = true
        observer = NotificationCenter.default.addObserver(forName: UIApplication.didBecomeActiveNotification,
            object: nil, queue: .main) { [weak self] _ in self?.check() }
    }

    @objc func snapshot() -> NSDictionary {
        if reason == .locationDisabled && CLLocationManager.locationServicesEnabled() { reason = .user }
        return ["isTracking": running, "rideId": config?.rideID ?? "", "sessionId": config?.sessionID ?? "",
                "reason": reason.rawValue,
                "lastTimestamp": (lastLocation?.timestamp.timeIntervalSince1970 ?? 0) * 1000,
                "lastUploadedTimestamp": lastUploadedTimestamp]
    }

    @objc func start(_ options: [String: String], completion: @escaping (NSDictionary) -> Void) {
        stop(.user)
        guard !invalidated, UIApplication.shared.applicationState == .active,
              let config = TrackingConfig(options),
              (Bundle.main.object(forInfoDictionaryKey: "UIBackgroundModes") as? [String])?.contains("location") == true
        else { reason = .unavailable; completion(snapshot()); return }
        self.config = config
        self.completion = completion
        startedAt = TrackingClock.now()
        reason = .waiting
        timer = Timer.scheduledTimer(withTimeInterval: 5, repeats: true) { [weak self] _ in self?.check() }
        if location.authorizationStatus == .notDetermined { location.requestWhenInUseAuthorization() }
        check()
    }

    func check() {
        guard config != nil else { return }
        guard CLLocationManager.locationServicesEnabled() else { stop(.locationDisabled); return }
        guard location.authorizationStatus != .denied && location.authorizationStatus != .restricted else {
            stop(.permission); return
        }
        if transport == nil && TrackingClock.now() - startedAt >= TrackingPolicy.lease { stop(.expired); return }
        guard location.authorizationStatus != .notDetermined else { return }
        guard location.accuracyAuthorization == .fullAccuracy else { stop(.permission); return }
        if transport == nil {
            guard UIApplication.shared.applicationState == .active, let config else { return }
            transport = TrackingTransport(config: config, stop: { [weak self] in self?.stop($0) },
                verified: { [weak self] in self?.beginCollection() },
                publish: { [weak self] reason, fix in
                    guard let self else { return }
                    if let fix { lastUploadedTimestamp = fix.timestamp.timeIntervalSince1970 * 1000 }
                    publish(reason)
                })
        }
        transport?.tick()
    }

    private func beginCollection() {
        guard !running else { return }
        guard UIApplication.shared.applicationState == .active else { stop(.unavailable); return }
        guard location.authorizationStatus == .authorizedAlways || location.authorizationStatus == .authorizedWhenInUse,
              location.accuracyAuthorization == .fullAccuracy else { stop(.permission); return }
        location.allowsBackgroundLocationUpdates = true
        location.startUpdatingLocation()
        running = true
        publish(.waiting)
        let resolve = completion; completion = nil
        resolve?(snapshot())
    }

    func publish(_ reason: TrackingReason) { self.reason = reason; onState?(snapshot()) }

    func stop(_ reason: TrackingReason) {
        location.stopUpdatingLocation()
        location.allowsBackgroundLocationUpdates = false
        transport?.close(); transport = nil
        timer?.invalidate(); timer = nil
        running = false; lastLocation = nil; lastUploadedTimestamp = 0
        self.reason = reason
        let state = snapshot()
        config?.token = ""; config = nil
        let resolve = completion; completion = nil
        resolve?(state)
        onState?(state)
    }

    @objc func stopTracking(_ reason: String, sessionID: String) -> NSDictionary {
        if sessionID.isEmpty || config?.sessionID == sessionID { stop(TrackingReason(rawValue: reason) ?? .user) }
        return snapshot()
    }

    @objc func updateToken(_ token: String) {
        guard !token.isEmpty else { stop(.auth); return }
        config?.token = token
    }

    @objc func invalidate() {
        invalidated = true
        onState = nil
        stop(.unavailable)
        if let observer { NotificationCenter.default.removeObserver(observer) }
        observer = nil
    }
}
