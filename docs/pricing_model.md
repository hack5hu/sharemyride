# ShareMyRide — Dynamic Pricing Engine & Pitch Guide
**Version 1.0 • Indian Carpool & Rideshare Economic Model**

---

## 1. Executive Summary & Vision

ShareMyRide is designed to bridge the gap between **daily urban office commuters** and **long-distance highway travelers** in India.

### The Problem
* **Solo Driving Cost**: Fuel prices in Indian metros hover around ₹95–₹105/litre. A 30 km daily commute costs a car owner ₹250–₹350/day in petrol/CNG, plus maintenance, parking, and toll.
* **Cab & Auto Exploitation**: Cabs (Uber/Ola) and Auto-rickshaws charge surge prices during peak hours (₹300–₹500 for 20 km), while public transit is congested and time-consuming.
* **Commercial Compliance**: Indian Motor Vehicle Regulations mandate that personal carpool platforms must operate on a **strict cost-recovery basis**, not commercial profit-making.

### Our Solution
A dual-mode, **zero-friction smart pricing engine** that:
1. **Automatically detects** whether a ride is **Intracity (City Commute $\le$ 50 km)** or **Intercity (Highway $> 50$ km)** based on road distance.
2. Applies **3-band cumulative pricing** for city commutes with fair fuel cost sharing.
3. Gives drivers **$\pm 25\%$ bounded flexibility** so they feel in control without price-gouging passengers.
4. Delivers unbeatable economics: passengers ride in air-conditioned comfort for **half the cost of an auto-rickshaw**, while car owners recover **100% of fuel and toll expenses**.

---

## 2. Core Architecture: Intelligent Auto-Detection

Instead of forcing users to navigate complex menus or decide "Is this city or intercity?", our routing engine automatically classifies every ride upon route selection:

```
                  ┌───────────────────────────────┐
                  │ Driver Inputs Start & Dropoff │
                  └───────────────┬───────────────┘
                                  │ (Directions API)
                                  ▼
                     Road Distance Measured (km)
                                  │
                 ┌────────────────┴────────────────┐
                 │                                 │
                 ▼                                 ▼
         Distance ≤ 50 km                  Distance > 50 km
      ┌─────────────────────┐           ┌─────────────────────┐
      │   CITY COMMUTE      │           │  INTERCITY HIGHWAY  │
      │  (RideType.LOCAL)   │           │ (RideType.INTERCITY)│
      ├─────────────────────┤           ├─────────────────────┤
      │ • 3-Band Cumulative │           │ • Flat ₹2.25/km     │
      │ • ₹5 step increment │           │ • ₹10 step increment│
      │ • No Middle Stops   │           │ • Multi-stop legs   │
      │ • Front Prem. (₹5)  │           │ • Front Prem. (₹10) │
      │ • ₹50 Base (≤ 10 km)│           │ • ₹50 Minimum Floor │
      └─────────────────────┘           └─────────────────────┘
```

---

## 3. Intracity (City Commute $\le$ 50 km) Pricing Model

City commuting incurs high fuel consumption due to stop-and-go traffic, traffic signals, lower gears, and air conditioning. Therefore, rates are structured in **cumulative distance bands**:

### Three-Band Cumulative Formula

| Distance Band | Rate per km per seat | Rationalization |
|---|:---:|---|
| **Band 1: First 10 km** | **₹50 Flat Base Fare** | Minimum driver activation threshold. Any trip up to 10 km (e.g. 4 km, 7 km, 10 km) defaults to ₹50. |
| **Band 2: Next 15 km (10 to 25 km)** | **₹4.50 / km** | Typical intra-city arterial transit (e.g., Ring Road, Outer Ring Road). |
| **Band 3: Beyond 25 km (25 to 50 km)** | **₹2.50 / km** | Extended metropolitan transit (e.g., Noida Expressway, Elevated tollways). |

* **Base Minimum Floor**: **₹50** (Applies for all trips up to 10 km; driver can adjust between ₹40 and ₹65).
* **Step Increment**: Rounded to nearest **₹5**.
* **Driver Flexibility Range**: **$\pm 25\%$** ($-25\%$ Min Bound, $+25\%$ Max Bound).

### Milestone Fare Table

