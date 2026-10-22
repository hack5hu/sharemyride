package com.yet.zyncride.location

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.os.Build
import androidx.core.app.NotificationCompat
import com.yet.zyncride.MainActivity
import com.yet.zyncride.R
import java.util.Locale

class TrackingNotification(private val context: Context, language: String) {
    companion object {
        const val ID = 90210
        const val CHANNEL = "zyncride_live_location_channel"
        const val STOP = "com.yet.zyncride.location.STOP"
    }
    private val localized = context.createConfigurationContext(Configuration(context.resources.configuration).apply {
        setLocale(Locale.forLanguageTag(language))
    })
    private val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

    fun createChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            manager.createNotificationChannel(NotificationChannel(CHANNEL,
                localized.getString(R.string.tracking_channel), NotificationManager.IMPORTANCE_LOW).apply {
                setSound(null, null)
                enableVibration(false)
                setShowBadge(false)
            })
        }
    }

    fun build(reason: TrackingReason): Notification {
        val open = Intent(context, MainActivity::class.java).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP)
        val stop = Intent(context, LiveLocationForegroundService::class.java).setAction(STOP)
        val flags = PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE
        val body = when (reason) {
            TrackingReason.NONE -> R.string.tracking_active
            TrackingReason.OFFLINE -> R.string.tracking_offline
            else -> R.string.tracking_waiting
        }
        return NotificationCompat.Builder(context, CHANNEL)
            .setSmallIcon(R.drawable.ic_tracking_location)
            .setContentTitle(localized.getString(R.string.tracking_title))
            .setContentText(localized.getString(body)).setOngoing(true).setOnlyAlertOnce(true)
            .setContentIntent(PendingIntent.getActivity(context, 0, open, flags))
            .addAction(0, localized.getString(R.string.tracking_stop), PendingIntent.getService(context, 1, stop, flags))
            .build()
    }
    private var previousReason: TrackingReason? = null
    fun update(reason: TrackingReason) {
        if (reason == previousReason) return
        previousReason = reason
        manager.notify(ID, build(reason))
    }
}
