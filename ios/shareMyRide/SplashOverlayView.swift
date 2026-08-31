import UIKit

@objc(SplashOverlayView)
public final class SplashOverlayView: UIView {

  // MARK: - Singleton Access
  @objc public static var shared: SplashOverlayView?

  // MARK: - Constants
  private enum Constants {
    static let minDisplayDuration: TimeInterval = 2.0
    static let fadeOutDuration: TimeInterval = 0.3
    static let fadeDuration: TimeInterval = 0.8
    static let scaleDuration: TimeInterval = 0.9
    static let subtitleDelay: TimeInterval = 0.4
    static let loaderDelay: TimeInterval = 0.7
    static let pulseDuration: TimeInterval = 1.4
    static let orbSlowDuration: TimeInterval = 3.0
    static let orbSlowerDuration: TimeInterval = 3.5
  }

  // MARK: - Light / Dark Color Palettes
  struct ColorPalette {
    let background: UIColor
    let primary: UIColor
    let primaryContainer: UIColor
    let textMain: UIColor
    let textSub: UIColor
    let orbPrimary: UIColor
    let orbAccent: UIColor
    let orbSubtle: UIColor
  }

  static let lightPalette = ColorPalette(
    background: UIColor(red: 249/255, green: 249/255, blue: 249/255, alpha: 1.0),
    primary: UIColor(red: 0/255, green: 88/255, blue: 188/255, alpha: 1.0),
    primaryContainer: UIColor(red: 0/255, green: 112/255, blue: 235/255, alpha: 1.0),
    textMain: UIColor(red: 26/255, green: 28/255, blue: 28/255, alpha: 1.0),
    textSub: UIColor(red: 65/255, green: 71/255, blue: 85/255, alpha: 1.0),
    orbPrimary: UIColor(red: 240/255, green: 88/255, blue: 188/255, alpha: 14/255), // #0EF058BC
    orbAccent: UIColor(red: 0/255, green: 112/255, blue: 235/255, alpha: 26/255),   // #1A0070EB
    orbSubtle: UIColor(red: 0/255, green: 88/255, blue: 188/255, alpha: 10/255)    // #0A0058BC
  )

  static let darkPalette = ColorPalette(
    background: UIColor(red: 26/255, green: 29/255, blue: 35/255, alpha: 1.0),
    primary: UIColor(red: 4/255, green: 136/255, blue: 91/255, alpha: 1.0),
    primaryContainer: UIColor(red: 0/255, green: 135/255, blue: 90/255, alpha: 1.0),
    textMain: UIColor(red: 249/255, green: 250/255, blue: 251/255, alpha: 1.0),
    textSub: UIColor(red: 156/255, green: 163/255, blue: 175/255, alpha: 1.0),
    orbPrimary: UIColor(red: 4/255, green: 136/255, blue: 91/255, alpha: 20/255),  // #1404885B
    orbAccent: UIColor(red: 0/255, green: 135/255, blue: 90/255, alpha: 31/255),   // #1F00875A
    orbSubtle: UIColor(red: 4/255, green: 136/255, blue: 91/255, alpha: 15/255)   // #0F04885B
  )

  // MARK: - State
  private var startTime: Date = Date()
  private var isHiding = false

  // MARK: - Subviews
  private let orbTopRight = UIView()
  private let orbBottomLeft = UIView()
  private let orbMidLeft = UIView()
  private let brandCluster = UIView()
  private let logoIcon = UIView()
  private let logoText = UILabel()
  private let subtitleLabel = UILabel()
  private let loaderSection = UIView()
  private let pulseRing = UIView()
  private let loadingLabel = UILabel()

  // MARK: - Lifecycle
  public override init(frame: CGRect) {
    super.init(frame: frame)
    setupViews()
  }

  public required init?(coder: NSCoder) {
    super.init(coder: coder)
    setupViews()
  }

  // MARK: - Public API

