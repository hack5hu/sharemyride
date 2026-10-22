package com.yet.zyncride.location

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class LiveLocationPackage : BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? =
        if (name == LiveLocationModule.NAME) LiveLocationModule(reactContext) else null

    override fun getReactModuleInfoProvider() = ReactModuleInfoProvider {
        mapOf(LiveLocationModule.NAME to ReactModuleInfo(
            LiveLocationModule.NAME, LiveLocationModule::class.java.name,
            false, false, false, true
        ))
    }
}
