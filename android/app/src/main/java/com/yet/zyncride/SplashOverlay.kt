package com.yet.zyncride

import android.animation.AnimatorSet
import android.animation.ObjectAnimator
import android.animation.PropertyValuesHolder
import android.animation.ValueAnimator
import android.app.Activity
import android.os.Handler
import android.os.Looper
import android.text.Spannable
import android.text.SpannableString
import android.text.style.ForegroundColorSpan
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.animation.AccelerateDecelerateInterpolator
import android.view.animation.OvershootInterpolator
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.content.ContextCompat
import androidx.core.view.WindowCompat

class SplashOverlay(private val activity: Activity) {

    private var splashView: View? = null
    private val animators = mutableListOf<ValueAnimator>()
    private val handler = Handler(Looper.getMainLooper())
    private var startTime: Long = 0
    private var isHiding = false

    companion object {
        private const val MIN_DISPLAY_DURATION_MS = 2000L
        private const val FADE_OUT_DURATION_MS = 300L
        private const val FADE_DURATION_MS = 800L
        private const val SCALE_DURATION_MS = 900L
        private const val SUBTITLE_DELAY_MS = 400L
        private const val LOADER_DELAY_MS = 700L
        private const val PULSE_DURATION_MS = 1400L
        private const val ORB_SLOW_MS = 3000L
        private const val ORB_SLOWER_MS = 3500L
    }

    fun show() {
        if (splashView != null) return

        startTime = System.currentTimeMillis()

        val decorView = activity.window.decorView as? ViewGroup ?: return
        val inflater = LayoutInflater.from(activity)
        val view = inflater.inflate(R.layout.activity_splash, decorView, false)
        splashView = view

        view.layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.MATCH_PARENT
        )

        decorView.addView(view)