  @objc public static func show(in window: UIWindow) {
    let overlay = SplashOverlayView(frame: window.bounds)
    overlay.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    window.addSubview(overlay)
    shared = overlay
    overlay.startTime = Date()
    overlay.startAnimations()
  }

  @objc public func hide(fade: Bool = true, completion: @escaping () -> Void = {}) {
    guard !isHiding else {
      completion()
      return
    }

    let elapsed = Date().timeIntervalSince(startTime)
    let remaining = max(Constants.minDisplayDuration - elapsed, 0)

    DispatchQueue.main.asyncAfter(deadline: .now() + remaining) { [weak self] in
      guard let self = self else {
        completion()
        return
      }

      self.isHiding = true

      if fade {
        UIView.animate(
          withDuration: Constants.fadeOutDuration,
          animations: { self.alpha = 0 },
          completion: { _ in
            self.cleanup()
            completion()
          }
        )
      } else {
        self.cleanup()
        completion()
      }
    }
  }

  private func cleanup() {
    layer.removeAllAnimations()
    removeFromSuperview()
    SplashOverlayView.shared = nil
    isHiding = false
  }

  private var palette: ColorPalette {
    if traitCollection.userInterfaceStyle == .dark {
      return SplashOverlayView.darkPalette
    }
    return SplashOverlayView.lightPalette
  }

  private func setupViews() {
    let colors = palette
    backgroundColor = colors.background
    clipsToBounds = false

    setupOrbs(colors: colors)
    setupBrandCluster(colors: colors)
    setupLoaderSection(colors: colors)
  }

  private func setupOrbs(colors: ColorPalette) {
    configureOrb(orbTopRight, size: 240, color: colors.orbPrimary)
    addSubview(orbTopRight)

    configureOrb(orbBottomLeft, size: 220, color: colors.orbAccent)
    addSubview(orbBottomLeft)

    configureOrb(orbMidLeft, size: 110, color: colors.orbSubtle)
    addSubview(orbMidLeft)
  }

  private func configureOrb(_ orb: UIView, size: CGFloat, color: UIColor) {
    orb.frame = CGRect(x: 0, y: 0, width: size, height: size)
    orb.layer.cornerRadius = size / 2
    orb.backgroundColor = color
  }

  private func setupBrandCluster(colors: ColorPalette) {
    addSubview(brandCluster)

    logoIcon.frame = CGRect(x: 0, y: 0, width: 48, height: 48)
    setupZIcon(in: logoIcon, colors: colors)
    brandCluster.addSubview(logoIcon)

    logoText.attributedText = buildBrandText(colors: colors)
    logoText.sizeToFit()
    brandCluster.addSubview(logoText)

    subtitleLabel.text = "Smart rides, shared journeys"
    subtitleLabel.font = .systemFont(ofSize: 14, weight: .regular)
    subtitleLabel.textColor = colors.textSub
    subtitleLabel.textAlignment = .center
    subtitleLabel.sizeToFit()
    brandCluster.addSubview(subtitleLabel)

    brandCluster.alpha = 0
    brandCluster.transform = CGAffineTransform(scaleX: 0.85, y: 0.85)
    subtitleLabel.alpha = 0
  }

  private func setupLoaderSection(colors: ColorPalette) {
    addSubview(loaderSection)

    let ringSize: CGFloat = 36
    pulseRing.frame = CGRect(x: 0, y: 0, width: ringSize, height: ringSize)
    pulseRing.layer.cornerRadius = ringSize / 2
    pulseRing.layer.borderWidth = 2.5
    pulseRing.layer.borderColor = colors.primaryContainer.cgColor
    pulseRing.backgroundColor = .clear
    loaderSection.addSubview(pulseRing)

    loadingLabel.text = "Preparing your ride..."
    loadingLabel.font = .systemFont(ofSize: 12, weight: .regular)
    loadingLabel.textColor = colors.textSub
    loadingLabel.textAlignment = .center
    loadingLabel.sizeToFit()
    loaderSection.addSubview(loadingLabel)

    loaderSection.alpha = 0
  }

