---
title: "Runtime"
date: 2026-OCT-11
author: "Mark Shaffer"
description: "The supporting software, libraries, and virtual layer that sit between the app and the operating system to make the program run."
image: "https://codemelted.com/assets/images/logo-codemelted-dev.png"
twitter_site: "@CodeMeltedDEV"
tags: [Runtime, Operating System, Virtualization]
---
<cm-page-header title="Runtime Use Case"></cm-page-header>

The supporting software, libraries, and virtual layer that sit between the app and the operating system to make the program run.

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

| Reference                                                                   | Description                                                                                                       |
|-----------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget) | Represents how webpages communicate events and provides mechanism for the webpage to register for them.           |
| [Location](https://developer.mozilla.org/en-US/docs/Web/API/Location)       | Provides a webpage with basic information of their network location.                                              |
| [Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator)     | Attaches a bunch of different APIs that require detection as they may not be available in different web browsers. |

<cm-page-footer></cm-page-footer>
