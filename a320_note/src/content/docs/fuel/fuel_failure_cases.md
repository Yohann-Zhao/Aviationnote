---
title: Fuel Failure Cases
description: A320 Fuel Failure Cases
---

In flight, you had a CTR TK PUMP failure. The related procedure has been completed. The CTR TK PUMP 1 has been switched to OFF and the crossfeed valve has been open.

The "CTR TK FEEDG" memo indicates that the center tank is still feeding the engines, and the "FUEL XFEED" memo indicates that the crossfeed valve is open.

The STATUS page identifies the failed pump.

![alt text](image-76.png)

You are continuing in cruise.

Remember that center tank pump 1 is faulty. Let's see what occurs when center tank pump 2 failure is added.

![alt text](image-77.png)

On the EWD, the amber message "CTR TK PUMPS LO PR" means that both center tank pumps are faulty.

![alt text](image-78.png)

![alt text](image-79.png)

You have the same indications as you had for center tank pump 1 failure:

- LO boxed amber on the ECAM page
- The amber FAULT light on the FUEL control panel.

The PF will ask you to perform the ECAM actions.

![alt text](image-80.png)

Observe that both tank pumps are off on the FUEL overhead panel.

![alt text](image-81.png)

On the ECAM FUEL page:
- The center tank pumps are cross-line amber, meaning that they have been manually shut OFF
- The center tank quantity is boxed amber, meaning that the center tank fuel is not usable
- The FOB is half amber boxed, meaning that some of FOB is not usable.

![alt text](image-82.png)

The STATUS page indicates the following:
- A green message states that the center tank fuel is unusable
- The center tank pumps are inoperative. This is indicated in amber.

![alt text](image-83.png)

---

We learned from the ECAM actions and the indications related to center tank pump failures that:

- Losing one center tank pump requires the opening of the crossfeed valve to prevent a fuel imbalance
- Losing both center tank pumps means center tank fuel is unusable.

Let's now review a left tank pump failure.

![alt text](image-84.png)

The amber message "L TK PUMP 1 LO PR" on the EWD means that the left tank pump 1 is faulty.

The ECAM FUEL page appears automatically with the related pump indication.

Note: The Master Caution and the Single Chime are not triggered as the tank has another pump for redundancy.

![alt text](image-85.png)

We have switched the L TK PUMP to off for you.

Observe:
- On the FUEL panel, the amber FAULT light in the L TK PUMP 1 pb-sw is replaced by the white OFF light
- On the ECAM FUEL page, the amber "LO" indication is replaced by an amber cross-line, indicating that the pump is off.

![alt text](image-86.png)

We are continuing in cruise.

Remember that left tank pump 1 is faulty.

Let's see what occurs when left tank pump 2 failure is added.

![alt text](image-87.png)

The amber message "FUEL L TK PUMP 1+2 LO PR" on the EWD means that both left tank pumps are faulty.

The ECAM FUEL page appears automatically.

![alt text](image-88.png)

![alt text](image-89.png)

The next actions to do, depend on the center tank condition:
- If it is not empty ...

![alt text](image-90.png)

- Or if it is empty and flying above 15 000 ft ...

![alt text](image-91.png)

- Or if it is empty and flying below 15 000 ft ...

![alt text](image-92.png)

In this studied failure case, the center tank is not empty and we have performed the next actions for you.

The left tank pump 2 indications are the same as for the left tank pump 1 shown previously.

![alt text](image-93.png)

![alt text](image-94.png)

On the STATUS page, "L TK PUMPS" are indicated as inoperative.

Note: At this time, the center tank pumps are still feeding the engines. When fuel from the left tank is required, refer to your documentation for gravity fuel feeding.

![alt text](image-95.png)

To conclude:
- Losing one inner tank pump is not critical (no master caution) because of redundancy (2 pumps)
- Losing both inner tank pumps, fuel feeding is still possible by gravity (refer to your documentation).

![alt text](image-96.png)

An "AUTO FEED FAULT" caution message is triggered:
- If the center tank pumps do not stop after slats extension or after a center tank low level.

Notice the corrective actions.

![alt text](image-97.png)

![alt text](image-98.png)

An "AUTO FEED FAULT" caution message is also triggered:

- If the center tank contents is above 250 kg with a wing tank contents above 5 000 kg, due to an abnormal control of the
center tank pumps.

Notice the corrective actions.

![alt text](image-99.png)

Now let's see some other abnormal indications that you can have on the ECAM FUEL page.

If, on the EWD, the FOB indication is displayed with two dashes across the two last digits, the Fuel Quantity Indicator (FQI) is in degraded mode.

We will call the ECAM FUEL page to determine which tank is affected.

![alt text](image-100.png)

The ECAM FUEL page is displayed.

You can see that the affected tank is the left outer tank.

The two amber dashes indicate a loss of accuracy of the indicated fuel quantity.

![alt text](image-101.png)

Also notice that the fuel temperature can appear amber, with an ECAM message and a single chime, if a high or low limit is detected.

In our case, the outer tank temperature has exceeded the low limit.

![alt text](image-102.png)

***Module Completed***