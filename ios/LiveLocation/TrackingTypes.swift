import Darwin
import Foundation

enum TrackingReason: String {
    case none = "NONE", user = "USER", ineligible = "INELIGIBLE", auth = "AUTH"
    case permission = "PERMISSION", locationDisabled = "LOCATION_DISABLED"
    case unavailable = "UNAVAILABLE", expired = "EXPIRED"
    case offline = "OFFLINE", waiting = "WAITING"
}

final class TrackingConfig {
    let rideID: String
    let sessionID: String
    var token: String
    let uploadURL: URL
    let statusURL: URL

    init?(_ options: [String: String]) {
        guard let ride = options["rideId"], !ride.isEmpty,
              let session = options["sessionId"], !session.isEmpty,
              let token = options["authToken"], !token.isEmpty,
              let upload = URL(string: options["uploadUrl"] ?? ""),
              let status = URL(string: options["statusUrl"] ?? ""),
              upload.scheme == "https", status.scheme == "https",
              let host = upload.host, !host.isEmpty, host == status.host,
              upload.port == status.port, upload.user == nil, status.user == nil,
              upload.password == nil, status.password == nil else { return nil }
        rideID = ride; sessionID = session; self.token = token
        uploadURL = upload; statusURL = status
    }
}

// mach_continuous_time includes sleep and is independent of wall-clock adjustments.
enum TrackingClock {
    private static let origin = mach_continuous_time()
    private static let scale: Double = {
        var info = mach_timebase_info_data_t()
        mach_timebase_info(&info)
        return Double(info.numer) / Double(info.denom) / 1e9
    }()
    static func now() -> TimeInterval {
        let start = origin
        return Double(mach_continuous_time() - start) * scale
    }
}
