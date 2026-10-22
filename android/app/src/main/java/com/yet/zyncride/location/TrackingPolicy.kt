package com.yet.zyncride.location

import android.location.Location
import android.os.SystemClock
import org.json.JSONObject

private enum class TerminalRideStatus { COMPLETED, CANCELLED, REJECTED }
private enum class ParticipantRole { DRIVER, PASSENGER }

object TrackingPolicy {
    const val LEASE_MS = 120_000L
    const val UPLOAD_MS = 10_000L
    const val STATUS_MS = 30_000L
    const val MAX_FIX_AGE_MS = 30_000L

    fun acceptable(location: Location, previous: Location?): Boolean {
        val age = (SystemClock.elapsedRealtimeNanos() - location.elapsedRealtimeNanos) / 1_000_000
        if (age !in 0..MAX_FIX_AGE_MS || !location.hasAccuracy() || location.accuracy !in 0f..50f) return false
        if (!location.latitude.isFinite() || !location.longitude.isFinite()) return false
        if (location.latitude !in -90.0..90.0 || location.longitude !in -180.0..180.0) return false
        if (previous == null) return true
        val seconds = (location.elapsedRealtimeNanos - previous.elapsedRealtimeNanos) / 1_000_000_000.0
        if (seconds <= 0) return false
        val distance = location.distanceTo(previous)
        return distance <= 80 * seconds + location.accuracy + previous.accuracy
    }

    internal fun eligibleFields(
        rideFound: Boolean, rideId: String, requestedRideId: String, status: String, role: String
    ): Boolean {
        val normStatus = status.uppercase()
        val isParticipant = ParticipantRole.entries.any { it.name == role.uppercase() }
        return rideFound && rideId == requestedRideId &&
            isParticipant && normStatus.isNotEmpty() && TerminalRideStatus.entries.none { it.name == normStatus }
    }

    fun eligible(payload: JSONObject, rideId: String): Boolean {
        val data = payload.optJSONObject("data") ?: payload
        val ride = data.optJSONObject("ride") ?: return false
        val status = ride.optString("rideStatus").ifEmpty { ride.optString("status") }
        val role = data.optString("role", ride.optString("role"))
        val id = ride.optString("rideId").ifEmpty { ride.optString("id") }
        return eligibleFields(data.optBoolean("rideFound"), id, rideId, status, role)
    }
}
