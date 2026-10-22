import CoreLocation
import XCTest
@testable import RideTrackingCore

private final class MockHTTP: TrackingHTTPClient {
    var calls: [(URL, [String: Any])] = []
    var reply: ((Int, [String: Any]?, TimeInterval) -> Void)?
    var cancelled = false
    func post(_ url: URL, token: String, body: [String: Any],
              completion: @escaping (Int, [String: Any]?, TimeInterval) -> Void) {
        calls.append((url, body)); reply = completion
    }
    func cancel() { cancelled = true }
}

final class TrackingTransportTests: XCTestCase {
    private var time: TimeInterval = 0
    private var http: MockHTTP!
    private var config: TrackingConfig!
    private var transport: TrackingTransport!
    private var stopped: TrackingReason?
    private var published: TrackingReason?
    private var uploaded: CLLocation?
    private var verifications = 0
    private let valid: [String: Any] = ["rideFound": true, "role": "DRIVER",
                                       "ride": ["rideId": "1", "rideStatus": "ACTIVE"]]

    override func setUp() {
        super.setUp()
        time = 0; stopped = nil; published = nil; uploaded = nil; verifications = 0
        http = MockHTTP()
        config = TrackingConfig(["rideId": "1", "sessionId": "s", "authToken": "test",
                                 "uploadUrl": "https://example.test/upload", "statusUrl": "https://example.test/status"])
        transport = TrackingTransport(config: config, http: http, now: { self.time },
            stop: { self.stopped = $0; self.transport.close() }, verified: { self.verifications += 1 },
            publish: { self.published = $0; self.uploaded = $1 })
    }
    override func tearDown() { transport.close(); transport = nil; super.tearDown() }
    private func fix(_ latitude: Double = 12, age: TimeInterval = 0) -> CLLocation {
        CLLocation(coordinate: CLLocationCoordinate2D(latitude: latitude, longitude: 77), altitude: 0,
                   horizontalAccuracy: 5, verticalAccuracy: 0, timestamp: Date().addingTimeInterval(-age))
    }
    private func validate() { transport.tick(); http.reply?(200, valid, 0) }

    func testValidatesBeforeUploadingAndAcknowledgesOnlyOnSuccess() {
        transport.offer(fix())
        XCTAssertEqual(http.calls.count, 1)
        XCTAssertTrue(http.calls[0].1["lat"] is NSNull)
        XCTAssertNil(uploaded)
        http.reply?(200, valid, 0)
        transport.tick()
        XCTAssertEqual(http.calls[1].0.path, "/upload")
        XCTAssertNil(uploaded)
        http.reply?(204, nil, 0)
        XCTAssertNotNil(uploaded)
        XCTAssertEqual(published, TrackingReason.none)
    }

    func testSingleFlightAndLatestOnlyRetry() {
        validate()
        transport.offer(fix())
        transport.offer(fix(12.01))
        transport.offer(fix(12.02))
        XCTAssertEqual(http.calls.count, 2)
        http.reply?(503, nil, 0)
        XCTAssertEqual(published, .offline)
        time = 10; transport.tick()
        XCTAssertEqual(http.calls.last?.1["lat"] as? Double, 12.02)
    }

    func testExpiredLeaseCannotBeRenewedByLateCallback() {
        transport.tick()
        time = 121
        http.reply?(200, valid, 0)
        XCTAssertEqual(stopped, .expired)
        XCTAssertEqual(verifications, 0)
    }

    func testAuthenticationRejectionStopsWithoutRetry() {
        transport.tick(); http.reply?(401, nil, 0)
        XCTAssertEqual(stopped, .auth)
        XCTAssertTrue(http.cancelled)
        time = 15; transport.tick()
        XCTAssertEqual(http.calls.count, 1)
    }

    func testRetryAfterPreventsAnEarlyRequest() {
        transport.tick(); http.reply?(429, nil, 60)
        time = 59; transport.tick()
        XCTAssertEqual(http.calls.count, 1)
        time = 60; transport.tick()
        XCTAssertEqual(http.calls.count, 2)
    }

    func testCompletedRideNeverStartsCollection() {
        transport.tick()
        http.reply?(200, ["rideFound": true, "role": "DRIVER",
                          "ride": ["rideId": "1", "rideStatus": "COMPLETED"]], 0)
        XCTAssertEqual(stopped, .ineligible)
        XCTAssertEqual(verifications, 0)
    }

    func testTokenRotationRetriesWithoutStoppingNewCredentials() {
        transport.tick(); config.token = "rotated"
        http.reply?(401, nil, 0); transport.tick()
        XCTAssertNil(stopped)
        XCTAssertEqual(http.calls.count, 2)
    }

    func testStaleFixAndPostStopCallbackAreDiscarded() {
        validate(); transport.offer(fix(age: 31))
        XCTAssertEqual(http.calls.count, 1)
        transport.offer(fix())
        transport.close(); http.reply?(200, nil, 0)
        XCTAssertNil(uploaded)
        XCTAssertTrue(http.cancelled)
    }
}
