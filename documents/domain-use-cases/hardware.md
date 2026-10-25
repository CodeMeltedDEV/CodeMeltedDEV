---
title: "Hardware"
date: 2026-OCT-11
author: "Mark Shaffer"
description: "Hardware peripherals are auxiliary devices connected to a computer to expand its capabilities. Applications connect to these peripherals via protocols specific to that hardware."
image: "https://https://codemelted.com/assets/images/logo-codemelted-dev.png"
twitter_site: "@CodeMeltedDEV"
tags: [Hardware, Peripheral, Bluetooth, BLE, Serial, RS-232, USB, MIDI]
---
<cm-page-header title="Hardware Use Case"></cm-page-header>

Hardware peripherals are auxiliary devices connected to a computer to expand its capabilities. Applications connect to these peripherals via protocols specific to that hardware.

**Table of Contents**

- [FUNCTIONAL ANALYSIS](#functional-analysis)
  - [UC-1: Function Feature](#uc-1-function-feature)
- [NOTES](#notes)
  - [References](#references)

# FUNCTIONAL ANALYSIS

<mark>Further Refined Use Case Model</mark>

## UC-1: Function Feature

<mark>IF Describing via EARS Function Requirements Format:</mark>

- Ubiquitous (Always Active): The <system name> shall <system response> (e.g., The mobile phone shall have a mass of less than 150 grams
- State-Driven (Active During a State): While <state>, the <system name> shall <system response> (e.g., While the vehicle is in reverse, the system shall display the rear camera feed)
- Event-Driven (Triggered by an Event): When <trigger>, the <system name> shall <system response> (e.g., When the user presses the power button, the device shall turn on)
- Optional Features: Where <feature is present>, the <system name> shall <system response> (e.g., Where the navigation package is installed, the system shall display the map)
- Unwanted Behavior: If <unwanted trigger>, then the <system name> shall <system response> (e.g., If the password is entered incorrectly three times, then the system shall lock the account)

# NOTES

## References

| Reference                                                                       | Description                                                                                   |
|---------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| [Bluetooth](https://developer.mozilla.org/en-US/docs/Web/API/Bluetooth)         | Allows for a webpage to connect to a Bluetooth peripheral.                                    |
| [Geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) | Provides a webpage with access to WGS84 coordinates to know where it is located in the world. |
| [USB](https://developer.mozilla.org/en-US/docs/Web/API/USB)                     | Provides a webpage access to USB hardware peripherals attached to a computer.                 |
| [Web Serial](https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API)   | Provides a webpage access to RS-232 hardware peripherals attached to a computer.              |
| [Web MIDI](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API)       | Provides a webpage access to MIDI attached devices to a computer.                             |

<cm-page-footer></cm-page-footer>