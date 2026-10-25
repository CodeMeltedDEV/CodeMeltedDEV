---
title: "Disk"
date: 2026-OCT-11
author: "Mark Shaffer"
description: "Applications have to interact with files on disk. That means reading and writing to them along with managing them."
image: "https://codemelted.com/assets/images/logo-codemelted-dev.png"
twitter_site: "@CodeMeltedDEV"
tags: [File I/O, Read, Write, Disk Management, File Management]
---
<cm-page-header title="Disk Use Case"></cm-page-header>

Applications have to interact with files on disk. That means reading and writing to them along with managing them.

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

| Reference                                                                                                 | Description                                                                                       |
|-----------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| [File System](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API)                           | Provides the objects necessary to work with data from the host file system of the loaded webpage. |
| [HTMLAnchorElement Download](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement/download) | The fallback way of saving data from a webpage.                                                   |
| [Input File](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file)             | Demonstrates how a webpage can open and upload a file for processing.                             |
| [Save a File](https://web.dev/articles/files/save-a-file)                                                 | Demonstrates how a webpage can save a file to disk using old and new techniques.                  |

<cm-page-footer></cm-page-footer>