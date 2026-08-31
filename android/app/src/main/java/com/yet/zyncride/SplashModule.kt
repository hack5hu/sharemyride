package com.yet.zyncride

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.UiThreadUtil

class SplashModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "NativeSplash"

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
}
