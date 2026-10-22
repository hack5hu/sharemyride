package com.yet.zyncride.location

import android.location.Location
import android.os.SystemClock
import kotlin.random.Random
import org.json.JSONObject

// One in-flight request and one latest-only fix in memory. Nothing sensitive is persisted.
class TrackingTransport(private val config: TrackingConfig, private val stop: (TrackingReason) -> Unit, private val verified: () -> Unit) {
    private val http = LocationHttpUploader()
    private var active = true
    private var busy = false
    private val pending = LatestFixBuffer<Location>(TrackingPolicy.MAX_FIX_AGE_MS)
    private var lastSent: Location? = null
    private var verifiedAt = 0L
    private var lastCheck = 0L
    private var lastUpload = 0L
    private var retryAt = 0L
    private var backoff = 5_000L
    private val startedAt = SystemClock.elapsedRealtime()
    private val tick = object : Runnable {
        override fun run() {
            if (!active) return
            val now = SystemClock.elapsedRealtime()
            if (now - (verifiedAt.takeIf { it > 0 } ?: startedAt) >= TrackingPolicy.LEASE_MS) {
                stop(TrackingReason.EXPIRED)
                return
            }
            if (!busy && now >= retryAt) {
                if (lastCheck == 0L || now - lastCheck >= TrackingPolicy.STATUS_MS) validate()
                else if (verifiedAt > 0 && now - lastUpload >= TrackingPolicy.UPLOAD_MS) upload()
            }
            TrackingSession.main.postDelayed(this, 5000)
        }
    }

    fun start() { tick.run() }
    fun offer(location: Location) {
        pending.offer(Location(location), location.elapsedRealtimeNanos / 1_000_000)
    }

    private fun validate() {
        lastCheck = SystemClock.elapsedRealtime()
        request(config.statusUrl, JSONObject().put("lat", JSONObject.NULL)
            .put("lng", JSONObject.NULL).put("liveLocationEnabled", true)) { json ->
            if (json == null || !TrackingPolicy.eligible(json, config.rideId)) {
                stop(TrackingReason.INELIGIBLE)
            } else {
                verifiedAt = SystemClock.elapsedRealtime()
                verified()
            }
        }
    }

    private fun upload() {
        val fix = pending.take(SystemClock.elapsedRealtime()) ?: return
        val point = fix.value
        if (lastSent?.distanceTo(point)?.let { it < 15 } == true) return
        lastUpload = SystemClock.elapsedRealtime()
        request(config.uploadUrl, JSONObject().put("lat", point.latitude).put("lon", point.longitude),
            onFailure = { pending.retry(fix) }) {
            lastSent = point
            TrackingSession.lastUploadedTimestamp = point.time
            TrackingSession.publish(TrackingReason.NONE)
        }
    }

    private fun request(url: String, body: JSONObject, onFailure: () -> Unit = {}, success: (JSONObject?) -> Unit) {
        busy = true
        val requestToken = config.token
        http.post(url, requestToken, body) { code, json, retryAfter ->
            if (!active || TrackingSession.config !== config) return@post
            busy = false
            when {
                code in 200..299 -> { backoff = 5000; retryAt = 0; success(json) }
                code == 401 && config.token != requestToken -> { onFailure(); lastCheck = 0 }
                code == 401 || code == 403 -> stop(TrackingReason.AUTH)
                code in 400..499 && code != 429 -> stop(TrackingReason.INELIGIBLE)
                else -> {
                    onFailure()
                    retryAt = SystemClock.elapsedRealtime() + maxOf(retryAfter, backoff + Random.nextLong(1000))
                    backoff = (backoff * 2).coerceAtMost(120_000)
                    TrackingSession.publish(TrackingReason.OFFLINE)
                }
            }
        }
    }

    fun close() {
        active = false
        pending.clear()
        lastSent = null
        TrackingSession.main.removeCallbacks(tick)
        http.cancel()
    }
}
