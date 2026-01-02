---
title: "Icarus"
subtitle: "RESEARCH PROJECT"
header_title: "ICARUS"
header_text: "Founded in 2020, ICARUS is a research and development project on active control technologies for future rocket teams. These technologies are crucial throughout the flight to control the trajectory and its smooth progress. The main objective is also to get our rockets back by landing them propulsively by reigniting their engines in the same way SpaceX is known to do, thus training students in technologies that are crucial to lowering the cost to reach space."
header_background: "/images/originalQuality/Icarus-Background.png"
date: 2025-03-13T19:36:30+01:00
layout: single
padding: 30px
callToAction:
    text: "Want to participate in this project?"
    action: "JOIN THE ERT"
specs:
  - key: "Year"
    value: "2025/2026"
  - key: "Goal"
    value: "Vehicle capable of propulsive landing"
  - key: "Size"
    value: "2.3 m"
  - key: "Mass"
    value: " 82 kg"
  - key: "Fuel type"
    value: "Ethanol" 
  - key: "Fuel capacity"
    value: "2.4 L"
  - key: "Oxydant type"
    value: " N2O"
  - key: "Oxydant capacity"
    value: "6.4 L"
  - key: "Nominal Thrust"
    value: "1000 N"  
  - key: "Team members"
    value: "10"
highlights:
  - key: "withstandable radial acceleration"
    value: "3.5 g"
  - key: "withstandable axial acceleration"
    value: "10 g"
faq:  
  - question: "My dad has a camera drone, how are yours any different"
    answer: "Our drones approximate the dynamical behaviour of a rocket. The first thing is that they have a high weight-to-thrust ratio (as usually does a rocket-powered vehicle). Their center of gravity is also way outside their center of thrust, hence they are quite difficult to control and need comprehensive algorithms. They are built in a specific way such as to ensure that they match the design intent and requirements of both the Hopper and their own."


  - question: "What skills do students develop during their participation in Icarus"
    answer: "Students acquire a wide range of technical skills: structural and mechanical design, materials and manufacturing, propulsion engineering, avionics and embedded electronics, sensor integration, control and navigation algorithms development. Above all, students face the complexity of a real-world project through problem-solving during test phases. Finally, the project builds strong interdisciplinary teamwork, project management and technical communication skills needed for complex projects like Icarus."
  - question: "What are the main safety challenges"
    answer: "The main safety challenges arise from the flammability of ethanol and the high energetic potential of nitrous oxide, which require strict handling, monitoring, and containment measures. To control these risks, we rely on a fully autonomous SRAD Flight Termination System capable of remotely passivating the hopper with strong redundancy.Operational safety is reinforced through rigorous written procedures and role-based checklists, all reviewed internally by a dedicated Chief Safety Officer. On top of that our purpose-built testing facility provides a controlled, well-equipped environment designed to protect teams during every phase of operations."


---

# Specifications

{{< flexbox >}}
    {{< specs >}}
    {{< logotype logo="/icons/icarus.png" >}}
{{< /flexbox >}}


# Highlights

{{< highlights >}}

Our mission is to create a vehicle capable of propulsive landing as well as a platform for EPFL Rocket Team to develop technologies pertaining to active control and thrust vectoring for use in future vehicles. Such an usage would be a dedicated module on-board the next Firehorn-class rocket. We aim to foster learning opportunities for students and bring our association closer to space through innovative engineering and collaborative efforts.


# GNC Algorithms

The base of the project is the development of various control, navigation, and guidance algorithms. These algorithms aim to control the stability of the hopper and optimize its trajectory throughout the flight in order to reach its objective, and in the near future, to enable it to land successfully.

{{< video autoplay="true" loop="true" muted="true" src="/images/originalQuality/Icarus_Landing.mp4" >}}

Due to the complexity of the task and the number of parameters taken into account, we chose to use predictive control techniques based on a dynamic model in combination with high-frequency LQR for low-level control. These algorithms need information about the position, attitude, and velocity of the vehicle, this is the role of the navigation algorithm, which combines IMU, pressure sensor, and an RTK GPS with dual GNSS through advanced Kalman filtering. These techniques make it possible to anticipate, in near real time, the future evolution of the hopper’s state and thus optimize the control commands.

