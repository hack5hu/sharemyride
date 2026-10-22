import CoreLocation
import XCTest
@testable import RideTrackingCore

final class TrackingPolicyTests: XCTestCase {
    private let now = Date()
    private func fix(_ lat: Double = 12, age: TimeInterval = 0, accuracy: Double = 5) -> CLLocation {
        CLLocation(coordinate: CLLocationCoordinate2D(latitude: lat, longitude: 77), altitude: 0,
                   horizontalAccuracy: accuracy, verticalAccuracy: 0, timestamp: now.addingTimeInterval(-age))
    }

    func testRejectsStaleInaccurateAndImpossibleFixes() {
        XCTAssertTrue(TrackingPolicy.acceptable(fix(), previous: nil, now: now))
        for invalid in [fix(age: 31), fix(age: -1), fix(accuracy: -1), fix(accuracy: 51), fix(91)] {
            XCTAssertFalse(TrackingPolicy.acceptable(invalid, previous: nil, now: now))
        }
        XCTAssertFalse(TrackingPolicy.acceptable(fix(15), previous: fix(age: 1), now: now))
        XCTAssertFalse(TrackingPolicy.acceptable(fix(), previous: fix(), now: now))
    }

    func testRideValidationFailsClosed() {
        let valid: [String: Any] = ["rideFound": true, "role": "DRIVER",
                                   "ride": ["rideId": 123, "rideStatus": "STARTED"]]
        XCTAssertTrue(TrackingPolicy.eligible(valid, rideID: "123"))
        XCTAssertTrue(TrackingPolicy.eligible(["data": valid], rideID: "123"))
        var scheduled = valid; scheduled["ride"] = ["rideId": 123, "rideStatus": "SCHEDULED"]
        XCTAssertTrue(TrackingPolicy.eligible(scheduled, rideID: "123"))
        XCTAssertFalse(TrackingPolicy.eligible(valid, rideID: "124"))
        XCTAssertFalse(TrackingPolicy.eligible(nil, rideID: "123"))
        var passenger = valid; passenger["role"] = "PASSENGER"
        XCTAssertTrue(TrackingPolicy.eligible(passenger, rideID: "123"))
        var missingRole = valid; missingRole.removeValue(forKey: "role")
        XCTAssertFalse(TrackingPolicy.eligible(missingRole, rideID: "123"))
        var completed = valid; completed["ride"] = ["rideId": 123, "rideStatus": "COMPLETED"]
        XCTAssertFalse(TrackingPolicy.eligible(completed, rideID: "123"))
    }

    func testConfigRejectsInsecureOrDifferentOrigins() {
        let valid = ["rideId": "1", "sessionId": "s", "authToken": "test",
                     "uploadUrl": "https://example.test/upload", "statusUrl": "https://example.test/status"]
        XCTAssertNotNil(TrackingConfig(valid))
        for value in ["http://example.test/status", "https://other.test/status", "https://example.test:444/status"] {
            var invalid = valid; invalid["statusUrl"] = value
            XCTAssertNil(TrackingConfig(invalid))
        }
    }

    func testRetryAfterIsBounded() {
        XCTAssertEqual(TrackingHTTP.retryDelay("600"), 120)
        XCTAssertEqual(TrackingHTTP.retryDelay("-1"), 0)
        XCTAssertEqual(TrackingHTTP.retryDelay("bad"), 0)
        XCTAssertEqual(TrackingHTTP.retryDelay("20"), 20)
    }
}
