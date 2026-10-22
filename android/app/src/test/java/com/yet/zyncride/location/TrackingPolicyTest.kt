package com.yet.zyncride.location

import org.junit.Assert.assertFalse
import org.junit.Assert.assertTrue
import org.junit.Test

class TrackingPolicyTest {
    @Test fun upcomingDriverAndPassengerRidesAreEligible() {
        assertTrue(TrackingPolicy.eligibleFields(true, "123", "123", "SCHEDULED", "DRIVER"))
        assertTrue(TrackingPolicy.eligibleFields(true, "123", "123", "CREATED", "DRIVER"))
        assertTrue(TrackingPolicy.eligibleFields(true, "123", "123", "SCHEDULED", "PASSENGER"))
    }

    @Test fun missingRoleAndTerminalRideAreRejected() {
        assertFalse(TrackingPolicy.eligibleFields(true, "123", "123", "SCHEDULED", ""))
        assertFalse(TrackingPolicy.eligibleFields(true, "123", "123", "COMPLETED", "DRIVER"))
    }
}