# Hopper

## Overview

{{< flexbox gap="30px" align="center" >}}
<div style="flex: 1; max-width: 400px;">
  <img src="/images/originalQuality/icarus-image2.png" style="width: 100%; height: auto; object-fit: contain;" alt="Icarus Hopper Overview">
</div>
<div style="flex: 1; min-width: 300px;">
  <p>The Hopper, a pioneering vehicle showing off the ERT versatility, is a new vehicle with custom control systems and homemade structure, GNC algorithms and electronics. Capable of propulsive landing, propelled by our bi-liquid ethanol-N2O DEMO A3 engine.</p>
</div>
{{< /flexbox >}}


{{< component-section component="AVIONICS BAY" image="/images/originalQuality/icarus-image7.png" >}}
Composed of 4 main parts, the avionics hardware collects the sensor data, treats it and feeds it to GNC to subsequently actuate the engine.
{{< /component-section >}}

{{< component-section component="UPPER STRUCTURE" image="/images/originalQuality/icarus-image6.png" >}}
The Hopper's Upper Structure consists of a SRAD coaxial tank, a COPV tank, the Avionics bay, and the Battery box.

{{< /component-section >}}

{{< component-section component="MIDDLE STRUCTURE" image="/images/originalQuality/icarus-image5.png" >}}
As the central part of the Hopper, the Middle Structure consists as a interface between legs and Upper structure. Mounted on it are the batteries, the flight termination system, COPV, and propulsion interfaces.
{{< /component-section >}}

{{< component-section component="GIMBAL" image="/images/originalQuality/icarus-image3.png" >}}
Built with cross-spring pivots, the 2 degree of freedom gimbal mechanism assures Thrust Vector Control (TVC) required to develop an actively controlled hopper vehicle.
{{< /component-section >}}

{{< component-section component="LEGS" image="/images/originalQuality/icarus-image4.png" >}}
Designed to land the Hopper and absorb a 10g vertical deceleration equivalent to a 1.5 meters drop. The legs of the Hopper consist of one central leg equipped with a damper and two lateral legs.

{{< /component-section >}}

<!-- {{< component-section component="DRONE" image="/images/originalQuality/icarus-image1.png" >}}
Made from functionally efficient, innovative bi-material 3D-printed (PETG + TPU). The 3-pylon, 3 legs design is lighter, more flexible and allows better disassembly.
{{< /component-section >}} -->

# Propulsion
A3?
# Drone

The drone serves as a test platform for the development and validation of control algorithms, avionics, and embedded systems before their integration on the hopper. Designed to replicate the hopper’s dynamics, it incorporates the hopper’s gimbal concept, making its control deliberately unstable and demanding. This configuration allows efficient testing of GNC algorithms, onboard electronics, and sensor behavior under realistic conditions while minimizing the costs and risks associated with rocket engine powered flight.


The drone’s structure combines carbon and aluminum tubes, spring steel blades, and parts printed in PETG and TPU, providing a framework that balances mass efficiency and modularity. This robust design ensures the availability of an operable drone dedicated to rapid testing, integration of new technologies, and validation of concepts intended for future iterations of the Icarus project.

{{< tabs-state initial-tab=" " >}}


<div align="center">
  <img src="/images/originalQuality/icarus-image1.png" style="margin: 0; max-width: 100%; height: auto; max-height: 16rem; width: auto; object-fit: {{ .Get "object-fit" | default "contain" }};"/>
  <div style="font-family:'Aspekta-300'; font-size: 1.15rem; width:50%">
  Made from functionally efficient, innovative bi-material 3D-printed (PETG + TPU), the 3-pylon, 3 legs drone design is lighter, more flexible and allows better disassembly.
  </div>

</div>

{{< /tabs-state >}}


# Questions

{{< faq >}}










