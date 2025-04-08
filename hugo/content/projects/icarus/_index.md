---
title: "Icarus"
subtitle: "RESEARCH PROJECT"
header_title: "ICARUS"
header_text: "Founded in 2020, ICARUS is a research and development project on active attitude control technologies for future rocket teams. These technologies are crucial throughout the flight to control the trajectory and its smooth progress. The main objective is also to get our rockets back by landing them propulsively by reigniting their engines in the same way SpaceX is known to do, thus training students in technologies that are crucial to lowering the cost to reach space."
header_background: "/images/originalQuality/Icarus-Background.jpg"
date: 2025-03-13T19:36:30+01:00
layout: single
padding: 30px
callToAction:
    text: "Want to participate in this project?"
    action: "JOIN THE ERT"
specs:
  - key: "Year"
    value: "2020 -"
  - key: "Goal"
    value: "Vehicle capable of propulsive landing"
  - key: "Team members"
    value: "an integer"
highlights:
  - key: "withstandable radial acceleration"
    value: "3.5 g"
  - key: "withstandable axial acceleration"
    value: "10 g"
---

# Specifications

Our mission is to create a vehicle capable of propulsive landing as well as a platform for EPFL Rocket Team to develop technologies pertaining to active control and thrust vectoring for use in future vehicles. Such an usage would be a dedicated module on-board the next Firehorn-class rocket. We aim to foster learning opportunities for students and bring our association closer to space through innovative engineering and collaborative efforts.


{{< flexbox >}}
    {{< specs >}}
    {{< logotype logo="/icons/icarus.png" >}}
{{< /flexbox >}}

# Highlights

{{< highlights >}}

# GNC Algorithms

Even though the ICARUS project works on concrete technologies, the base of the project remains the development of the various control, navigation and guidance algorithms. These algorithms aim to control the stability of the rocket as well as to optimize its trajectory throughout the flight in order to reach its objective, and in a near future to succeed in landing it. 

{{< video autoplay="true" loop="true" muted="true" src="/images/originalQuality/Icarus_Landing.mp4" >}}

Due to the complexity of the task and the number of parameters taken into account, the team chose to use predictive control techniques based on a dynamic model previously developed on a simulator. From the flight data collected by our avionics, this technique makes it possible to anticipate in quasi real time the future evolution of the state of the rocket and thus to optimize the control instructions.

# Hopper

{{< tabs-state initial-tab="OVERVIEW" >}}

{{< component-section component="OVERVIEW" image="/images/originalQuality/icarus-image2.png" >}}
The Hopper, a pioneering vehicle showing off the ERT versatility, is a new vehicle with custom control systems and homemade structure, GNC algorithms and electronics. Capable of propulsive landing, it is propelled by our bi-liquid DEMO A3 engine. 
{{< /component-section >}}


{{< component-section component="AVIONICS BAY" image="/images/originalQuality/icarus-image7.png" >}}
Composed of 4 main parts, the avionics hardware collects the sensor data, treats it and feeds it to GNC to subsequently actuate the H-AC motor.
{{< /component-section >}}

{{< component-section component="UPPER STRUCTURE" image="/images/originalQuality/icarus-image6.png" >}}
The Hopper's Upper Structure consists of Nordend's coaxial tank system, a COPV tank, the Avionics bay, and the Battery box. 
{{< /component-section >}}

{{< component-section component="MIDDLE STRUCTURE" image="/images/originalQuality/icarus-image5.png" >}}
As the central part of the Hopper, the Middle Structure consists as a interface between legs and Upper structure. Mounted on it are the batteries, FTS, COPV, and propulsion interfaces.
{{< /component-section >}}

{{< component-section component="GIMBAL" image="/images/originalQuality/icarus-image3.png" >}}
Built with cross-spring pivots, the 2 degree of freedom gimbal mechanism assures Thrust Vector Control (TVC) required to develop an actively controlled hopper vehicle.
{{< /component-section >}}

{{< component-section component="LEGS" image="/images/originalQuality/icarus-image4.png" >}}
Designed to land the Hopper and absorb the shock, the legs of the Hopper are comprised of one central leg equipped with a damper and two lateral legs.
{{< /component-section >}}

<!-- {{< component-section component="DRONE" image="/images/originalQuality/icarus-image1.png" >}}
Made from functionally efficient, innovative bi-material 3D-printed (PETG + TPU). The 3-pylon, 3 legs design is lighter, more flexible and allows better disassembly.
{{< /component-section >}} -->

{{< /tabs-state >}}

# Drone

