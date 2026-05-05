---
title: Auto Flight Protections
description: A320 Auto Flight Protections Presentation
---

One aspect of the FMGS is the assistance provided to the pilot to
keep the flight safe and within the flight envelope.

This assistance covers:
- The engine failure compensation
- The low speed protections
- The AP/FD mode reversions.

Let's look at some of these "protections" in detail.

---

In case of an engine failure with AP ON, the FMGC ensures an automatic yaw compensation in all modes.

This is achieved by the FAC, using the yaw damper at take off and go-around and the automatic rudder trim in all modes.

Furthermore, the AP/FD SRS pitch mode automatically adjusts the reference target guidance speed in case of an engine failure at take off or go-around.

![alt text](image-319.png)

---

Low speed protection is achieved by the following features:
- The A/THR SPEED mode
- The LOW ENERGY warning
- The ALPHA FLOOR protection
- The WINDSHEAR protection.

When the A/THR is ON and in SPEED mode:
- If the speed target is SELECTED (by the pilot on the FCU) and the speed target is below VLS, the A/THR will not allow the speed to decrease below VLS.

![alt text](image-320.png)

If, for any reason such as turbulence, shear, A/THR OFF ... the airspeed drops significantly below VLS, an aural warning "SPEED SPEED SPEED" is automatically triggered by the FAC, and is repeated every five seconds.

It drives pilot's eyes to the speed scale, so as to manually increase the thrust and in order to regain a positive flight path angle through the pitch control. An energy level is computed by the FAC, taking into account the horizontal deceleration rate and the current flight path angle. This explains the "LOW ENERGY" wording. This warning is triggered in deceleration phase, between 100 ft and 2000 ft RA and in configuration 2, 3 or FULL and just before alpha floor detection.

Note: The LOW ENERGY warning is inhibited in case of GPWS alert or in ALTERNATE law or in DIRECT law or if both radio altimeters fail.

![alt text](image-321.png)

If the airspeed continues to drop (below the low energy warning) and the Angle Of Attack increases above a given threshold, the "ALPHA FLOOR" function of the A/THR is triggered. This inhibits also the LOW ENERGY warning.

The A/THR commands full thrust, i.e .: TOGA thrust.

![alt text](image-322.png)

![alt text](image-323.png)

The Angle Of Attack threshold, which triggers the "ALPHA FLOOR" protection, is processed by the FAC as a function of aircraft parameters such as configuration, deceleration rate ...

When ALPHA FLOOR is triggered:
- A/THR is turned ON (if it was previously OFF), indicated by a white A/THR on the FMA
- A. FLOOR in green is displayed as the A/THR mode
- The ALPHA FLOOR function is available from lift off down to 100 ft RA.

![alt text](image-324.png)

Note:
The ALPHA FLOOR protection is lost:
- In case of combinations of failures, or
- At least one thrust lever instinctive disconnect pb, is pressed for more than 15 seconds.

The ALPHA FLOOR protection is also lost:
- In case of engine-out, when slats/flaps are extended, or
- In alternate law or in direct law.

![alt text](image-325.png)

When exiting the A.FLOOR conditions, the A/THR mode reverts to TOGA LK mode, which indicates that TOGA thrust is locked regardless of thrust lever position.

To regain thrust control, you have to switch off the A/THR. You now have manual control of the thrust. You may re-engage the A/THR when convenient.

![alt text](image-326.png)

If the aircraft encounters windshear conditions, detected by the FAC, a red WINDSHEAR message is triggered for a minimum of 15 seconds on both PFDs, associated with an aural "WINDSHEAR WINDSHEAR WINDSHEAR" warning.

This reactive windshear warning is available from 3 seconds after lift off up to 1300 ft at take off and from 1300 ft down to 50 ft during landing, and with at least CONF 1 selected.

![alt text](image-327.png)

The FMGC provides the following protections against windshear:
- At take off and go-around, with the AP/FD SRS vertical mode, which commands a pitch ensuring a minimum positive rate of climb, despite a potential speed drop
- In approach with the GS mini function: the managed speed target in approach is automatically adjusted with wind variations, so as to ensure that the aircraft ground speed does not drop below a minimum value.

Note: if the Angle Of Attack gets too high and reaches the fly by wire Angle Of Attack protection, the AP disengages. The fly by wire maximum Angle Of Attack protection assists the pilot to best react.

![alt text](image-328.png)

---

Let's now review the mode reversions of AP/FD and A/THR.

