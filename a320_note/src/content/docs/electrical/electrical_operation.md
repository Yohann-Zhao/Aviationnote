---
title: Electrical Power Operation
description: A320 Electrical Power Operation
---

After a long stop, as the aircraft has not been electrically supplied for at least 6 hours, one of the first item to check is the status of the batteries.

To check the batteries:
- Check they are off or switch them off
- Check the voltages, as they are always displayed.

Note: As long as the DC BAT bus is not powered, OFF lights on the BAT 1 and BAT 2 pushbutton switches are not lighted on, even in the OFF position.

![alt text](image-34.png)

:::note[About "lighted"]

*adjective*; technical/legacy usage: lighted = illuminated

:::

![alt text](image-35.png)

The green AVAIL light is not lighted, meaning that you have no ground power. You have to ask the ground personnel to connect a ground cart.

![alt text](image-36.png)

The ground cart is now connected. The green AVAIL light has appeared which means:
- External power is plugged in
- Its voltage and frequency are normal
- It is ready for use.

![alt text](image-37.png)

Then the battery 1 must be switched on.

Note: The battery 2 OFF light comes on as the DC BAT bus is supplied.

Then the battery 2 must be switched on.

Note: The engine generator FAULT lights come on as they are supplied by the static inverter which operates when both BAT pushbuton switches are on (speed below 50 kt).

![alt text](image-38.png)

![alt text](image-39.png)

![alt text](image-40.png)

![alt text](image-41.png)

As the battery voltage was below 25.5, a charging cycle of about 20 minutes is required.

For that, the EXT PWR pb must be momentarily pressed. So, the AVAIL light is replaced by the blue ON light, indicating the external power contactor is closed.

![alt text](image-42.png)

The ECAM ELEC page has been called for you.

You may confirm that the external power supplies the AC buses via the Bus Tie Contactor (BTC) logic. Also you have to check that the battery contactors are closed and the batteries are charging.

Note: Battery charging is indicated by an arrow from DC BAT bus to the related battery.

![alt text](image-43.png)

Now, 20 minutes are elapsed and you should check that the battery voltage is above 25.5.
For that, the battery 1 and 2 must be set to OFF and the related voltage must be checked on the ELEC panel.
On the ECAM ELEC page, notice the DC BAT bus indication due to both battery charge limiters not operating with the DC BAT bus still
supplied by the DC 1.


![alt text](image-44.png)

![alt text](image-45.png)

But, before powering electrically the aircraft, if it has been electrically supplied during the past 6 hours, the related battery voltage will be above 25.5 ensuring a battery charge above 50%. So the batteries must be switched on.

Now, if the APU has to be started on battery only, make sure to start it within 30 minutes following the battery selection to on. Because the charge of the batteries will be less than 25%, if they still supply the aircraft after 35 minutes.

![alt text](image-46.png)

![alt text](image-47.png)

As the AVAIL light is on, the EXT PWR pb can be momentarily pressed, to supply the AC buses as shown on the ECAM ELEC page.

![alt text](image-48.png)

As the batteries are fully charged, the related battery charge limiter (BCL) has disconnected its battery, as shown. It is time to start the APU. We will start the APU for you.

![alt text](image-49.png)

When the APU MASTER SW pb is set to ON, the APU generator parameters are displayed and the BCL connects its battery to the DC BAT bus, in order to assist the TR 1 during the start of the APU, as shown after pressing on the START pb.

Then when the APU AVAIL light is on, the APU generator is energized.

![alt text](image-50.png)

![alt text](image-51.png)

![alt text](image-52.png)

Now it is time to switch off the external power. We will do it for you.

![alt text](image-53.png)

When the EXT PWR pb is momentarily pressed with the ON light on, it is replaced by the green AVAIL light.

So, the external power contactor is open. This allows now, the APU generator line contactor to close, shown by the related
green line and by the generator load.

![alt text](image-54.png)

Let's look for a moment at the outside of the aircraft to see the only item related to the electrical system during the Walk Around.You should check that the external power access door is closed, if not in use.

![alt text](image-55.png)

Before starting the engines we have to check the charge of the batteries by initiating a charging cycle.

