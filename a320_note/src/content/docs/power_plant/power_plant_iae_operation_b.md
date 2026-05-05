---
title: Power Plant(IAE) Operation(B)
description: A320 Power Plant(IAE) Operation(B)
---

In this module, we will see how to operate the engines during the various phases of a flight, and familiarize you with their functions and indications.

![alt text](image-64.png)

On ground, thrust control is entirely conventional.

The thrust lever position determines the thrust.

![alt text](image-65.png)

The thrust levers can be moved manually over the entire quadrant.

They never move automatically.

![alt text](image-66.png)

There are six positions:
- IDLE
- CL for maximum CLimb thrust
- FLEX/MCT one detent serving two functions:
    - FLEX is used for reduced thrust at takeoff
    - MCT, for Maximum Continuous Thrust, is used for single engine operations.
- TOGA for maximum TakeOff or Go Around thrust
- IDLE REV for IDLE thrust when REVerse selected
- MAX REV for MAXimum REVerse thrust.

Note: Only five positions have a detent or stop, IDLE REV does not have one.

![alt text](image-67.png)

Thrust control can be achieved in two ways:
- Manually, using the thrust levers, as in a conventional aircraft
- Automatically, when the auto thrust is active.

![alt text](image-68.png)

On ground, the thrust limit mode is TOGA or FLEX .

The selected mode is displayed in the upper right-hand corner of the E/WD.

TOGA represents the maximum thrust available from the engine for the actual Outside Air Temperature (OAT).

The EPR rating limit displayed alongside the selected mode, indicates the related EPR value.

![alt text](image-69.png)

FLEX is used for a reduced take off thrust. To achieve the thrust reduction an assumed temperature (or FLEX) is used, for example 45 degrees Celsius. The FLEX temperature is displayed beside the EPR rating limit.

The FLEX mode, with its rating limit and temperature, is displayed as soon as the flight crew has entered a flex takeoff temperature in the MCDU PERF T.O. page.

Note: The format of the FLEX temperature entry will depend on the FMS version, as shown.

FLEX take off will be discussed in more detail during the performance part of the course.

![alt text](image-70.png)

Today we will carry out a reduced thrust FLEX take off as this is what you will do normally.

PF progressively adjusts engine thrust in two steps. The first step is to move the levers from idle to approximately 1.05 EPR.

![alt text](image-71.png)

When 1.05 EPR is reached, FLEX takeoff thrust is applied on both engines by moving the thrust levers to the FLEX detent.

Note: During takeoff and landing phases, ignition is automatically supplied.

![alt text](image-72.png)

![alt text](image-73.png)

When in FLEX detent and before reaching 80 knots, PNF checks that the indicated EPR is the same as the EPR limit.

The FADECs will maintain takeoff thrust and monitor for overspeed and temperature during the takeoff.

Note: TOGA thrust is always available by moving the thrust levers to the TOGA detent.

![alt text](image-74.png)

At thrust reduction altitude, move the thrust levers to the CLB detent when a flashing LVR CLB appears on the Flight Mode Annunciator (FMA).

![alt text](image-75.png)

When the levers are in CL detent, A/THR is automatically engaged, the thrust limit mode changes to CL with its related EPR rating limit.

![alt text](image-76.png)

Note: At 1500 ft above ground level (and when not in T.O power and with S/F retracted), on the ECAM SD, the ENGINE page is replaced by the CRUISE page.

Also, the IGNITION memo is removed, when CL mode is activated.

![alt text](image-77.png)

The CRUISE page displays:
- The fuel used for each engine and the total fuel used
- The oil quantity for each engine
- The vibration rate for N1 and N2 of each engine.

![alt text](image-78.png)

When the aircraft levels off, the A/THR commands a thrust reduction. So, watch the EPR indicators.

Four command arcs are displayed in green, joining the current EPR needle to the EPR command needle. In addition a green triangle next to the EPR command needle shows the EPR tendency, accelerating or decelerating.

It disappears when the current EPR needle reaches the EPR command needle.

Note: They are only displayed with A/THR engaged.

![alt text](image-79.png)

![alt text](image-80.png)

![alt text](image-81.png)

![alt text](image-82.png)

Let's see it closer one more time.

![alt text](image-83.png)

![alt text](image-84.png)

![alt text](image-85.png)

![alt text](image-86.png)

When both engines are at idle, an IDLE indication appears, on the E/WD. It flashes for 10 seconds and then remains at steady green.

![alt text](image-87.png)

The commanded idle will be a modulated idle, taking into account the bleed demand, and is selected:
- In flight, as long as the FLAPS lever is in 0 position, or
- On ground, provided reverse is not selected.

Note: For approach, when the FLAPS lever is not at 0 position, an higher idle will be selected, taking into account the altitude and not the bleed demand. This allows the engines to accelerate rapidly from idle to max thrust.

![alt text](image-88.png)

![alt text](image-89.png)

If needed to maintain engine combustion, continuous ignition can be selected:
- Manually, by turning the mode selector to the IGN/START position

![alt text](image-90.png)

![alt text](image-91.png)

- Automatically, when, for example, the engine ANTI ICE is on, (for more cases refer to your documentation).

Each time it is manually or automatically selected, a memo message IGNITION is displayed on the E/WD.

Note: Even if the use of continuous ignition is not time limited, it is recommended to turn off when it is not needed, in order to conserve the life of the igniters.

![alt text](image-92.png)

As long as the A/THR is active in climb, in cruise and in descent, the thrust levers remain in the CL detent.

![alt text](image-93.png)

During landing, the thrust levers must be moved to idle detent.

If the pilot does not move the thrust levers to idle detent, an auto callout "RETARD" is generated:
- At 20 ft RA, in manual landing, or
- At 10 ft RA, in automatic landing.

Idle detent allows the disconnection of the A/THR. Also, the armed ground spoilers are commanded to extend and the thrust levers can be moved to idle reverse position.

Note: The reverse idle is slightly higher than forward idle thrust.

![alt text](image-94.png)

After the main landing gears have touched down, the MAX REV must be immediately selected. This will help the deceleration of the aircraft.

![alt text](image-95.png)

On the EPR indicators, REV appears in amber indicating that the reversers are unstowed or unlocked.

The thrust limit mode turns to MREV.

![alt text](image-96.png)

When the reversers are fully deployed, the REV indications change to green.

![alt text](image-97.png)

As the aircraft speed approaches 70 kts, the levers should be moved to REV IDLE.

![alt text](image-98.png)

Then, at taxi speed the reversers must be stowed by moving the thrust levers to forward idle position.

![alt text](image-99.png)

![alt text](image-100.png)

In order to extend the useful life of the engines, it is recommended to leave the engines running for 3 min after using maximum reverse thrust.

![alt text](image-101.png)

***Module completed***