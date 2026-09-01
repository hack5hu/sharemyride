import UIKit
import FirebaseCore
import React
import React_RCTAppDelegate
import ReactAppDependencyProvider
import react_native_stallion

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
  var window: UIWindow?

  var reactNativeDelegate: ReactNativeDelegate?
  var reactNativeFactory: RCTReactNativeFactory?

  func application(
    _ application: UIApplication,
    didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]? = nil
  ) -> Bool {
    FirebaseApp.configure()
    let delegate = ReactNativeDelegate()
    let factory = RCTReactNativeFactory(delegate: delegate)
    delegate.dependencyProvider = RCTAppDependencyProvider()

    reactNativeDelegate = delegate
    reactNativeFactory = factory

    let win = UIWindow(frame: UIScreen.main.bounds)
    if let savedTheme = UserDefaults.standard.string(forKey: "themeMode") {
      switch savedTheme {
      case "light":
        win.overrideUserInterfaceStyle = .light
      case "dark":
        win.overrideUserInterfaceStyle = .dark
      default:
        win.overrideUserInterfaceStyle = .unspecified
      }
    }
    window = win

    factory.startReactNative(
      withModuleName: "shareMyRide",
      in: window,
      launchOptions: launchOptions
    )

    if let currentWindow = window {
      SplashOverlayView.show(in: currentWindow)
    }

    return true
  }
}

class ReactNativeDelegate: RCTDefaultReactNativeFactoryDelegate {
  override func sourceURL(for bridge: RCTBridge) -> URL? {
    self.bundleURL()
  }

  override func bundleURL() -> URL? {
#if DEBUG
    RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
#else
    StallionModule.getBundleURL()
#endif
  }
}