For that the ECAM ELEC page must be called and both battery pushbutton switches must be set to OFF then to ON. We will do it for you.

![alt text](image-56.png)

As soon as the related battery pb-sw is setback to ON, the related BCL connects the battery. A battery is correctly loaded when its current drops below 60 A after 10 seconds and continues to decrease. If not, you must wait until the charging cycle is completed and perform this check again.

Note: The charging cycle is completed when the BCL has disconnected the battery.

![alt text](image-57.png)

![alt text](image-58.png)

![alt text](image-59.png)

![alt text](image-60.png)

It is now time to remove the external power and to start the engines. Usually when we start the engines the ECAM ENG page is displayed. However, for training purposes only, we will keep the ECAM ELEC page displayed throughout the flight.

![alt text](image-61.png)

![alt text](image-62.png)

![alt text](image-63.png)

We will start engine 2 first.
The generator 2 FAULT light goes off when the generator 2 line contactor is closed.
This confirm the related generator parameters are within limits.
And so, the BTC logic has automatically allowed the transfer of the AC bus 2 from APU generator to the generator 2.

![alt text](image-64.png)

![alt text](image-65.png)

Then, the engine 1 is started.
The generator 1 FAULT light goes off when the generator 1 line contactor is closed.
This confirms the related generator parameters are within limits.
And so, the BTC logic has automatically allowed the transfer of the AC bus 1 from APU generator to the
generator 1.

![alt text](image-66.png)

![alt text](image-67.png)

As long as the APU generator parameters are within limits, the APU generator line contactor is kept closed. Now, as the APU is not required for take-off, it may be shutdown.

![alt text](image-68.png)

Depending on the APU version (refer to your documentiation) with the APU MASTER SW pb in OFF selection, the APU may enter into a cooling period. So, the APU generator will stay on-line as long as the AVAIL light is on.

Note: When the APU is not running, the APU generator FAULT light is inhibited.

![alt text](image-69.png)

![alt text](image-70.png)

![alt text](image-71.png)

![alt text](image-72.png)

In flight, on the ECAM ELEC page, you have to periodically monitor the electrical parameters and the loads.

![alt text](image-73.png)

After landing, the APU has to be started. When the APU is running, the APU generator line contactor closes provided the APU generator parameters are within limits.

![alt text](image-74.png)

![alt text](image-75.png)

Then, both engines are shutdown.

As soon as the engine generator line contactor opens, the BTC logic allows the APU generator to maintain the supply of the related AC bus.

![alt text](image-76.png)

![alt text](image-77.png)

Then, the ground cart is plugged in. If its electrical parameters are within limits, they are displayed on the ECAM ELEC page and on the ELEC panel agreen AVAIL light is on.

Now, the external power can be connected to the electrical network. For that, the EXT PWR pb must be momentarily pressed. We will do it for you.

![alt text](image-78.png)

![alt text](image-79.png)

When it is momentarily pressed, the AVAIL light is replaced by the blue ON light, which indicates the external power line contactor is closed. This is confirmed on the ECAM ELEC page by the green line.

Note: When the external power line contactor is closed, the APU generator line contactor is automatically open.
Also, the external power line contactor is kept closed as long as the external power parameters are within limits.

![alt text](image-80.png)

If APU is not required it can be shutdown, as shown.
Then before leaving the aircraft, the external power can be switched off, as shown.

Note: When only batteries are connected to the electrical network, the ECAM display units are no longer available.

Then, before setting both battery pb-sw to OFF, make sure that the APU has been shutdown at least 2 minutes before, in order to have DC power available to completely close the APU air intake flap.

![alt text](image-81.png)

![alt text](image-82.png)

![alt text](image-83.png)

When the batteries are switched off, no more power is available. So, on the ELEC panel, only the battery voltage indications are still on, as they are LCDs and directly supplied by the related battery HOT bus.

Also, the EXT PWR AVAIL light will be on as long as the ground cart is plugged in and its electrical parameters are within limits.

![alt text](image-84.png)

![alt text](image-85.png)

***Module completed***


## Video study

- Watch the video available on [YouTube](https://www.youtube.com/watch?v=V0anaFfeDaw&list=PLKEybvo562LtwmnZOjo8jN7J75vXGqMzq&index=48)