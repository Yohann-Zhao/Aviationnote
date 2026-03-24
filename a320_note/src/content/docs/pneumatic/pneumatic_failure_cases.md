---
title: Penumatic Failure Cases
description: A320 Penumatic Failure Cases
---

We will demonstrate an ENG 1 BLEED FAULT due to an overheat condition.

Let's assume you are pilot non-flying. You are in cruise flight and everything is normal...

On the EWD, read the title of the failure.

The ENG 1 BLEED system has failed. On the BLEED system page, which has been called automatically, the bleed air temperature is displayed amber because it is abnormally high. This is the reason for the failure. The amber FAULT light on the ENG 1 BLEED pb-sw confirmsthe failure.


![alt text](image-33.png)

![alt text](image-34.png)

![alt text](image-35.png)

The BMC has detected the overheat and has automatically closed the ENG 1 BLEED valve to protect the system.

With the valve closed, the BLEED pressure falls to 0 and the temperature decreases.

The ENG 1 BLEED system is no longer available.

![alt text](image-36.png)

Notice that the ENG 1 BLEED pb-sw FAULT light remains on even though the overheat condition no longer persists.

This is because the related ENG BLEED pb-sw is still in ON position. The PF will ask you to perform the ECAM actions. We will set the X BLEED selector sw to OPEN for you

![alt text](image-37.png)

Observe the ECAM: 
- The X Bleed valve is displayed amber during transit and in-line green when fully open
- The pressure and temperature values for the left side of the system are back to normal because now both sides are being supplied by engine 2.

![alt text](image-38.png)

![alt text](image-39.png)

![alt text](image-40.png)

After review and confirmation by the PF, you can clear the message. We will do it.

![alt text](image-41.png)

If you need to use wing anti ice, you will have to switch off one air conditioning pack. We will deal with this fact later.

In the inoperative systems column, ENG 1 BLEED is listed.

After review and confirmation by the PF, you can remove the status
page...

![alt text](image-42.png)

We have removed the STATUS page for you. ECAM action completed.

![alt text](image-43.png)

Now we will see what happens if you have to use wing anti ice with the ENG 1 bleed still inoperative.

Let's assume, you encounter icing conditions and you decide to switch on your wing anti ice. We will do it for you.

![alt text](image-44.png)

The ENG 1 BLEED FAULT procedure is automatically recalled on the E/WD. This is because one ENG BLEED system is not sufficient to supply wing anti ice and both air conditioning packs at the same time. The procedure requires you to switch pack 1 off.

Note: for more information about the packs, refer to ATA 21 - Air Conditioning chapter.
![alt text](image-45.png)

![alt text](image-46.png)

We have switched PACK 1 to OFF for you. After review and confirmation by the PF, we will clear the message.

![alt text](image-47.png)

On the STATUS page, PACK 1 has been added to the inoperative systems column.

![alt text](image-48.png)

For training purposes, to teach you more about the pneumatic system, we will add another failure to your previous configuration.

This will be a LEFT WING LEAK.

- On the EWD read the title of the failure
- On the SD, the ECAM BLEED page is automatically presented
- On the AIR COND panel, the indications from the previous failure remain unchanged.

![alt text](image-49.png)

![alt text](image-50.png)


The title of the failure indicates that an ambient overheat, in the vicinity of the left wing hot air ducts, has been detected.

The left side of the bleed system has to be shut down in order to prevent any damage from leaking hot air.

![alt text](image-51.png)

The first line of the ECAM procedure requires you to set the X BLEED selector sw to the SHUT position. 

With the selector sw in AUTO position, the X BLEED valve would have been closed automatically but remember, you have opened it manually in the previous procedure.

The PF will ask you to do the ECAM actions.

![alt text](image-52.png)

We have set the X BLEED selector sw to SHUT. Observe the indications:
- The X BLEED valve closes
- The pressure of BLEED system 1 returns to 0
- Since there is no hot air supplied, the left wing anti ice valve indication becomes amber (the wing anti iceindications will be explained further in a later module).

We will do the next step of the procedure for you.

![alt text](image-53.png)

The wing anti ice was switched off because you do not want to de-ice one wing only.

![alt text](image-54.png)

The ECAM advises you to avoid icing conditions for the remaining part of the flight.

![alt text](image-55.png)

The STATUS page also informs you that you have to avoid icing conditions.

The WING ANTI ICE indication has been added to the inoperative systems column. The ENG 1 BLEED and PACK 1 indications remain from the previous failure.

![alt text](image-56.png)

We will now briefly look at several abnormals without performing the procedures, to see the remaining indications of the pneumatic system.

![alt text](image-57.png)

In normal operation, when you use APU BLEED, the X BLEED valve automatically opens. If it should fail to open, there is an ECAM caution and the X BLEED valve is displayed cross-line amber to indicate disagreement.

![alt text](image-58.png)

Conversely, if the X BLEED valve should fail to close in automatic mode, e.g. after the APU BLEED has been switched off, it is displayed in-line amber along with an ECAM caution.

![alt text](image-59.png)

Accordingly, the engine bleed valves and the HP valves are displayed amber, if their position disagrees with the
commanded position.

***Module completed***

## Video study

- Watch the video available on [YouTube](https://www.youtube.com/watch?v=nMJX5mxr6OE&list=PLKEybvo562LtwmnZOjo8jN7J75vXGqMzq&index=28)
