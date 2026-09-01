package com.yet.zyncride

import android.app.Application
import android.content.Context
import androidx.appcompat.app.AppCompatDelegate
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.stallion.Stallion

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList = PackageList(this).packages.apply {
        add(SplashPackage())
      },
      jsBundleFilePath = Stallion.getJSBundleFile(applicationContext)
    )
  }

  override fun onCreate() {
    super.onCreate()
    val prefs = getSharedPreferences("ThemePrefs", Context.MODE_PRIVATE)
    val themeMode = prefs.getString("themeMode", "light")
    when (themeMode) {
      "light" -> AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
      "dark" -> AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
      else -> AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM)
    }
    loadReactNative(this)
  }
}
