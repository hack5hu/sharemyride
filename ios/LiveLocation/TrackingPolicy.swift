import CoreLocation
import Foundation

enum TrackingPolicy {
    static let lease: TimeInterval = 120
    static let uploadInterval: TimeInterval = 10
    static let statusInterval: TimeInterval = 30
    static let maxFixAge: TimeInterval = 30
    private enum TerminalRideStatus: String { case completed = "COMPLETED", cancelled = "CANCELLED", rejected = "REJECTED" }
    private enum ParticipantRole: String { case driver = "DRIVER", passenger = "PASSENGER" }

    static func acceptable(_ fix: CLLocation, previous: CLLocation?, now: Date = Date()) -> Bool {
        let age = now.timeIntervalSince(fix.timestamp)
        guard age >= 0, age <= maxFixAge,
              fix.horizontalAccuracy.isFinite, (0...50).contains(fix.horizontalAccuracy),
              CLLocationCoordinate2DIsValid(fix.coordinate) else { return false }
        guard let previous else { return true }
        let seconds = fix.timestamp.timeIntervalSince(previous.timestamp)
        return seconds > 0 && fix.distance(from: previous) <=
            80 * seconds + fix.horizontalAccuracy + previous.horizontalAccuracy
    }

    static func eligible(_ payload: [String: Any]?, rideID: String) -> Bool {
        guard let payload else { return false }
        let data = payload["data"] as? [String: Any] ?? payload
        guard data["rideFound"] as? Bool == true, let ride = data["ride"] as? [String: Any] else { return false }
        let status = ((ride["rideStatus"] as? String) ?? (ride["status"] as? String) ?? "").uppercased()
        let role = ((data["role"] as? String) ?? (ride["role"] as? String) ?? "").uppercased()
        let id = ride["rideId"] as? String ?? (ride["rideId"] as? NSNumber)?.stringValue
            ?? ride["id"] as? String ?? (ride["id"] as? NSNumber)?.stringValue
        return id == rideID && ParticipantRole(rawValue: role) != nil && !status.isEmpty &&
            TerminalRideStatus(rawValue: status) == nil
    }
}