        setupSystemBars()
        setupLogoText(view)
        startAnimations(view)
    }

    private fun setupSystemBars() {
        WindowCompat.setDecorFitsSystemWindows(activity.window, false)
        val insetsController = WindowCompat.getInsetsController(activity.window, activity.window.decorView)
        insetsController.isAppearanceLightStatusBars = activity.resources.getBoolean(R.bool.is_light_mode)
    }

    private fun setupLogoText(root: View) {
        val logoTextView = root.findViewById<TextView>(R.id.logoText) ?: return
        val brandText = "ZyncRide"
        val spannable = SpannableString(brandText)

        val mainTextColor = ContextCompat.getColor(activity, R.color.splash_text_main)
        val primaryColor = ContextCompat.getColor(activity, R.color.splash_primary)

        spannable.setSpan(
            ForegroundColorSpan(mainTextColor),
            0,
            4,
            Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
        )
        spannable.setSpan(
            ForegroundColorSpan(primaryColor),
            4,
            8,
            Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
        )

        logoTextView.text = spannable
    }

    private fun startAnimations(root: View) {
        val orbTopRight = root.findViewById<View>(R.id.orbTopRight)
        val orbBottomLeft = root.findViewById<View>(R.id.orbBottomLeft)
        val orbMidLeft = root.findViewById<View>(R.id.orbMidLeft)
        val brandCluster = root.findViewById<LinearLayout>(R.id.brandCluster)
        val splashSubtitle = root.findViewById<TextView>(R.id.splashSubtitle)
        val loaderSection = root.findViewById<LinearLayout>(R.id.loaderSection)
        val pulseRing = root.findViewById<View>(R.id.pulseRing)

        // 1. Orb breathing animations
        orbTopRight?.let { startBreathingAnimation(it, 0.8f, 1.15f, ORB_SLOW_MS) }
        orbBottomLeft?.let { startBreathingAnimation(it, 0.7f, 1.1f, ORB_SLOWER_MS) }
        orbMidLeft?.let { startBreathingAnimation(it, 0.7f, 1.1f, ORB_SLOWER_MS) }

        // 2. Brand cluster entry animation (Fade + Overshoot scale)
        if (brandCluster != null) {
            brandCluster.alpha = 0f
            brandCluster.scaleX = 0.85f
            brandCluster.scaleY = 0.85f

            val brandFade = ObjectAnimator.ofFloat(brandCluster, View.ALPHA, 0f, 1f).apply {
                duration = FADE_DURATION_MS
            }
            val brandScaleX = ObjectAnimator.ofFloat(brandCluster, View.SCALE_X, 0.85f, 1f).apply {
                duration = SCALE_DURATION_MS
                interpolator = OvershootInterpolator(1.2f)
            }
            val brandScaleY = ObjectAnimator.ofFloat(brandCluster, View.SCALE_Y, 0.85f, 1f).apply {
                duration = SCALE_DURATION_MS
                interpolator = OvershootInterpolator(1.2f)
            }

            AnimatorSet().apply {
                playTogether(brandFade, brandScaleX, brandScaleY)
                start()
            }
        }

        // 3. Subtitle delayed fade-in
        splashSubtitle?.let {
            it.alpha = 0f
            ObjectAnimator.ofFloat(it, View.ALPHA, 0f, 1f).apply {
                duration = FADE_DURATION_MS
                startDelay = SUBTITLE_DELAY_MS
                start()
            }
        }

        // 4. Loader delayed fade-in + Pulse Ring animation
        loaderSection?.let {
            it.alpha = 0f
            ObjectAnimator.ofFloat(it, View.ALPHA, 0f, 1f).apply {
                duration = FADE_DURATION_MS
                startDelay = LOADER_DELAY_MS
                start()
            }
        }

        pulseRing?.let { startPulseAnimation(it) }
    }

    private fun startBreathingAnimation(target: View, minScale: Float, maxScale: Float, durationMs: Long) {
        val scaleXHolder = PropertyValuesHolder.ofFloat(View.SCALE_X, minScale, maxScale)
        val scaleYHolder = PropertyValuesHolder.ofFloat(View.SCALE_Y, minScale, maxScale)

        val animator = ObjectAnimator.ofPropertyValuesHolder(target, scaleXHolder, scaleYHolder).apply {
            duration = durationMs
            interpolator = AccelerateDecelerateInterpolator()
            repeatMode = ValueAnimator.REVERSE
            repeatCount = ValueAnimator.INFINITE
            start()
        }
        animators.add(animator)
    }

    private fun startPulseAnimation(target: View) {
        val scaleXHolder = PropertyValuesHolder.ofFloat(View.SCALE_X, 0.6f, 1.2f)
        val scaleYHolder = PropertyValuesHolder.ofFloat(View.SCALE_Y, 0.6f, 1.2f)
        val alphaHolder = PropertyValuesHolder.ofFloat(View.ALPHA, 1.0f, 0.3f)

        val animator = ObjectAnimator.ofPropertyValuesHolder(target, scaleXHolder, scaleYHolder, alphaHolder).apply {
            duration = PULSE_DURATION_MS
            interpolator = AccelerateDecelerateInterpolator()
            repeatMode = ValueAnimator.REVERSE
            repeatCount = ValueAnimator.INFINITE
            start()
        }
        animators.add(animator)
    }

    fun hide(fade: Boolean = true, onHidden: () -> Unit = {}) {
        if (isHiding || splashView == null) {
            onHidden()
            return
        }

        val elapsed = System.currentTimeMillis() - startTime
        val remaining = (MIN_DISPLAY_DURATION_MS - elapsed).coerceAtLeast(0L)

        handler.postDelayed({
            val view = splashView ?: run {
                onHidden()
                return@postDelayed
            }

            isHiding = true

            if (fade) {
                view.animate()
                    .alpha(0f)
                    .setDuration(FADE_OUT_DURATION_MS)
                    .setInterpolator(AccelerateDecelerateInterpolator())
                    .withEndAction {
                        cleanup(view)
                        onHidden()
                    }
                    .start()
            } else {
                cleanup(view)
                onHidden()
            }
        }, remaining)
    }

    private fun cleanup(view: View) {
        val parent = view.parent as? ViewGroup
        parent?.removeView(view)
        splashView = null
        isHiding = false
        animators.forEach { it.cancel() }
        animators.clear()
    }
}
