package com.yet.zyncride.location

import android.app.Service
import android.content.Intent
import android.content.pm.ServiceInfo
import android.location.LocationManager
import android.os.Build
import android.os.IBinder
import android.os.Looper
import androidx.core.location.LocationManagerCompat
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.google.android.gms.location.Priority

class LiveLocationForegroundService : Service() {
    companion object { var instance: LiveLocationForegroundService? = null; private set }
    private val fused by lazy { LocationServices.getFusedLocationProviderClient(this) }
    private var callback: LocationCallback? = null
    private var transport: TrackingTransport? = null
    private var notification: TrackingNotification? = null
    private var stopped = false
    private var starting = false
    private val healthCheck = object : Runnable {
        override fun run() {
            if (stopped) return
            val manager = getSystemService(LOCATION_SERVICE) as LocationManager
            if (!LocationManagerCompat.isLocationEnabled(manager)) {
                stop(TrackingReason.LOCATION_DISABLED)
                return
            }
            if (checkSelfPermission(android.Manifest.permission.ACCESS_FINE_LOCATION) !=
                android.content.pm.PackageManager.PERMISSION_GRANTED) {
                stop(TrackingReason.PERMISSION)
                return
            }
            val last = TrackingSession.lastLocation
            val stale = last == null || (android.os.SystemClock.elapsedRealtimeNanos() - last.elapsedRealtimeNanos) / 1_000_000 > 30_000
            if (stale && TrackingSession.reason == TrackingReason.NONE) TrackingSession.publish(TrackingReason.WAITING)
            notification?.update(TrackingSession.reason)
            TrackingSession.main.postDelayed(this, 10_000)
        }
    }

    override fun onCreate() { super.onCreate(); instance = this }
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        if (intent?.action == TrackingNotification.STOP) { stop(TrackingReason.USER); return START_NOT_STICKY }
        val config = TrackingSession.config
        if (config == null) { stopSelf(); return START_NOT_STICKY }
        if (starting || callback != null) return START_NOT_STICKY
        starting = true
        notification = TrackingNotification(this, config.language).also { it.createChannel() }
        try {
            val item = notification!!.build(TrackingReason.WAITING)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) startForeground(TrackingNotification.ID, item, ServiceInfo.FOREGROUND_SERVICE_TYPE_LOCATION)
            else startForeground(TrackingNotification.ID, item)
            transport = TrackingTransport(config, ::stop) { beginCollection(config) }.also { it.start() }
            healthCheck.run()
        } catch (_: SecurityException) { stop(TrackingReason.PERMISSION) }
        catch (_: Exception) { stop(TrackingReason.UNAVAILABLE) }
        return START_NOT_STICKY
    }

    private fun beginCollection(config: TrackingConfig) {
        if (stopped || callback != null || TrackingSession.config !== config) return
        try {
            val request = LocationRequest.Builder(Priority.PRIORITY_HIGH_ACCURACY, 10_000)
                .setMinUpdateIntervalMillis(5_000).setMinUpdateDistanceMeters(15f)
                .setMaxUpdateAgeMillis(0).build()
            callback = object : LocationCallback() {
                override fun onLocationResult(result: LocationResult) {
                    if (stopped || TrackingSession.config !== config) return
                    val point = result.lastLocation ?: return
                    if (!TrackingPolicy.acceptable(point, TrackingSession.lastLocation)) return
                    TrackingSession.lastLocation = point
                    transport?.offer(point)
                }
            }
            fused.requestLocationUpdates(request, callback!!, Looper.getMainLooper())
                .addOnSuccessListener {
                    if (stopped || TrackingSession.config !== config) return@addOnSuccessListener
                    TrackingSession.running = true
                    TrackingSession.publish(TrackingReason.WAITING)
                    TrackingSession.completion?.invoke(true)
                    TrackingSession.completion = null
                }.addOnFailureListener { if (!stopped) stop(TrackingReason.UNAVAILABLE) }
        } catch (_: SecurityException) { stop(TrackingReason.PERMISSION) }
        catch (_: Exception) { stop(TrackingReason.UNAVAILABLE) }
    }

    fun stop(reason: TrackingReason) {
        if (stopped) return
        stopped = true
        TrackingSession.main.removeCallbacks(healthCheck)
        callback?.let { fused.removeLocationUpdates(it) }
        callback = null
        transport?.close()
        transport = null
        TrackingSession.stopped(reason)
        stopForeground(STOP_FOREGROUND_REMOVE)
        stopSelf()
    }
    override fun onDestroy() {
        stop(TrackingReason.UNAVAILABLE)
        if (instance === this) instance = null
        super.onDestroy()
    }
    override fun onBind(intent: Intent?): IBinder? = null
}
