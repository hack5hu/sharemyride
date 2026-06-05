package com.sharemyride.truecaller

import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.truecaller.android.sdk.TrueException
import com.truecaller.android.sdk.TrueProfile
import com.truecaller.android.sdk.VerificationCallback
import com.truecaller.android.sdk.VerificationDataBundle
import com.truecaller.android.sdk.oAuth.TcOAuthCallback
import com.truecaller.android.sdk.oAuth.TcOAuthData
import com.truecaller.android.sdk.oAuth.TcOAuthError
import com.truecaller.android.sdk.oAuth.TcSdk
import com.truecaller.android.sdk.oAuth.TcSdkOptions

/**
 * Native bridge for Truecaller's NON-Truecaller user verification (OAuth SDK v3.x,
 * drop-call / IM-OTP flow). This is the path for users who do NOT have the
 * Truecaller app installed. Truecaller-app users keep going through the existing
 * OAuth flow (the @ajitpatel28/react-native-truecaller package).
 *
 * IMPORTANT constraints:
 *  - Android only. (Truecaller has no iOS equivalent for this flow.)
 *  - Indian numbers only (Truecaller limitation for OAuth SDK v3.0).
 *  - Needs READ_PHONE_STATE / READ_CALL_LOG / ANSWER_PHONE_CALLS (request at runtime
 *    from JS via PermissionsAndroid before calling requestVerification).
 *
 * Only the Truecaller `accessToken` is surfaced to JS; the backend validates it
 * server-side with Truecaller. No phone number is trusted from the client.
 *
 * JS API (NativeModules.TruecallerVerifyModule):
 *   requestVerification(countryCode, phoneNumber): Promise<void>
 *   verifyMissedCall(firstName, lastName): Promise<void>   // finalize drop-call
 *   verifyOtp(firstName, lastName, otp): Promise<void>     // finalize IM/SMS OTP
 *
 * Lifecycle results are delivered as "TruecallerVerification" device events:
 *   { type: 'missed_call_initiated', ttl, requestNonce }
 *   { type: 'missed_call_received' }
 *   { type: 'otp_initiated', ttl, requestNonce }
 *   { type: 'otp_received', otp }
 *   { type: 'verification_complete', accessToken }
 *   { type: 'verified_before', accessToken }
 *   { type: 'failure', code, message }
 */
class TruecallerVerifyModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  companion object {
    private const val EVENT_NAME = "TruecallerVerification"
  }

  private var sdkInitialized = false

  override fun getName(): String = "TruecallerVerifyModule"

  // --- Required so JS NativeEventEmitter doesn't warn on add/remove ---
  @ReactMethod
  fun addListener(eventName: String) { /* no-op */ }

  @ReactMethod
  fun removeListeners(count: Int) { /* no-op */ }

  private fun emit(map: WritableMap) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(EVENT_NAME, map)
  }

  private fun emitFailure(code: Int, message: String?) {
    val map = Arguments.createMap()
    map.putString("type", "failure")
    map.putInt("code", code)
    map.putString("message", message ?: "Unknown verification error")
    emit(map)
  }

  private val verificationCallback = object : VerificationCallback {
    override fun onRequestSuccess(callbackType: Int, bundle: VerificationDataBundle?) {
      val map = Arguments.createMap()
      when (callbackType) {
        VerificationCallback.TYPE_MISSED_CALL_INITIATED -> {
          map.putString("type", "missed_call_initiated")
          map.putString("ttl", bundle?.getString(VerificationDataBundle.KEY_TTL))
          map.putString("requestNonce", bundle?.getString(VerificationDataBundle.KEY_REQUEST_NONCE))
        }
        VerificationCallback.TYPE_MISSED_CALL_RECEIVED -> {
          map.putString("type", "missed_call_received")
        }
        VerificationCallback.TYPE_IM_OTP_INITIATED -> {
          map.putString("type", "otp_initiated")
          map.putString("ttl", bundle?.getString(VerificationDataBundle.KEY_TTL))
          map.putString("requestNonce", bundle?.getString(VerificationDataBundle.KEY_REQUEST_NONCE))
        }
        VerificationCallback.TYPE_IM_OTP_RECEIVED -> {
          map.putString("type", "otp_received")
          map.putString("otp", bundle?.getString(VerificationDataBundle.KEY_OTP))
        }
        VerificationCallback.TYPE_VERIFICATION_COMPLETE -> {
          map.putString("type", "verification_complete")
          map.putString("accessToken", bundle?.getString(VerificationDataBundle.KEY_ACCESS_TOKEN))
        }
        VerificationCallback.TYPE_PROFILE_VERIFIED_BEFORE -> {
          map.putString("type", "verified_before")
          map.putString("accessToken", bundle?.profile?.accessToken)
        }
        else -> {
          map.putString("type", "unknown")
          map.putInt("callbackType", callbackType)
        }
      }
      emit(map)
    }

    override fun onRequestFailure(callbackType: Int, e: TrueException) {
      emitFailure(e.exceptionType, e.exceptionMessage)
    }
  }

  /**
   * A minimal OAuth callback is required to initialize TcSdk. For non-Truecaller
   * users we only use requestVerification(), but the SDK still needs a callback.
   */
  private val oAuthCallback = object : TcOAuthCallback {
    override fun onSuccess(tcOAuthData: TcOAuthData) { /* handled by OAuth package path */ }
    override fun onFailure(tcOAuthError: TcOAuthError) { /* handled by OAuth package path */ }
    override fun onVerificationRequired(tcOAuthError: TcOAuthError?) {
      // Signals the user has no Truecaller app — JS reacts by calling
      // requestVerification(). Nothing to do here.
    }
  }

  /** Ensure a TcSdk instance exists, initialized with VERIFY_ALL_USERS. */
  private fun ensureSdk(activity: FragmentActivity): Boolean {
    return try {
      if (TcSdk.getInstance() != null) return true
      val options = TcSdkOptions.Builder(activity, oAuthCallback)
        .sdkOptions(TcSdkOptions.OPTION_VERIFY_ALL_USERS)
        .build()
      TcSdk.init(options)
      sdkInitialized = true
      true
    } catch (e: Exception) {
      // TcSdk may already be initialized by the OAuth package — that's fine.
      TcSdk.getInstance() != null
    }
  }

  @ReactMethod
  fun requestVerification(countryCode: String, phoneNumber: String, promise: Promise) {
    val activity = currentActivity
    if (activity == null || activity !is FragmentActivity) {
      promise.reject("NO_ACTIVITY", "No FragmentActivity available")
      return
    }
    activity.runOnUiThread {
      try {
        if (!ensureSdk(activity)) {
          promise.reject("SDK_INIT_FAILED", "Could not initialize Truecaller SDK")
          return@runOnUiThread
        }
        TcSdk.getInstance()
          .requestVerification(countryCode, phoneNumber, verificationCallback, activity)
        promise.resolve(null)
      } catch (e: RuntimeException) {
        // Thrown for invalid phone numbers, etc.
        promise.reject("REQUEST_VERIFICATION_FAILED", e.message ?: "requestVerification failed")
      }
    }
  }

  @ReactMethod
  fun verifyMissedCall(firstName: String, lastName: String, promise: Promise) {
    try {
      val profile = TrueProfile.Builder(firstName, lastName).build()
      TcSdk.getInstance().verifyMissedCall(profile, verificationCallback)
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject("VERIFY_MISSED_CALL_FAILED", e.message ?: "verifyMissedCall failed")
    }
  }

  @ReactMethod
  fun verifyOtp(firstName: String, lastName: String, otp: String, promise: Promise) {
    try {
      val profile = TrueProfile.Builder(firstName, lastName).build()
      TcSdk.getInstance().verifyOtp(profile, otp, verificationCallback)
      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject("VERIFY_OTP_FAILED", e.message ?: "verifyOtp failed")
    }
  }
}