The mode reversions are automatic mode changes which:
- Allow a comprehensive auto flight system behavior when the pilot modifies a target on the FCU
- Happen in case of loss of NAV mode
- Ensure a flight envelope limit speed protection.

Let's review the reversion due to FCU altitude changes, AP is on.

Suppose we are in climb (using either OP CLB or CLB) to FL 250 as cleared by ATC. While crossing FL 225, ATC requires us to level off at FL 220 ...

![alt text](image-329.png)

We therefore select the FCU target altitude to FL 220. The AP/FD vertical mode reverts to V/S on the current V/S value.

Notice also that ALT (blue) is not armed.

![alt text](image-330.png)

![alt text](image-331.png)

![alt text](image-332.png)

It is then up to the pilot to decide how to regain FL 220:
- By dialing the desired V/S target (i.e. down to -1000 ft), or
- By pulling the ALT sel to engage OP DES ...

Note: you can imagine the same scenario in descent.

![alt text](image-333.png)

![alt text](image-334.png)

Let's see another case ...

We are now capturing the target altitude (ALT* green). The ATC clears us back, up to FL 250 ...

![alt text](image-335.png)

We therefore select the FCU ALT target to FL 250.

The AP/FD vertical mode reverts, once again, to V/S, with the current V/S value.

![alt text](image-336.png)

It is now up to the pilot to decide how to regain ALT target:
- By pulling the ALT sel to engage OP CLB, or
- By dialing the desired V/S target (i.e. up to +1500 ft) ...

![alt text](image-337.png)

![alt text](image-338.png)

---

These are the essential mode reversions linked to FCU target changes which you may have to make in case of ATC late clearances.

They ensure no discontinuity in aircraft behavior and leave you full authority to satisfy these clearances.

![alt text](image-339.png)

---

Let's review the reversion mode due to the loss of NAV mode.

Suppose we are in climb using CLB to FL 150 as cleared by ATC. While reaching FL 90, ATC requires us to turn to heading 340 ...

![alt text](image-340.png)

We therefore select the FCU target heading to 340.

The AP/FD vertical mode reverts from CLB to OP CLB as the lateral mode NAV is replaced by HDG. The aircraft pitch behavior is unchanged.

Note: if an altitude constraint was targeted with CLB mode, it reverts to the FCU selected altitude when OP CLB mode engages.

![alt text](image-341.png)

![alt text](image-342.png)

---

We have seen the loss of NAV mode in CLB.

On the right side of the screen, you can review a similar scenario in descent. When HDG mode is engaged which causes the loss of NAV mode, DES mode reverts to V/S mode with the current V/S speed value and SPEED mode engages on A/THR.

The aircraft pitch behavior is unchanged.

Note: the loss of NAV mode may be caused by a F-PLN discontinuity.

![alt text](image-343.png)

---

We will now study the mode reversion when the FD orders are not followed (manual flight).

Suppose the aircraft is manually flown with FD ON (AP OFF). The current vertical mode is OP DES and the A/THR mode is THR IDLE.

In order to demonstrate the next reversion, the aircraft is pitched up, disregarding the FD orders given by the FD bars. The speed decreases ...

![alt text](image-344.png)

![alt text](image-345.png)

Both FDs disengage when the airspeed reaches VLS-2kt. But if speedbrakes are extended, the FDs disengage between VLS-2kt and VLS-19kt depending on the speedbrakes position. The A/THR, if active, reverts from THR IDLE to SPEED and the thrust is readjusted to recapture the target speed.

![alt text](image-346.png)

![alt text](image-347.png)

Let us see another case. This time we are in climb with THR CLB/OP CLB modes engaged.

For any reason, we do not hand fly the FD pitch bar and we pitch the aircraft down. The speed increases ...

![alt text](image-348.png)

Both FDs disengage when the airspeed reaches VMAX+4kt. The A/THR, if active, reverts to SPEED and the thrust is reduced to recapture the target speed.

Note: depending on the aircraft configuration, VMAX can be VMO, VLE or VFE.

![alt text](image-349.png)

![alt text](image-350.png)

![alt text](image-351.png)

---

The flight envelope limit speed protection (with FD ON, AP OFF), is done by AP or A/THR mode reversion so that:
- At minimum speed or at maximum speed, the FD bars are removed, therefore the A/THR reverts to SPEED A/THR mode in order to regain target speed.

![alt text](image-352.png)

***Module completed***


## Video study

- Watch the video available on [YouTube](https://www.youtube.com/watch?v=cUNj9yMqAKs&list=PLKEybvo562LtwmnZOjo8jN7J75vXGqMzq&index=16)