  private func setupZIcon(in container: UIView, colors: ColorPalette) {
    let size: CGFloat = 48
    let scale = size / 100.0

    let zPath = UIBezierPath()
    zPath.move(to: CGPoint(x: 25 * scale, y: 25 * scale))
    zPath.addLine(to: CGPoint(x: 75 * scale, y: 25 * scale))
    zPath.addLine(to: CGPoint(x: 25 * scale, y: 75 * scale))
    zPath.addLine(to: CGPoint(x: 75 * scale, y: 75 * scale))

    let zLayer = CAShapeLayer()
    zLayer.path = zPath.cgPath
    zLayer.strokeColor = colors.primary.cgColor
    zLayer.fillColor = UIColor.clear.cgColor
    zLayer.lineWidth = 12 * scale
    zLayer.lineCap = .round
    zLayer.lineJoin = .round
    container.layer.addSublayer(zLayer)

    let dotRadius: CGFloat = 6 * scale
    let topDot = CAShapeLayer()
    topDot.path = UIBezierPath(
      arcCenter: CGPoint(x: 75 * scale, y: 25 * scale),
      radius: dotRadius,
      startAngle: 0,
      endAngle: .pi * 2,
      clockwise: true
    ).cgPath
    topDot.fillColor = colors.textMain.cgColor
    container.layer.addSublayer(topDot)

    let bottomDot = CAShapeLayer()
    bottomDot.path = UIBezierPath(
      arcCenter: CGPoint(x: 25 * scale, y: 75 * scale),
      radius: dotRadius,
      startAngle: 0,
      endAngle: .pi * 2,
      clockwise: true
    ).cgPath
    bottomDot.fillColor = colors.textMain.cgColor
    container.layer.addSublayer(bottomDot)
  }

  private func buildBrandText(colors: ColorPalette) -> NSAttributedString {
    let text = "ZyncRide"
    let attributed = NSMutableAttributedString(string: text)
    let font = UIFont.systemFont(ofSize: 36, weight: .bold)

    attributed.addAttribute(.font, value: font, range: NSRange(location: 0, length: 8))
    attributed.addAttribute(
      .foregroundColor,
      value: colors.textMain,
      range: NSRange(location: 0, length: 4)
    )
    attributed.addAttribute(
      .foregroundColor,
      value: colors.primary,
      range: NSRange(location: 4, length: 4)
    )

    return attributed
  }

  public override func layoutSubviews() {
    super.layoutSubviews()
    let w = bounds.width
    let h = bounds.height

    // Exact parity with Android activity_splash.xml:
    // 1. orbTopRight: width=240, height=240, gravity=top|end, marginTop=-40, marginEnd=-60
    // => right=w+60, top=-40 => center.x = w+60-120 = w-60, center.y = -40+120 = 80
    orbTopRight.center = CGPoint(x: w - 60, y: 80)

    // 2. orbBottomLeft: width=220, height=220, gravity=bottom|start, marginBottom=-30, marginStart=-60
    // => left=-60, bottom=h+30 => center.x = -60+110 = 50, center.y = (h+30)-110 = h-80
    orbBottomLeft.center = CGPoint(x: 50, y: h - 80)

    // 3. orbMidLeft: width=110, height=110, gravity=top|start, marginTop=160, marginStart=-30
    // => left=-30, top=160 => center.x = -30+55 = 25, center.y = 160+55 = 215
    orbMidLeft.center = CGPoint(x: 25, y: 215)

    // Brand cluster
    let iconW: CGFloat = 48
    let textW = logoText.frame.width
    let spacing: CGFloat = 10
    let clusterW = iconW + spacing + textW
    let clusterH = max(iconW, logoText.frame.height) + 10 + subtitleLabel.frame.height

    brandCluster.frame = CGRect(
      x: (w - clusterW) / 2,
      y: (h - clusterH) / 2 - 20,
      width: clusterW,
      height: clusterH
    )

    let logoRowH = max(iconW, logoText.frame.height)
    logoIcon.frame = CGRect(x: 0, y: (logoRowH - iconW) / 2, width: iconW, height: iconW)
    logoText.frame = CGRect(
      x: iconW + spacing,
      y: (logoRowH - logoText.frame.height) / 2,
      width: textW,
      height: logoText.frame.height
    )
    subtitleLabel.frame = CGRect(
      x: (clusterW - subtitleLabel.frame.width) / 2,
      y: logoRowH + 10,
      width: subtitleLabel.frame.width,
      height: subtitleLabel.frame.height
    )

    // Loader section
    let ringSize: CGFloat = 36
    let loadW = loadingLabel.frame.width
    let loadH = ringSize + 12 + loadingLabel.frame.height
    let loaderW = max(ringSize, loadW)

    loaderSection.frame = CGRect(
      x: (w - loaderW) / 2,
      y: h - 64 - loadH,
      width: loaderW,
      height: loadH
    )
    pulseRing.center = CGPoint(x: loaderW / 2, y: ringSize / 2)
    loadingLabel.frame = CGRect(
      x: (loaderW - loadW) / 2,
      y: ringSize + 12,
      width: loadW,
      height: loadingLabel.frame.height
    )
  }

