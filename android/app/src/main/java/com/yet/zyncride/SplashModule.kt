package com.yet.zyncride

import android.content.Context
import androidx.appcompat.app.AppCompatDelegate
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.UiThreadUtil
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = SplashModule.NAME)
class SplashModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "NativeSplash"
    }

    override fun getName(): String = NAME

    @ReactMethod
    fun hide(fade: Boolean, promise: Promise) {
        UiThreadUtil.runOnUiThread {
            val activity = reactContext.currentActivity
            if (activity is MainActivity) {
                activity.hideSplash(fade) {
                    promise.resolve(true)
                }
            } else {
                promise.resolve(false)
            }
        }
    }

    @ReactMethod
    fun setTheme(themeMode: String) {
        val prefs = reactContext.getSharedPreferences("ThemePrefs", Context.MODE_PRIVATE)
        prefs.edit().putString("themeMode", themeMode).apply()

        UiThreadUtil.runOnUiThread {
            when (themeMode) {
                "light" -> AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
                "dark" -> AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
                else -> AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM)
            }
        }
    }
}
