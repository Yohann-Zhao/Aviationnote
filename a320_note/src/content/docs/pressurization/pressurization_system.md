---
title: Pressurization System Presentation
description: A320 Pressurization System Presentation
---

The pressurization system, on the A320, normally operates automatically to adjust the cabin altitude and its rate of change, to ensure maximum passenger comfort and safety.

The pressurized areas are:
- The cockpit
- The avionics bay
- The cabin
- The cargo compartments.

![alt text](image.png)

The concept of the system is simple. Air is supplied from the air conditioning packs to the pressurized areas.

![alt text](image-1.png)

An outflow valve is used to regulate the amount of air allowed to escape from the pressurized areas.

![alt text](image-2.png)

Automatic control of the outfow valve is provided by two Cabin Pressure Controllers (CPC). Each controller has an electric motor to move the outflow valve.

Note: the CPC receives data from the Air Data Inertial and Reference System (ADIRS). the Flght Management and Guidance Computer (FMGC), the Full Authority Digital Engine Control (FADEC) and the Landing Gear Control and Interface Unit (LGCIU) in order to elaborate the different pressurization control laws.

![alt text](image-3.png)

A controller/ motor combination is known as a system. Only one system will operate at any one time with the other system acting as backup.

![alt text](image-4.png)

A third motor is installed for use in the event of both automatic systems failing and requires a manual input to open or close the outflow valve.

![alt text](image-5.png)

Two independent pneumatic safety valves are installed at the rear pressure bulkhead, above the flotation line, and they operate to avoid a cabin differential pressure from going too high or too low.

![alt text](image-6.png)

Let us look at the operation of the outflow valve for an aircraft in cruise and what happens to cabin Differential Pressure, cabin altitude, and cabin Vertical Speed. We will start with cabin Differential Pressure. If the outflow valve is closed, or only allowing a small amount of air to escape, then the cabin Differential Pressure will increase.

![alt text](image-7.png)

![alt text](image-8.png)

Now let's look at what happens to cabin altitude.

If the outflow valve is closed, or only allowing a small amount of air to escape, then the cabin altitude will descend.

![alt text](image-9.png)

![alt text](image-10.png)

We can also see what the cabin is doing by reference to Vertical Speed. When the outflow valve closes the cabin altitude will decrease (negative Vertical Speed).

![alt text](image-11.png)

![alt text](image-12.png)

If the outflow valve is fully open, a lot of air is allowed to escape, the cabin pressure will decrease, the cabin altitude will climb (positive Vertical Speed).

![alt text](image-13.png)

![alt text](image-14.png)

The crew can monitor all cabin pressure functions on the ECAM CAB PRESS page.

![alt text](image-15.png)

Let's look at the information, related to the pressurization system, that is presented on the CAB PRESS page. The pack indication is displayed green when the related pack is on.

![alt text](image-16.png)

The outflow valve position can be monitored, and the system controller in use is shown.

![alt text](image-17.png)

There is a single indication for the safety valves. We will look at how this indication changes later in the module.

![alt text](image-18.png)

The cabin Differential Pressure, or ΔP, shows the difference, in psi, between the cabin pressure and external pressure. This differential pressure will be at zero on the ground and increase as the aircraft climbs.

![alt text](image-19.png)

![alt text](image-20.png)

The cabin Vertical Speed shows the rate of change, in Feet per minute, of cabin altitude.
For passenger comfort the pressurization system will aim to keep this rate of change as small as possible.

![alt text](image-21.png)

The cabin altitude is also shown.

![alt text](image-22.png)

The VENT, the INLET and the OUTLET indications are related to the avionics ventilation system and will be discussed later.

![alt text](image-23.png)

On the ECAM cruise page there are indications of:
- Cabin differential pressure
- Cabin vertical speed
- Cabin altitude.

![alt text](image-24.png)

There is also an indication of cabin Vertical Speed on the ECAM door page. Note that this indication is only displayed when the aircraft is airborne.

![alt text](image-25.png)

On the overhead panel there is a CABIN PRESS panel containing controls to operate the pressurization system. Under normal conditions no pilot action is required on this panel during flight.

![alt text](image-26.png)

The pressurization MODE SEL pb-sw has two settings:
- Automatic
- Manual.

The normal position for this pb-sw is "lights out". In this position the pressurization system is in AUTO mode.

![alt text](image-28.png)

The LDG ELEV selector normally remains in the AUTO position. Landing elevation, which is required by the pressurization system, is then provided by the FMGS based upon elevation of the destination airport. If the landing elevation is not available from the FMGS, then it can be set manually using this selector.

![alt text](image-27.png)