  private func startAnimations() {
    addBreathingAnimation(to: orbTopRight, minScale: 0.8, maxScale: 1.15, duration: Constants.orbSlowDuration)
    addBreathingAnimation(to: orbBottomLeft, minScale: 0.7, maxScale: 1.1, duration: Constants.orbSlowerDuration)
    addBreathingAnimation(to: orbMidLeft, minScale: 0.7, maxScale: 1.1, duration: Constants.orbSlowerDuration)

    UIView.animate(
      withDuration: Constants.fadeDuration,
      delay: 0,
      options: .curveEaseOut,
      animations: { self.brandCluster.alpha = 1 }
    )

    UIView.animate(
      withDuration: Constants.scaleDuration,
      delay: 0,
      usingSpringWithDamping: 0.7,
      initialSpringVelocity: 0,
      options: [],
      animations: { self.brandCluster.transform = .identity }
    )

    UIView.animate(
      withDuration: Constants.fadeDuration,
      delay: Constants.subtitleDelay,
      options: .curveEaseOut,
      animations: { self.subtitleLabel.alpha = 1 }
    )

    UIView.animate(
      withDuration: Constants.fadeDuration,
      delay: Constants.loaderDelay,
      options: .curveEaseOut,
      animations: { self.loaderSection.alpha = 1 }
    )

    DispatchQueue.main.asyncAfter(deadline: .now() + Constants.loaderDelay) { [weak self] in
      self?.addPulseAnimation()
    }
  }

  private func addBreathingAnimation(to view: UIView, minScale: CGFloat, maxScale: CGFloat, duration: TimeInterval) {
    let anim = CABasicAnimation(keyPath: "transform.scale")
    anim.fromValue = minScale
    anim.toValue = maxScale
    anim.duration = duration
    anim.autoreverses = true
    anim.repeatCount = .infinity
    anim.timingFunction = CAMediaTimingFunction(name: .easeInEaseOut)
    view.layer.add(anim, forKey: "breathing")
  }

  private func addPulseAnimation() {
    let scaleAnim = CABasicAnimation(keyPath: "transform.scale")
    scaleAnim.fromValue = 0.6
    scaleAnim.toValue = 1.2

    let alphaAnim = CABasicAnimation(keyPath: "opacity")
    alphaAnim.fromValue = 1.0
    alphaAnim.toValue = 0.3

    let group = CAAnimationGroup()
    group.animations = [scaleAnim, alphaAnim]
    group.duration = Constants.pulseDuration
    group.autoreverses = true
    group.repeatCount = .infinity
    group.timingFunction = CAMediaTimingFunction(name: .easeInEaseOut)

    pulseRing.layer.add(group, forKey: "pulse")
  }
}
