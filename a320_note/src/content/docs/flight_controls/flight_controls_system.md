---
title: Flight Controls System
description: A320 Flight Controls System Presentation
---

We will begin this module by explaining the basic concept of the "Fly By Wire" system.

In conventional aircraft, the movement of the control column is transferred along cables and pulleys, until it reaches the
control surface to be moved.

![alt text](image.png)

In the A320 family the cables and pulleys have been replaced by electrical wires.

This has the advantage of saving weight on the aircraft. However, there are, even greater advantages.

![alt text](image-1.png)

The electrical signals created by sidestick movement travel through flight control computers before being transmitted to the surface hydraulic actuators, also named servo controls.

These computers analyze the signal to check that it is a safe command and ensure the optimum flight control surface deflection for the demand.

![alt text](image-2.png)

This has advantages over conventional systems. It:
- Makes the aircraft extremely stable
- Enhances safety
- Reduces the workload of the pilot.

Let's now look at the flight control surfaces themselves.

---

The flight control system includes:
- Ailerons
- Elevators
- A Trimmable Horizontal Stabilizer (THS) for pitch trim
- A rudder
- Spoilers for speed brake or ground spoiler function.

![alt text](image-3.png)

Now let's introduce the ECAM FCTL page. You can see thạt ail the flight control surtaces we have talked about are displayed. We wil now see them in more detail.

![alt text](image-4.png)

The movements of both ailerons and both elevators are symbolized by a green index moving in front of a white scale.

![alt text](image-5.png)

The green rudder symbol is used as an index to display the movements of the rudder on a white scale.

The rudder trim is indicated by a small blue line below the scale.

![alt text](image-6.png)

Note that the rudder and the pedal deflections are limited as a function of speed via a rudder travel limiter.

The travel limiter is indicated by two green brackets, which move, according to the speed, to a minimum deflection (HI SPEED) or to a
maximum deflection (LO SPEED).

![alt text](image-7.png)

The PITCH TRIM position is indicated by THS deflection in degrees up or down.

Let's continue with the spoilers.

![alt text](image-8.png)

The five spoilers, installed on each wing, have several functions:
- Speed brake function, uses the 3 central surfaces
- Roll control function, uses the four outer surfaces
- Ground spoiler function, uses all surfaces.

![alt text](image-9.png)

On the ECAM F/CTL page, the spoiler extended position is indicated by small arrows. This is the case of the speed brakes.

Now, we will look at the flight control computers.

 ![alt text](image-10.png)

The movements of the flight control surfaces are managed by seven computers. These are:
- Two ELevator and Aileron Computers (ELAC)
- Three Spoiler and Elevator Computers (SEC)
- Two Flight Augmentation Computers (FAC).

Note: FAC computers belong to AFS computers, they do not appear on the ECAM F/CTL page.

 ![alt text](image-11.png)

In addition, two Flight Control Data Concentrator computers (FCDC) are used to acquire data from the ELAC and SEC. Then, they send it to the EIS.

![alt text](image-12.png)

However, the data from both FACs is sent directly to the EIS.

![alt text](image-13.png)

The status of ELAC and SEC is indicated on the ECAM F/CTL page. The other computers are not displayed.

These indications will be seen in more detail in the FAILURE CASES module.

Now, we will see the hydraulic aspect.

![alt text](image-14.png)

Three independent hydraulic systems are used to power all the flight control surfaces.

![alt text](image-15.png)

The hydraulic systems which actuate each control surface are indicated on the ECAM F/CTL page by the use of G, B and Y.

For example, the rudder is powered by the Green, Blue and Yellow hydraulic systems.

The ECAM F/CTL page is now complete.

![alt text](image-16.png)

Pilots control pitch and roll through two side sticks.

![alt text](image-17.png)

There are related side stick priority lights. Side sticks and priority lights will be explained in a separate module.

![alt text](image-18.png)

Pitch trim wheels are located on the center pedestal.

![alt text](image-19.png)

There are two sets of conventional and mechanically interconnected rudder pedals.

![alt text](image-20.png)

A RUD TRIM panel is located on the pedestal.

![alt text](image-21.png)

A speed brake lever is located on the left side of the pedestal.

![alt text](image-22.png)

In addition, there are two panels, located on the overhead panel to control the flight control computers.

Now, we will introduce the lift augmentation devices.

![alt text](image-23.png)

