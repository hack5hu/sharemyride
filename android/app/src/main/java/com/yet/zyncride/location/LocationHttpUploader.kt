package com.yet.zyncride.location

import java.io.IOException
import java.util.concurrent.TimeUnit
import okhttp3.Call
import okhttp3.Callback
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import org.json.JSONObject

// Dedicated native background transport; JS domain services continue to use Axios.
class LocationHttpUploader {
    private val client = OkHttpClient.Builder().callTimeout(15, TimeUnit.SECONDS)
        .retryOnConnectionFailure(false).followRedirects(false).build()

    fun post(url: String, token: String, body: JSONObject, done: (Int, JSONObject?, Long) -> Unit) {
        val request = Request.Builder().url(url).header("Authorization", "Bearer $token")
            .post(body.toString().toRequestBody("application/json".toMediaType())).build()
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                TrackingSession.main.post { done(0, null, 0) }
            }
            override fun onResponse(call: Call, response: Response) {
                response.use {
                    val json = try { JSONObject(it.body?.string() ?: "{}") } catch (_: Exception) { null }
                    val retry = it.header("Retry-After")?.toLongOrNull()?.coerceIn(0, 120)?.times(1000) ?: 0
                    val code = it.code
                    TrackingSession.main.post { done(code, json, retry) }
                }
            }
        })
    }

    fun cancel() { client.dispatcher.cancelAll() }
}