| Road Distance | Exact Formula | Recommended (MID) | Min Allowed ($-25\%$) | Max Allowed ($+25\%$) | Typical Metro Route Example |
|---|---|:---:|:---:|:---:|---|
| **$\le$ 10 km (e.g. 5, 7, 10 km)** | Flat Base Floor | **₹50** | **₹40** | **₹65** | Indiranagar $\leftrightarrow$ Koramangala / CP $\leftrightarrow$ Hauz Khas |
| **15 km** | $50 + (5 \times 4.5) = 72.5$ | **₹75** | **₹55** | **₹95** | Noida Sec 18 $\leftrightarrow$ South Extension |
| **20 km** | $50 + (10 \times 4.5) = 95$ | **₹95** | **₹70** | **₹120** | Borivali $\leftrightarrow$ BKC / Electronic City $\leftrightarrow$ Bellandur |
| **25 km** | $50 + (15 \times 4.5) = 117.5$ | **₹120** | **₹90** | **₹150** | Ghaziabad $\leftrightarrow$ Connaught Place |
| **30 km** | $117.5 + (5 \times 2.5) = 130$ | **₹130** | **₹100** | **₹165** | Connaught Place $\leftrightarrow$ Cyber Hub Gurgaon |
| **40 km** | $117.5 + (15 \times 2.5) = 155$ | **₹155** | **₹115** | **₹195** | Thane $\leftrightarrow$ Colaba / Whitefield $\leftrightarrow$ Kengeri |
| **50 km** | $117.5 + (25 \times 2.5) = 180$ | **₹180** | **₹135** | **₹225** | Noida Sec 62 $\leftrightarrow$ Manesar / Greater Noida $\leftrightarrow$ CP |

### Front Seat Premium (City Commute)
* Commuters who desire front-seat exclusivity or extra legroom can book the front seat.
* **Capped at 10%** above base fare.
* **Rounded to the nearest ₹5** (e.g. ₹50 base $\rightarrow$ 10% = ₹5 $\rightarrow$ total ₹55; ₹130 base $\rightarrow$ 10% = ₹13 $\rightarrow$ rounded to ₹15 $\rightarrow$ total ₹145; ₹180 base $\rightarrow$ 10% = ₹18 $\rightarrow$ rounded to ₹20 $\rightarrow$ total ₹200).
* Incremented and decremented in **₹5 steps** in the driver UI.

---

## 4. Intercity (Highway $> 50$ km) Pricing Model

Longer highway trips benefit from open expressways, constant high cruising speed, and significantly better fuel efficiency (18–22 km/l).

* **Recommended Base Rate**: **₹2.25 / km per seat**
* **Minimum Allowed Rate**: **₹1.80 / km per seat**
* **Maximum Allowed Rate**: **₹2.80 / km per seat**
* **Minimum Journey Fare**: **₹50**
* **Step Increment**: Rounded to nearest **₹10**
* **Multi-stop Fare Allocation**: Fares for intermediate boarding/alighting stops are allocated proportionally to exact leg distances, ensuring the sum of individual legs **always equals the total journey price exactly**.

### Front Seat Premium (Intercity Highway)
* Drivers can offer front seat selection for highway riders wanting extra legroom or single co-passenger comfort.
* **Capped at 10%** above base fare.
* **Rounded to the nearest ₹10** (e.g. ₹310 base $\rightarrow$ 10% = ₹31 $\rightarrow$ rounded to ₹30 $\rightarrow$ total ₹340).
* Incremented and decremented in **₹10 steps** in the driver UI.
* Transparently allocated across intermediate journey segments.

---

## 5. Vehicle Type Multiplier

| Seater Category | Multiplier | Rationale |
|---|:---:|---|
| **Standard Hatchback / Sedan (5-Seater)** | **1.0x** | Baseline pricing (Swift, i20, Dzire, City, Baleno). |
| **Premium / Large MPV / SUV (7-Seater)** | **1.1x** | Higher vehicle depreciation, extra luggage capacity, spacious cabin (Innova, Ertiga, XUV700, Safari). |

---

## 6. Competitive Comparison: Value Proposition

| Metric | **ShareMyRide** | **sRide / Quick Ride** | **Uber / Ola Cab** | **Auto-Rickshaw** |
|---|:---:|:---:|:---:|:---:|
| **10 km Fare** | **₹40 – ₹50** | ₹60 – ₹70 | ₹180 – ₹240 | ₹120 – ₹160 |
| **30 km Fare** | **₹130 – ₹150** | ₹140 – ₹160 | ₹450 – ₹650 | ₹350 – ₹450 |
| **50 km Fare** | **₹180 – ₹220** | ₹200 – ₹240 | ₹750 – ₹1,100 | N/A (Refuses) |
| **AC Comfort** | Full AC | Full AC | Variable AC | No AC / Dust & Heat |
| **Surge Pricing** | **Zero Surge** | Dynamic Points | Up to 2.5x Surge | Informal Overcharging |
| **Driver Fuel Recovery** | **100% covered** (with 2 seats) | Partial Points | High platform cut (25-30%) | Gas costs |

---

## 7. Pitch Points for Investors, Partners & Commuters

1. **For Daily Commuters**:
   * "Ride in an AC car every single day for less than half the price of an auto-rickshaw."
   * Verified professionals from corporate hubs (Cyber City, BKC, Manyata, Hitec City).
2. **For Car Owners (Drivers)**:
   * "Cut your monthly fuel bills to zero without driving commercial shifts."
   * Pick up 2 verified co-commuters on your existing daily office route and recover ₹6,000–₹10,000 per month.
3. **For Cities & Environment**:
   * Fewer cars on Delhi-Gurgaon Expressway, Western Express Highway, and Outer Ring Road.
   * Every full carpool car eliminates 3 personal vehicles from peak-hour traffic jams.