There are 5 slats on each leading edge...

![alt text](image-24.png)

... and 2 flaps on each trailing edge.

![alt text](image-25.png)

The slats and flaps are hydraulically actuated like all the other surfaces. They are electrically controlled via two Slat Flap Control Computers (SFCC).

![alt text](image-26.png)

Each SFCC has two channels, one for the flaps and one for the slats. In normal condition, both FLAP channels or both SLAT channels operate simultaneously the related surfaces. If only one channel is available, it can drive its related surfaces, but slowly.

![alt text](image-27.png)

The FLAPS lever, located on the right side of the pedestal, operates the slats and flaps.

The FLAPS lever has the following positions: 0, 1, 2, 3 and FULL.

Also, the FLAPS lever can be set :
- From position FULL to only position 3
- From position 3 to position FULL, or to position 2, or directly to position 1
- From position 1 directly to position 3, or to position 2, or to position 0
- From position 0 to only position 1.

![alt text](image-28.png)

The flaps and slats information is shown on the E/WD.

The flap and slat positions are indicated by white dots.

Note: The FLAPS lever position 1 will correspond to two configurations, which depends on the speed:
- Configuration 1, or
- Configuration 1+F.

Here, the surfaces are extended to configuration 1 +F.

![alt text](image-29.png)

This is the flap 0 indication.

![alt text](image-30.png)

The slats and flaps have protection functions.

In particular the detection of surface asymmetry between left and right wing, surface attachment failure, mechanism overspeed or uncommanded movement of the surfaces. All these protections will be studied later.

![alt text](image-31.png)

Let's review some operational indications.

The pitch trim values related to the takeoff CG values are indicated on the scales beside the trim wheels.

After engine start, the takeoff CG is manually set by rotating the trim wheels and must remain in the green band range.

Here, the takeoff CG is set at 26.5% which corresponds to a THS setting roughly at 0.5 nose up.

Note: This relationship between CG and THS shown on the trim wheel is only applicable for takeoff, and never used in flight.

![alt text](image-32.png)

The pitch trim setting is shown on the ECAM F/CTL page. This can be checked during the flight control check when taxiing, if required.

Note: Never use this indication for the takeoff trim adjustment, prefer the scales beside the trim wheels and on the QRH. Because they refer to the takeoff CG position.

![alt text](image-33.png)

Notice that without hydraulic pressure, the bank angle limit indicators are displayed in amber on the PFD.

The side sticks are inoperative because there is no hydraulic power. Moving the side sticks will not affect the control surfaces. 

Note: When the side stick is not moved, it is springloaded to neutral.

![alt text](image-34.png)

After first engine start, and as the hydraulic power is available:
- The bank angle limit indicators turn to green, indicating bank angle limits in normal law and
- The side sticks become operable.

On ground, the flight control surfaces respond in direct relationship to movements of the side sticks. This ground mode enables pilots to check the flight control surfaces, such as the ailerons, the roll spoilers and the elevators.

Note: A rudder PEDALS DISC button is provided on the nose wheel steering handle, to prevent any unwanted steering inputs during rudder pedals check.

![alt text](image-35.png)

The takeoff memo is normally displayed 2 minutes after the engine start and checked only during taxiing. For training purposes, we check it now.

The FLAPS lever should be set to a takeoff position (1, 2 or 3). While the surfaces are moving, we will be looking at their indications on the E/WD.

To set the FLAPS lever to the related takeoff position, you need to lift up the lower part of the FLAPS lever, and then to position it to the appropriate setting.

Here, as an example, we will select the position 1.

![alt text](image-36.png)

As soon as a FLAPS lever selection is made, the E/WD will
display the following changes:
- A blue number indicating which FLAPS lever position has been selected (here it is 1+F, because the speed is less than 100 kt)
- Blue markers showing the selected flap and slat positions
- The white labels "S" and "F" and
- The current slat position green marker will move, followed by the flap green marker.

When the flaps and slats have reached their selected positions:
- The blue markers disappear
- The FLAPS lever position number changes from blue to green
- The FLAPS T.O memo on the E/WD turns to green.

![alt text](image-37.png)

When the flaps are extended, the ailerons move to a new neutral position by about 5 degrees in order to be more efficient.

On the ECAM F/CTL page, the green aileron indexes are now pointing to a small white square which represents the new neutral position.

![alt text](image-38.png)

