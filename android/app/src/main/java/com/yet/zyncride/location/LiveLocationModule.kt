package com.yet.zyncride.location

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.location.LocationManager
import androidx.core.content.ContextCompat
import androidx.core.location.LocationManagerCompat
import com.facebook.fbreact.specs.NativeLiveLocationSpec
import com.facebook.react.common.LifecycleState
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = LiveLocationModule.NAME)
class LiveLocationModule(private val context: ReactApplicationContext) : NativeLiveLocationSpec(context) {
    companion object { const val NAME = "NativeLiveLocation" }
    override fun getName() = NAME
    private val listener: (com.facebook.react.bridge.WritableMap) -> Unit = {
        if (context.hasActiveReactInstance()) emitOnTrackingStateChanged(it)
    }

    override fun initialize() {
        super.initialize()
        TrackingSession.main.post { TrackingSession.listener = listener }
    }

    override fun startTracking(options: ReadableMap, promise: Promise) {
        val config = try { TrackingConfig.from(options) } catch (_: Exception) {
            promise.reject("INVALID_CONFIG", "Invalid tracking configuration")
            return
        }
        TrackingSession.main.post {
            val session = TrackingSession
            if (context.lifecycleState != LifecycleState.RESUMED || context.currentActivity == null) {
                promise.reject("NOT_VISIBLE", "Start tracking from a visible activity")
                return@post
            }
            if (ContextCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                promise.reject("PERMISSION", "Precise location permission is required")
                return@post
            }
            if (session.running && session.config?.rideId == config.rideId) {
                session.config?.token = config.token
                promise.resolve(session.snapshot())
                return@post
            }
            if (session.config != null) {
                promise.reject("SESSION_EXISTS", "Stop the previous session before starting another")
                return@post
            }
            session.config = config
            session.completion = { promise.resolve(session.snapshot()) }
            try {
                ContextCompat.startForegroundService(context, Intent(context, LiveLocationForegroundService::class.java))
            } catch (_: Exception) {
                session.stopped(TrackingReason.UNAVAILABLE)
            }
        }
    }

    override fun stopTracking(reason: String, sessionId: String, promise: Promise) {
        TrackingSession.main.post {
            if (sessionId.isNotEmpty() && TrackingSession.config?.sessionId != sessionId) {
                promise.resolve(TrackingSession.snapshot())
                return@post
            }
            val value = TrackingReason.entries.find { it.name == reason } ?: TrackingReason.USER
            LiveLocationForegroundService.instance?.stop(value)
                ?: TrackingSession.stopped(value)
            context.stopService(Intent(context, LiveLocationForegroundService::class.java))
            promise.resolve(TrackingSession.snapshot())
        }
    }

    override fun getTrackingState(promise: Promise) {
        TrackingSession.main.post {
            val manager = context.getSystemService(Context.LOCATION_SERVICE) as LocationManager
            if (TrackingSession.reason == TrackingReason.LOCATION_DISABLED &&
                LocationManagerCompat.isLocationEnabled(manager)) {
                TrackingSession.reason = TrackingReason.USER
            }
            promise.resolve(TrackingSession.snapshot())
        }
    }

    override fun updateAuthToken(token: String) {
        TrackingSession.main.post {
            if (token.isNotBlank()) TrackingSession.config?.token = token
        }
    }

    override fun invalidate() {
        TrackingSession.main.post {
            if (TrackingSession.listener === listener) TrackingSession.listener = null
        }
        super.invalidate()
    }
}
