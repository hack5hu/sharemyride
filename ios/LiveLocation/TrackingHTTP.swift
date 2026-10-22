import Foundation

protocol TrackingHTTPClient: AnyObject {
    func post(_ url: URL, token: String, body: [String: Any],
              completion: @escaping (Int, [String: Any]?, TimeInterval) -> Void)
    func cancel()
}

final class TrackingHTTP: NSObject, TrackingHTTPClient, URLSessionTaskDelegate {
    private var session: URLSession?

    override init() {
        super.init()
        let config = URLSessionConfiguration.ephemeral
        config.urlCache = nil
        config.httpCookieStorage = nil
        config.httpShouldSetCookies = false
        config.urlCredentialStorage = nil
        config.timeoutIntervalForRequest = 15
        config.timeoutIntervalForResource = 20
        config.waitsForConnectivity = false
        session = URLSession(configuration: config, delegate: self, delegateQueue: nil)
    }

    func post(_ url: URL, token: String, body: [String: Any],
              completion: @escaping (Int, [String: Any]?, TimeInterval) -> Void) {
        var request = URLRequest(url: url, cachePolicy: .reloadIgnoringLocalCacheData)
        request.httpMethod = "POST"
        request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        let lifetime = TrackingRequestLifetime()
        let task = session?.dataTask(with: request) { data, response, error in
            let response = response as? HTTPURLResponse
            let json = data.flatMap { try? JSONSerialization.jsonObject(with: $0) } as? [String: Any]
            let retry = Self.retryDelay(response?.value(forHTTPHeaderField: "Retry-After"))
            DispatchQueue.main.async {
                lifetime.finish()
                completion(error == nil ? response?.statusCode ?? 0 : 0, json, retry)
            }
        }
        lifetime.start { [weak task] in task?.cancel() }
        task?.resume()
    }

    static func retryDelay(_ value: String?, now: Date = Date()) -> TimeInterval {
        guard let value else { return 0 }
        if let seconds = Double(value), seconds.isFinite { return min(120, max(0, seconds)) }
        let formatter = DateFormatter()
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = TimeZone(secondsFromGMT: 0)
        formatter.dateFormat = "EEE, dd MMM yyyy HH:mm:ss z"
        return min(120, max(0, formatter.date(from: value)?.timeIntervalSince(now) ?? 0))
    }

    func urlSession(_ session: URLSession, task: URLSessionTask,
                    willPerformHTTPRedirection response: HTTPURLResponse, newRequest request: URLRequest,
                    completionHandler: @escaping (URLRequest?) -> Void) {
        completionHandler(nil)
    }

    func cancel() {
        session?.invalidateAndCancel()
        session = nil
    }
}