If we perform a takeoff in configuration 1 + F, FLAPS 0 would normally be selected when the airspeed is increasing through "S" speed, which is the minimum speed for slat retraction. To demonstrate the automatic flap retraction, we will delay this action.

![alt text](image-39.png)

Before reaching the VFE relative to the CONF 1+F, the flaps will automatically retract to 0 at 210 kt.

Observe that the slats remain in the selected CONF 1, as there is no automatic slats retraction.

When the flaps are fully retracted, the blue number tums to green and the VFE relates to the CONF 1.

Note: If, in CONF 1, the speed drops below 100 kt, the flaps extend again to the CONF 1+F.

 ![alt text](image-40.png)

 ![alt text](image-41.png)

 ![alt text](image-42.png)

To set the speedbrake surfaces (spoilers 2, 3 and 4) to a required deflection, the SPEED BRAKE lever must be pushed and moved rearwards to a position, which depends on the required amount of drag.

Note: At the 1/2 position, there is a hard point.

If an autopilot is engaged, and:
- The SPEED BRAKE lever is moved fully back, the maximum surface deflection is limited to the deflection relative to the 1/2 position
- When flying at high speed, the speed brake retraction rate is reduced. So, retraction may take around 25 seconds.

 ![alt text](image-43.png)

 ![alt text](image-44.png)

 ![alt text](image-45.png)

 ![alt text](image-46.png)

Each time the speedbrake surfaces are extended, a SPEED BRK memo is displayed:
- In green, when both engines are at idle thrust
- In flashing amber, when at least one engine is above idle thrust for more than 50 seconds.

Also, the speedbrakes are shown on the ECAM F/CTL page and on the WHEEL page if they have been selected.

 ![alt text](image-47.png)

 ![alt text](image-48.png)

When the speedbrake surfaces are retracted, all speedbrake indications are removed.

![alt text](image-49.png)

We have activated the approach, and the speed decreases to the magenta target, but it stops at green dot, due to the clean configuration.

Now, we may set the FLAPS lever to the position 1, because the current speed is below the amber dashes, which relate to the VFE for the next configuration.

Note: The amber dashes are called VFE NEXT.

![alt text](image-50.png)

![alt text](image-51.png)

![alt text](image-52.png)

When the FLAPS lever is set to position 1, and as the speed is above 210 kt, only the slats extend to the CONF 1. Then, the speed continues to decrease towards the S symbol.

The FLAPS lever will set be to position 2 when the current speed is lower than the VFE NEXT relative to the next configuration.

Note: In this configuration, if suddenly the speed drops below 100 kt, the flaps will extend automatically to the CONF 1+F.

![alt text](image-53.png)

---

Let's go directly to the landing phase.

In normal law, when descending for landing, the pitch control in flight mode changes to flare mode when passing 50 ft RA. Also the system memorizes the aircraft attitude. And passing 30 ft RA, it progressively reduces the pitch attitude over a period of 8 seconds.

This means that the pilot has to take a gentle nose-up action to flare the aircraft as for a conventional aircraft.

![alt text](image-54.png)

When the ground spoilers are armed, a white band appears on the SPEED BRAKE lever and on the E/WD, a green memo is displayed,
as shown, or on the landing memo, if below 2000 ft.

Note: The SPEED BRAKE lever, when in ARMED position, cannot be moved.

![alt text](image-55.png)

![alt text](image-56.png)

The ground spoilers fully deploy only automatically when:
- In ARMED position, at touchdown, with both main landing gear compressed, and both thrust levers at idle, or
- Not in ARMED but in RET position, at touchdown, with both main landing gear compressed, both thrust levers at idle and at
least one reverse selected.

The ground spoiler (spoilers 1 to 5) extension can be monitored by the pilot non flying on the ECAM WHEEL page.

Note: If only one main landing gear is compressed, all ground spoilers will extend partially, thereby decreasing the lift and compressing both main landing gears. Ground spoilers will then fully deploy.

![alt text](image-57.png)

The ground spoilers retracts:
- When at least one engine thrust is no longer at idle, for example for go around, or
- After landing:
    - When the SPEED BRAKE lever is pushed, or
    - With the SPEED BRAKE lever not in ARMED, when the reverse is no longer selected.

![alt text](image-58.png)

![alt text](image-59.png)

![alt text](image-60.png)

![alt text](image-61.png)

***Module completed***