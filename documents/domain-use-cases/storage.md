---
title: "Storage"
date: 2026-OCT-11
author: "Mark Shaffer"
description: "A string based key / value pair combination for simple information storage and retrieval."
image: "https://https://codemelted.com/assets/images/logo-codemelted-dev.png"
twitter_site: "@CodeMeltedDEV"
tags: [Key Value Pairs, Local Storage, Session Storage, Cookie Store, Local File]
---
<cm-page-header title="Storage Use Case"></cm-page-header>

A string based key / value pair combination for simple information storage and retrieval.

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

| Reference                                                                                | Description                                                                                                                 |
|------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| [CookieStore](https://developer.mozilla.org/en-US/docs/Web/API/CookieStore)              | The modern way webpages can store cookies vs. the old way on a host computer.                                               |
| [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)     | Provides a webpage with a string key / value storage mechanism that lasts after page closes and is opened in a new session. |
| [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) | A key / value string storage active for the webpage session. Cleared when page is closed.                                   |

<cm-page-footer></cm-page-footer>