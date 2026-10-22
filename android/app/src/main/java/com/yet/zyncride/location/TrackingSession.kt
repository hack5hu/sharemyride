package com.yet.zyncride.location

import android.location.Location
import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import okhttp3.HttpUrl.Companion.toHttpUrl

// All mutable session state is confined to the main looper.
enum class TrackingReason {
    NONE, USER, INELIGIBLE, AUTH, PERMISSION, LOCATION_DISABLED, UNAVAILABLE, EXPIRED, OFFLINE, WAITING
}

data class TrackingConfig(
    val rideId: String, val sessionId: String, var token: String,
    val uploadUrl: String, val statusUrl: String, val language: String
) {
    companion object {
        fun from(map: ReadableMap): TrackingConfig {
            fun required(key: String) = requireNotNull(map.getString(key)).also { require(it.isNotBlank()) }
            val upload = required("uploadUrl").toHttpUrl()
            val status = required("statusUrl").toHttpUrl()
            require(upload.isHttps && status.isHttps && upload.host == status.host)
            return TrackingConfig(required("rideId"), required("sessionId"), required("authToken"),
                upload.toString(), status.toString(), required("language"))
        }
    }
}

object TrackingSession {
    val main = Handler(Looper.getMainLooper())
    var config: TrackingConfig? = null
    var running = false
    var reason = TrackingReason.NONE
    var lastLocation: Location? = null
    var lastUploadedTimestamp = 0L
    var listener: ((WritableMap) -> Unit)? = null
    var completion: ((Boolean) -> Unit)? = null

    fun snapshot(): WritableMap = Arguments.createMap().apply {
        putBoolean("isTracking", running)
        putString("rideId", config?.rideId ?: "")
        putString("sessionId", config?.sessionId ?: "")
        putString("reason", reason.name)
        putDouble("lastUploadedTimestamp", lastUploadedTimestamp.toDouble())
        putDouble("lastTimestamp", lastLocation?.time?.toDouble() ?: 0.0)
    }

    fun publish(value: TrackingReason) {
        reason = value
        listener?.invoke(snapshot())
    }

    fun stopped(value: TrackingReason) {
        running = false
        reason = value
        completion?.invoke(false)
        completion = null
        lastLocation = null
        lastUploadedTimestamp = 0
        listener?.invoke(snapshot())
        config = null
    }
}
