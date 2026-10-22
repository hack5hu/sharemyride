// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "RideTrackingCore",
    platforms: [.macOS(.v13)],
    targets: [
        .target(name: "RideTrackingCore", path: ".",
                exclude: ["Tests", "LiveLocationManager.swift", "LiveLocationDelegate.swift",
                          "LiveLocationModule.h", "LiveLocationModule.mm"],
                sources: ["TrackingTypes.swift", "TrackingPolicy.swift", "TrackingHTTP.swift",
                          "TrackingRequestLifetime.swift", "TrackingTransport.swift"]),
        .testTarget(name: "RideTrackingCoreTests", dependencies: ["RideTrackingCore"], path: "Tests"),
    ]
)