The guarded DITCHING pb-sw is provided to close all valves below the waterline so that the aircraft can be sealed in the unlikely event of a ditching.

![alt text](image-29.png)

For a better understanding of how the pressurization system works, we will go through a normal fight profile, paying particular attention to the ECAM indications.

![alt text](image-30.png)

When the aircraft is on the ground before the flight, the outflow valve is fully open, there is no differential pressure and there is no vertical speed.

We can also notice that the cabin altitude is indicating the field elevation of the departure airfield.

![alt text](image-31.png)

During the Take off roll, the system controller signals the outflow valve to close slightly in order to pre-pressurize the aircraft.

This is to avoid a pressure surge at rotation.

:::note[Why Pre-pressurize]
<details>
<summary>By ChatGPT</summary>

1. What would happen without pre-pressurization.
At liftoff/rotation, the aircraft experiences a rapid increase in vertical speed.
This immediately drives a quick drop in ambient (outside) pressure.
If the cabin were still at ground pressure with the outflow valve fully open:
The system would need to react suddenly to maintain cabin differential pressure.
This causes a rapid cabin pressure transient (a “pressure surge”).
2. What pre-pressurization does.
By slightly closing the outflow valve during the takeoff roll:
The system builds a small positive differential pressure (typically ~0.1 psi).
The cabin is already “ahead” of the external pressure change.
3. Why this avoids a surge at rotation.
At rotation:
Instead of a sudden large pressure gradient forming,
The system only needs fine adjustments, not a large correction.
This results in:
- Smoother cabin pressure profile
- Reduced cabin rate-of-climb spikes
- Improved passenger comfort
- Less stress on the pressurization control loop
4. Control system perspective.
The pressurization controller is essentially managing a closed-loop system with:
Input: aircraft altitude / vertical speed
Output: outflow valve position
Pre-pressurization acts like a feedforward bias, reducing lag and overshoot at a critical transient (rotation).
</details>
:::

![alt text](image-32.png)

At lift-off the controller initiates the climb phase and cabin altitude varies according to a fixed law taking into account the actual rate of climb of the aircraft. The outflow valve will move as required to achieve this.

![alt text](image-33.png)

Once established in cruise, the cabin altitude and differential pressure will remain steady. The outfliow valve will move as required to maintain the cabin altitude. In the example shown the aircraft is in cruise at 35 000 feet. Notice the values of differential pressure and cabin altitude.

![alt text](image-34.png)

During the descent phase the pressure rate is optimized so that the cabin reaches landing field pressure just prior to landing.

Note: for passenger comfort the automatic function will limit the rate of cabin descent to a maximum of approximately 750 feet per minute.

![alt text](image-35.png)

![alt text](image-36.png)

At touchdown the cabin altitude should be at the airfield elevation, and there should be no residual pressure.

To ensure this, few seconds after touchdown, the outflow valve fully opens by the active controller.

![alt text](image-37.png)

![alt text](image-38.png)

Few seconds after the outflow valve is fully open, an automatic change over of the system controllers occurs in preparation for the next flight. This happens so that both systems are used equally.

![alt text](image-39.png)

---

Let's now review some failure cases. The caution CAB PR LDG ELEV FAULT is telling you that the pressurization system has, for some reasons, lost the landing elevation data normally supplied by the FMGS.

Notice that depending on the version, the landing elevation details on the system page are blanked, or are replaced by amber XX or by zero.

![alt text](image-40.png)
![alt text](image-41.png)
![alt text](image-42.png)

Read the actions on the EWD.

In this case, the procedure asks to set the landing field elevation manually with the LDG ELEV selector.

![alt text](image-43.png)

As the soon as the selector is moved from the AUTO position, the action line on EWD clears and a MAN message appears on the CAB PRESS page. The LanDinG ELEVation value will also indicate the selected value.

![alt text](image-44.png)

To complete this module let's look at some other abnormal indications.

The safety valves, prevent the cabin pressure from going too high, or too low.

![alt text](image-45.png)

An ECAM caution CAB PR SAFETY VALVE OPEN is generated, if one of the safety valves has been detected open for more than 1 minute.

Notice that the safety valve indication on the CAB PRESS page changes to amber.

![alt text](image-46.png)

If on ground and in case of abnormal residual pressure when speed is below 100 Kts or after all engines are shutdown, and with manual mode selected or with both CPCs failed, the Residual Pressure Control Unit (RPCU) automatically controls the outflow valve to open.

![alt text](image-47.png)

![alt text](image-48.png)


***Module completed***

## Video study

- Watch the video available on [YouTube](https://www.youtube.com/watch?v=vxsJfRjhr8k&list=PLKEybvo562LtwmnZOjo8jN7J75vXGqMzq&index=37)