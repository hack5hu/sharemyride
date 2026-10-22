package com.yet.zyncride.location

/** A bounded, session-owned memory buffer; retries never overwrite a newer fix. */
class LatestFixBuffer<T>(private val maxAgeMs: Long) {
    data class Fix<T>(val value: T, val capturedAt: Long)
    private var pending: Fix<T>? = null

    fun offer(value: T, capturedAt: Long) {
        if (pending == null || capturedAt > pending!!.capturedAt) pending = Fix(value, capturedAt)
    }
    fun take(now: Long): Fix<T>? {
        val fix = pending
        pending = null
        return fix?.takeIf { now - it.capturedAt in 0..maxAgeMs }
    }
    fun retry(fix: Fix<T>) { offer(fix.value, fix.capturedAt) }
    fun clear() { pending = null }
}
