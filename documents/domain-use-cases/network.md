---
title: "Network"
date: 2026-OCT-11
author: "Mark Shaffer"
description: "A system of interconnected computing devices that communicate and share resources, data, and applications over wired or wireless connections."
image: "https://codemelted.com/assets/images/logo-codemelted-dev.png"
twitter_site: "@CodeMeltedDEV"
tags: [fetch, REST API, TCP, UDP, Web Socket, WebRTC, Web Transport, Beacon]
---
<cm-page-header title="Network Use Case"></cm-page-header>

A system of interconnected computing devices that communicate and share resources, data, and applications over wired or wireless connections.

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

| Reference                                                                                   | Description                                                                     |
|---------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| [Beacon](https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API)                       | Sets up a quick post call to a backend server from a webpage.                   |
| [Broadcast Channel](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) | Allows for a broadcast mechanism between open pages on the same domain.         |
| [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/EventSource)                 | Provides a webpage the ability to receive a stream of Server-Sent Events.       |
| [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)                         | Provides a webpage the ability to perform REST API transactions with a server.  |
| [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)                     | The web standard for TCP bidirectional communication between a client / server. |
| [WebRTC](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)                       | Mechanism to get real time audio / video communication between webpage peers.   |
| [WebTransport](https://developer.mozilla.org/en-US/docs/Web/API/WebTransport)               | The web standard for UDP socket communication between different web clients.    |

<cm-page-footer></cm-page-footer>