package com.yet.zyncride.location

import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class LatestFixBufferTest {
    @Test fun coalescesOfflineFixesToLatest() {
        val queue = LatestFixBuffer<String>(30_000)
        repeat(1000) { queue.offer("fix-$it", it.toLong()) }
        assertEquals("fix-999", queue.take(1000)?.value)
        assertNull(queue.take(1000))
    }
    @Test fun failedOldUploadDoesNotOverwriteANewerFix() {
        val queue = LatestFixBuffer<String>(30_000)
        queue.offer("old", 100)
        val inFlight = queue.take(100)!!
        queue.offer("new", 200)
        queue.retry(inFlight)
        assertEquals("new", queue.take(200)?.value)
    }
    @Test fun staleAndFutureFixesAreNeverUploaded() {
        val queue = LatestFixBuffer<String>(30_000)
        queue.offer("expired", 100)
        assertNull(queue.take(30_101))
        queue.offer("future", 50_000)
        assertNull(queue.take(100))
    }
    @Test fun stopPurgesPendingData() {
        val queue = LatestFixBuffer<String>(30_000)
        queue.offer("private", 100)
        queue.clear()
        assertNull(queue.take(100))
    }
}
