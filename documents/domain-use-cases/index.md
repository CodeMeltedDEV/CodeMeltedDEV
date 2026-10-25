---
title: "Domain Use Cases"
date: 2026-OCT-11
author: "Mark Shaffer"
description: "Fifteen domain use cases were identified covering the most common areas a software engineer needs a solution."
image: "https://https://codemelted.com/assets/images/logo-codemelted-dev.png"
twitter_site: "@CodeMeltedDEV"
tags: [Software Engineering, Rust, JavaScript, Front End, Back End, Full Stack, Use Cases]
children:
  - module-core.md
  - async.md
  - console.md
  - crypto.md
  - database.md
  - hardware.md
  - json.md
  - logger.md
  - math.md
  - monitor.md
  - network.md
  - process.md
  - runtime.md
  - storage.md
  - user-interface.md
---
<cm-page-header title="Domain Use Cases"></cm-page-header>

<center>
  <img src="models/module/use-case-model.drawio.png" />
  <br><br>
</center>

| UC | Link                                  | Description                                                                                                                                                                                     |
|:--:|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 00 | [Module Core](./module-core.md)       | Defines the reusable objects / API violation rules that apply to the entire module and not just a specific use case.                                                                            |
| 01 | [Async](./async.md)                   | Complex applications require the ability to asynchronously time slice up work as to not block the main synchronous processing thread.                                                           |
| 02 | [Console](./console.md)               | Command Line Interface (CLI) apps sometimes require basic input / output interaction with a user. Basic prompts working over STDIN / STDOUT / STDERR provides this capability.                  |
| 03 | [Crypto](./crypto.md)                 | Apps needs to secure information from unauthorized usage. Cryptographic algorithms allow for hiding or coding information so that only authorized parties can read and process it.              |
| 04 | [Database](./database.md)             | Complicated data requires a way to be stored, recalled, and utilized. Embedded database technologies (IndexedDB `codemelted.js` / SQLite3 `codemelted.rs`) allow for this complex data storage. |
| 05 | [Disk](./disk.md)                     | Applications have to interact with files on disk. That means reading and writing to them along with managing them.                                                                              |
| 06 | [Hardware](./hardware.md)             | Hardware peripherals are auxiliary devices connected to a computer to expand its capabilities. Applications connect to these peripherals via protocols specific to that hardware.               |
| 07 | [JSON](./json.md)                     | JSON (JavaScript Object Notation) is a lightweight, plain-text format used to store and transfer structured data between a server and an application.                                           |
| 08 | [Logger](./logger.md)                 | A utility that automatically records, tracks, and stores sequential data, system events, or user actions over time.                                                                             |
| 09 | [Math](./math.md)                     | A collection of mathematical formulas for computational purposes.                                                                                                                               |
| 10 | [Monitor](./monitor.md)               | An ability to measure aspects of the host computer / operating system of a developed application is key in identifying metrics that can point to issues with the host system.                   |
| 11 | [Network](./network.md)               | A system of interconnected computing devices that communicate and share resources, data, and applications over wired or wireless connections.                                                   |
| 12 | [Process](./process.md)               | An instance of a computer program that is actively being executed by the operating system and the CPU. Bidirectional communication occurs via STDIN / STDOUT / STDERR.                          |
| 13 | [Runtime](./runtime.md)               | The supporting software, libraries, and virtual layer that sit between the app and the operating system to make the program run.                                                                |
| 14 | [Storage](./storage.md)               | A string based key / value pair combination for simple information storage and retrieval.                                                                                                       |
| 15 | [User Interface](./user-interface.md) | A visual way for humans to interact with electronic devices, such as computers, smartphones, and ATMs, using graphics instead of text commands.                                                 |

<cm-page-footer></cm-page-footer>