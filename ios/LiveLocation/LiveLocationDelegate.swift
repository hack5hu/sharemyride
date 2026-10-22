import CoreLocation
import Foundation

extension LiveLocationManager: CLLocationManagerDelegate {
    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) { check() }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard running else { return }
        // Check permission and the server lease before processing callbacks after suspension.
        check()
        guard running else { return }
        guard let fix = locations.last, TrackingPolicy.acceptable(fix, previous: lastLocation) else {
            publish(.waiting); return
        }
        lastLocation = fix
        transport?.offer(fix)
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        guard config != nil else { return }
        if (error as? CLError)?.code == .denied {
            stop(CLLocationManager.locationServicesEnabled() ? .permission : .locationDisabled)
        }
        else if (error as? CLError)?.code == .locationUnknown { publish(.waiting) }
        else { stop(.unavailable) }
    }

    func locationManagerDidPauseLocationUpdates(_ manager: CLLocationManager) {
        if running { stop(.unavailable) }
    }
}
