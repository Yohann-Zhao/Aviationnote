---
title: Power Plant(IAE) Operation(A)
description: A320 Power Plant(IAE) Operation(A)
---

Let's look at the things that you need to know about the engines during normal operation.

As soon as the aircraft is powered, the FADECs are automatically on for 5 min. They provide some engine indications on the EWD.

![alt text](image-18.png)

![alt text](image-19.png)

![alt text](image-20.png)

After 5 min the FADECs shut down automatically and all the engine indications change from normal to amber.

![alt text](image-21.png)

Let's first talk about manual engine start.

There are several reasons why a manual start may be required including low pneumatic pressure.

The main difference between a manual and an automatic start is that the pilot controls the time at which fuel and ignition are supplied to the engine.

The FADEC only provides passive monitoring of the engine during the start sequence. This means that the pilots take on the responsibility to prevent an abnormal start.

The FADEC only controls:
- The position of the HP fuel valve and ignition operation when the associated ENG MASTER SW is on
- The closure of the start valve at 43% N2
- Ignition cut off, on the ground.

Note: Manual starts are completed by using the procedure detailed in the FCOM - PRO-SUP 70 section.

---

Let's start the engines using the automatic engine start procedure.

During the cockpit preparation, you checked that the thrust levers are in the idle position. This is to prevent excessive thrust at engine start.

![alt text](image-22.png)

During the start sequence, all the engine parameters are monitored, controlled and protected by the FADECs.

APU is running.

In order to start the engines, the ENG MODE sel must first be switched to IGN/START.

![alt text](image-23.png)

When ignition start is selected, the FADECs are powered again.

This is indicated on the EWD by the indications which change from amber to normal.

![alt text](image-24.png)

On the system display, the ECAM ENGINE page is automatically presented for more engine indications, also called secondary parameters.

Let's now look at the engine indications specifically.

![alt text](image-25.png)

The first indications on the EWD are the Engine Pressure Ratio (EPR) for each engine. Both indicators are identical.

![alt text](image-26.png)

The green needle indicates the actual EPR. This value is also displayed digitally.

![alt text](image-27.png)

The blue circle represents the EPR related to the thrust lever position.

![alt text](image-28.png)

The amber mark represents the maximum EPR.

This is the EPR that would be produced with the thrust levers fully forward.

![alt text](image-29.png)

On the right side of the EWD, the thrust limit mode and EPR rating limit are displayed.

This will be explained and demonstrated as the mode changes later in the module.

![alt text](image-30.png)

The next set of indicators display the Exhaust Gas Temperature (EGT) of each engine.

![alt text](image-31.png)

The green needle indicates the actual EGT. This value is also displayed digitally.

![alt text](image-32.png)

The amber tick indicates the maximum EGT (MAX EGT).

Note: Depending on the engine version, the amber tick will disappear during engine start or during takeoff.

![alt text](image-33.png)

The fuel flow is displayed digitally for each engine.

![alt text](image-34.png)

Let's look now at the indications on the ECAM ENGINE page.

The first indication displayed is the fuel used by each engine. Notice that there is a fuel used indication and the engines have not been started. This is because this value is frozen at engine shut down and reset on the ground, at engine start.

![alt text](image-35.png)

The next indications are:
- The engine oil quantity
- The oil pressure
- The oil temperature.

![alt text](image-36.png)

Vibration indications are displayed below the oil temperature.

![alt text](image-37.png)

There are additional indications displayed during engine start on the ground. They are only displayed when the ENG MODE sel is in the IGN/START or CRANK position.

They are:
- The start valve position indication
- The air pressure available for start.

![alt text](image-38.png)

When the engines are started, the valve indications are removed, as shown.

Note: This blanked area will be also used to display the nacelle temperature when at least one is above the advisory threshold.

![alt text](image-39.png)

![alt text](image-40.png)

We will start the engines using the available APU BLEED as indicated on the MEMO and the pressure indication at the bottom of the SD.

We start engine 2 first because the yellow hydraulic system engine driven pump is on engine 2 and the yellow system supplies park brake pressure.

![alt text](image-41.png)

The corresponding start valve opens.

This is indicated by the start valve indication changing from green cross-line to green in-line.

![alt text](image-42.png)

The fuel used is reset to zero.

![alt text](image-43.png)

On the EWD, N2 increases. It is displayed on a grey background.

![alt text](image-44.png)

On the ECAM ENGINE page the oil pressure increases.

![alt text](image-45.png)

As N2 increases, N1 will be displayed. Approximately 30 s after selecting ENG 2 MASTER sw ON, an igniter is powered.

The active igniter is indicated by a letter (A or B) on the ECAM ENGINE page.

Note: The igniters alternate on successive starts.

![alt text](image-46.png)

![alt text](image-47.png)

On the EWD we see that the fuel begins to flow.

When the fuel is ignited, the EGT increases.

![alt text](image-48.png)

When N2 reaches 43%, the start valve closes and the ignition is switched off.

Notice on the ECAM ENGINE page the start valve is closed and the igniter indication disappears.

![alt text](image-49.png)

N2 continues to increase.

At approximately 58% it stabilizes and the grey background disappears indicating that the start sequence is finished.

ENG 2 is now running and all its parameters have stabilized.

As soon as one engine is started, the limit mode changes to TOGA (orFLEX if temperature has been entered on the MCDU PERF T.O page), also GW is displayed.

![alt text](image-50.png)

![alt text](image-51.png)

On the N1 gauge the green needle indicates the actual N1. This value is also displayed digitally.

![alt text](image-52.png)

Let's start engine 1 now. We will show you the full sequence without stopping.

![alt text](image-53.png)

- Start valve opens

![alt text](image-54.png)

- Fuel used is reset

![alt text](image-55.png)

- N2 increases

![alt text](image-56.png)

- 30 seconds after the start MASTER sw was put on, an igniter is powered

![alt text](image-57.png)

- Fuel flow begins

![alt text](image-58.png)

- EGT increases

![alt text](image-59.png)

- When N2 is approximately 43%, the start valve closes and the ignition is switched off.

![alt text](image-60.png)

At about 58% N2 stabilizes and the grey background disappears indicating that the engine 1 start sequence is finished.

For both engines all parameters have stabilized.

At ISA sea level, idle parameters should be:
- N1 about 21.4 %
- EGT about 414℃
- N2 about 57.8 %
- FF about 350 kg/h or 775 lb/h
- EPR about 1.01.

![alt text](image-61.png)

The last action is to switch the ENG MODE sel to normal.

![alt text](image-62.png)

On the system display, the ECAM ENGINE page is replaced by the ECAM WHEEL page.

Note: After start, to avoid thermal shock, it is recommended that the engines are operated at or near idle for at least 2 min.

![alt text](image-63.png)

This ends the engine automatic start sequence.

***Module completed***