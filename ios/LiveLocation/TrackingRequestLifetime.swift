import Foundation
#if canImport(UIKit)
import UIKit
#endif

// A bounded assertion lets an in-flight upload finish after a location wakeup.
// It does not create a background loop or restart a terminated app.
final class TrackingRequestLifetime {
#if canImport(UIKit)
    private var identifier = UIBackgroundTaskIdentifier.invalid
#endif
    func start(expire: @escaping () -> Void) {
#if canImport(UIKit)
        identifier = UIApplication.shared.beginBackgroundTask { [weak self] in
            expire()
            self?.finish()
        }
#endif
    }

    func finish() {
#if canImport(UIKit)
        guard identifier != .invalid else { return }
        let current = identifier
        identifier = .invalid
        UIApplication.shared.endBackgroundTask(current)
#endif
    }
}
