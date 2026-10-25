---
title: "Starter Templates"
date: 2026-OCT-11
author: "Mark Shaffer"
description: "A collection of templates for performing software engineering tasks and beginning a coding effort."
tags: [Software Engineering, Developer, Programmer, ACM, IEEE]
image: "https://codemelted.com/assets/images/logo-codemelted-dev.png"
twitter_site: "@CodeMeltedDEV"
---
<cm-page-header title="Starter Templates"></cm-page-header>

This is a collection of templates for performing software engineering tasks and beginning a coding effort. The templates have descriptions within to aid in getting started with the task at hand. The templates can also serve in feeding AI agents to control what and how they build / validate a solution. Finally, these are just templates, modify as necessary for your project needs.

**Table of Contents**

- [CODE](#code)
  - [CSS Styles](#css-styles)
  - [JavaScript Module](#javascript-module)
  - [Linux / Unix Shell Script](#linux--unix-shell-script)
  - [PowerShell Script](#powershell-script)
  - [Rust Module](#rust-module)
  - [Webpage](#webpage)
- [MARKDOWN](#markdown)
  - [Feature Request](#feature-request)
  - [Object-Oriented Analysis and Design (OOAD)](#object-oriented-analysis-and-design-ooad)
  - [Process](#process)
  - [README](#readme)
  - [Test Case](#test-case)

# CODE

The following are starter coding templates that either conform to the given languages SDK documentation tool or just has a comments section for good maintenance purposes.

## CSS Styles

CSS styles serve as the basis for styling an HTML webpage. It can create a rich User Interface experience to aid in developing either static website, Single Page Application (SPA), or a Progressive Web Application (PWA) taking full advantage of a near native experience without the hassle of an app store. The organization below is a guide in grouping your CSS in a way that allows for easy maintenance and overrides to flow appropriately.

```css
/*
===============================================================================
@file BRIEF ABOUT FILE
@author EMAIL / WEBSITE
@copyright © 2026 AUTHOR. All Rights Reserved.
@license MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge,  publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@history
- YYYY-MMM-DD:
@todos
1. Thing to do in file.
===============================================================================
*/

/* ========================================================================= */
/* [ROOT VARIABLES] ======================================================== */
/* ========================================================================= */


/* ========================================================================= */
/* [GLOBAL HTML TAG STYLES] ================================================ */
/* ========================================================================= */

/* ========================================================================= */
/* [CUSTOM HTML ELEMENT STYLES] ============================================ */
/* ========================================================================= */

/* ========================================================================= */
/* [ID TAG STYLES] ========================================================= */
/* ========================================================================= */

/* ========================================================================= */
/* [REUSABLE CLASS STYLES] ================================================= */
/* ========================================================================= */
```

## JavaScript Module

Any complicated JavaScript full-stack solution should utilize ES6 modules. This allows for segmenting code into organized chunks. The below template is validated via `typedoc` which universally makes the nicest documentation between the different JavaScript V8 runtimes and web pages alike. Extra information is stored within this example to allow for one-off module management. For larger projects, this additional information would be unnecessary. The `// @ts-check` at the top of the module is key for utilizing modern type checking within major code editors and linters.

```javascript
// @ts-check
// ============================================================================
/**
 * <mark>Add Image Tag if you have one.</mark>
 *
 * | Key       | Value                                                        |
 * | --------- | ------------------------------------------------------------ |
 * | AUTHOR    | EMAIL / WEBSITE                                              |
 * | COPYRIGHT | © YYYY NAME. All Rights Reserved.                            |
 * | VERSION   | v26.X.Y (Last Updated YYYY-DD-MM)                            |
 *
 * <mark>Introduce the module.</mark>
 *
 * # FEATURES
 *
 * <mark>Identify the important aspects of the project and what makes it cool.</mark>
 *
 * # GETTING STARTED
 *
 * <mark>Identify the steps necessary to be successful with the repo.</mark>
 *
 * # USAGE
 *
 * <mark>Identify how to use the repo once getting started is done.</mark>
 *
 * ## TODOS
 *
 * - <mark>Track things that need changing.</mark>
 *
 * # LICENSE
 *
 * <mark>Identify the license that governs this repo.</mark>
 *
 * @module starter_module
 */
// =============================================================================
// [MODULE CORE] ===============================================================
// =============================================================================

// Put your module privates here

// =============================================================================
// [PUBLIC API] ================================================================
// =============================================================================

// Put exports below here.
```

## Linux / Unix Shell Script

Every now and again you will need to build quick utilities in a terminal shell. The example below gives the ability to manage such a script whether it is a personal tool chain or represents a bigger DevOps solution. No individual versioning is captured but keeping a version history and to-do section is handy when you are individually managing the script, but it does not exist in source control repository.

```sh
#!/usr/bin/env bash
# =============================================================================
# FILE: WHAT IS THIS SCRIPT FOR
# AUTHOR: email / website
# COPYRIGHT: © YYYY NAME. All Rights Reserved.
# LICENSE: MIT License
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the 'Software'), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge,  publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included
# in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#
# HISTORY:
# - [YYYY-MMM-DD]:
# TODOS:
# 1. What to do.
# =============================================================================
function main {
  local VERSION = "vXX.Y.Z [Last Modified YYYY-MMM-DD]"
  # You can also break up the script with more functions making it very
  # versatile for writing complex BASH scripts for you UNIX / LINUX system.
  function sub_task {
    # See sub_task
  }

  # -------------------------------------------------------------------------
  # [MAIN] ------------------------------------------------------------------
  # -------------------------------------------------------------------------
  $action = $1
  if [ "$action" == "help" ]; then
    # Do something with the action.
    sub_task
  fi
}
main $@
```

## PowerShell Script

Same as the [Linux / Unit Shell Script](#linux--unix-shell-script) a Windows terminal shell offers PowerShell. Unlike traditional Linux / Unix shells utilize POSIX rules for passing strings, PowerShell offers Object parsing utilizing .NET core. What is even more powerful, is that PowerShell core can run on Linux / Unix shells as well-meaning you can create a cross-platform shell script.

It has all the modern programming language niceties wrapped into a shell environment. Its help system is fully integrated into the environment with the ability to build distributable modules or scripts via the PowerShell Gallery. To that end however, most users are just creating simple scripts to the example below follows the same paradigm as shell scripts with the PowerShell script. If you want to develop more complicated, scripts, visit PowerShell Learn for examples of organizing such scripts.

```PowerShell
#!/usr/bin/pwsh
# =============================================================================
$ABOUT_SCRIPT = @{
file = @"
What does the script do...
"@
author = "mark.shaffer@codemelted.com / dev.codemelted.com"
copyright = "© 2025 - 2026 Mark Shaffer. All Rights Reserved."
license = @"
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
"@
history = @"
- 2026-MMM-DD: What was modified.
"@
todos = @"
1. Things to do.
"@
}
# =============================================================================
function main {
  # You can also break up the script with more functions making it very
  # versatile for writing complex powershell scripts for you devops needs.
  function sub_task {
    # do sub_task work.
  }

  # Start defining the main of the script
  [string]$action = $args[0]
}
main @args
```

## Rust Module

Rust has a very powerful way of organizing modules. Understanding that module system helps to build powerful memory safe applications. To this end, when starting off, you can organize modules within a module source file. Each source file in a Rust project is a module that can be divided up with more modules. When the scope of this module grows to large, you can break it out into a more organized module project. But this serves as a good starting point. Delete sections not needed in the introductory header based on your companies coding standards.

```rust
// ============================================================================
//! | Key       | Value                                                       |
//! | --------- | ----------------------------------------------------------- |
//! | AUTHOR    | EMAIL / WEBITE.                                             |
//! | COPYRIGHT | © YYYY NAME. All Rights Reserved.                           |
//!
//! # FEATURES
//!
//! <mark>Identify the important aspects of the project and what makes it cool.</mark>
//!
//! # GETTING STARTED
//!
//! <mark>Identify the steps necessary to be successful with the repo.</mark>
//!
//! # USAGE
//!
//! <mark>Identify how to use the repo once getting started is done.</mark>
//!
//! # TODOS
//!
//! <mark>List of TODOs that need handling within the module.</mark>
//!
//! # LICENSE
//!
//! MIT License
//!
//! © YYYY NAME. All Rights Reserved.
//!
//! Permission is hereby granted, free of charge, to any person obtaining a
//! copy of this software and associated documentation files (the "Software"),
//! to deal in the Software without restriction, including without limitation
//! the rights to use, copy, modify, merge, publish, distribute, sublicense,
//! and/or sell copies of the Software, and to permit persons to whom the
//! Software is furnished to do so, subject to the following conditions:
//!
//! The above copyright notice and this permission notice shall be included in
//! all copies or substantial portions of the Software.
//!
//! THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//! IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//! FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//! THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//! LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//! FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//! DEALINGS IN THE SOFTWARE.
// ============================================================================
// [MODULE CORE IMPLEMENTATION] ===============================================
// ============================================================================
#![doc(html_logo_url =
  "https://codemelted.com/assets/favicon/apple-touch-icon.png")]

/// Say something about the module
mod module_core {
  // Implement you module public / private here.
  // Private module with pub items are only pub within the module file.
}

// ============================================================================
// [XXX MODULE IMPLEMENTATION] ================================================
// ============================================================================

/// Say something about the module
pub mod api {
  // Implement you module public / private here.
  // When the module is pub, it is accessible to other module files.
}
```

## Webpage

Identifies all the OpenGraph and Twitter card tags in order for sharing a page to preview properly within those apps. Also provides all the tag layouts for getting started on a simple webpage or building a complicated SPA / PWA solution.

```html
<!DOCTYPE html>
<!--
FILE: Tell me about the file and why it exists for this project
COPYRIGHT: Any copyright information or set / delete.
LICENSE: what license or set N/A or delete.
-->
<html lang="en"><head>
  <!-- Set the title of the page-->
  <title>TITLE</title>
  <meta property="og:title" content="TITLE">
  <meta name="twitter:title" content="TITLE">
  <!-- Set who authored the page-->
  <meta name="author" content="AUTHOR NAME">
  <meta name="twitter:site" content="@yourusername OR DELETE">
  <!-- Provide a description for your page-->
  <meta name="description" content="DESCRIPTION">
  <meta property="og:description" content="DESCRIPTION">
  <meta name="twitter:description" content="DESCRIPTION">
  <!-- Set Your Website Reference-->
  <meta property="og:url" content="YOUR WEBSITE REFERENCE">
  <meta name="twitter:image" content="https://yourwebsite.com">
  <meta property="og:image" content="https://yourwebsite.com">
  <!-- Set keywords in CSV format-->
  <meta name="keywords" content="KEYWORDS">
  <!-- Image Preview For Website-->
  <meta property="og:image" content="https://example.com" />
  <meta name="twitter:image" content="https://yoursite.com/image.png" />
  <!-- Set your Favicon -->
  <link rel="icon" type="image/x-icon" href="FAVICON_LOCATION.ico">
  <!-- Leave these alone -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta property="og:type" content="website" />
  <meta charset="UTF-8">
  <!-- Determine what you are doing below for loading resources-->
  <link rel="stylesheet" href="STYLE_SHEET.css">
  <style>
    /* Define some styles if not externally loaded */
  </style>

  <script src="LOAD A SCRIPT"></script>
  <script>
    // Define script behavior
  </script>
</head><body>
  <!-- Build the UI -->
  <script>
    // Define script behavior
  </script>
</body></html>
```

# MARKDOWN

With AI becoming a powerful tool within a software engineer's arsenal, it is important to apply sound software engineering principles to aid in what you are building. You should control the AI tool, not the other way around. The templates below serve different aspects of software engineering techniques whether utilizing AI or not.

Each of the markdown templates have a YAML header to support webpage generation via different tools. It is then proceeded with HTML `<center></center>` that has an optional `<img />` tag for a header image along with a `<h1></h1>` tag for a title. Finally, it is proceeded with a `**Table of Contents**` section for the breakdown of what is contained as sections. From there each template will identify the markdown header sections along with `<mark></mark>` tags explaining what information is utilized within the template.

## Feature Request

Before becoming a full-fledged software engineer, you will start a job working Jira tickets or analyzing Discrepancy (DR) / Problem Report (PR). In either event, when you are new to a system you have to apply Black Box / White Box techniques to determine what change you are making.

The template below provides two sections. The first is the *FUNCTIONAL ANALYSIS* to allow for fleshing out exactly what is needed to make the change complete. The second section is *NOTES*. This is a free-form section to capture any design elements or test changes to validate the change. This information can either "complete" the change or serve as information into larger artifacts within your development process. Hence, its free-form nature.

```markdown
---
title: "My Document Title"
date: YYY-MMM-DD
author: "Jane Doe"
description: ""
tags: []
categories:
---

<center>
  <mark>Project logo</mark>
  <h1>Project Title</h1>
</center>

<mark>Brief introduction to the feature being requested. Could be from a Jira board, assigned problem report, customer request, or the start of a bigger project. This focuses mainly functionality of a singular request and may serve as a bigger piece of a whole.</mark>

**Table of Contents**

- [FUNCTIONAL ANALYSIS](#functional-analysis)
  - [UC-1: Function Feature](#uc-1-function-feature)
- [NOTES](#notes)

# FUNCTIONAL ANALYSIS

<mark>An introductory use case model or other architecture diagram that may aid in visualizing the different requirements categories below.</mark>

<mark>Add a new model for each complex Function Feature that may need further pictorial and feature breakdown until it is at its lowest testable functional description.</mark>

## UC-1: Function Feature

<mark>IF Describing via Behavioral Driven Development (BDD) User Story Format</mark>

- **Description:** As a [who], I want [what], so that [why].
- **Scenario 1:** Describe the scenario
    - *Given:* Sets up the initial context, state, or preconditions of the system before any action happens.
    - *When:* Describes the specific action, event, or trigger performed by the user or system.
    - *Then:* Specifies the expected observable outcome or response after the action.
    - *And:* Extends any of the previous statements to add positive or multiple conditions, actions, or results.
    - *But:* Adds a negative condition, exception, or contrasting limitation to the preceding steps
- **Scenario 2:** Describe the scenario
    - *Given:* Sets up the initial context, state, or preconditions of the system before any action happens.
    - *When:* Describes the specific action, event, or trigger performed by the user or system.
    - *Then:* Specifies the expected observable outcome or response after the action.
    - *And:* Extends any of the previous statements to add positive or multiple conditions, actions, or results.
    - *But:* Adds a negative condition, exception, or contrasting limitation to the preceding steps

<mark>IF Describing via Use Case Scenario Format:</mark>

- **Description:** A description of what this use case is all about.
- **Actors:** Who / what is triggering this use case.
- **Trigger:** The ideal setup necessary for the use case scenario to run.
- **Main Success Scenario:** The primary, ideal sequence of steps where everything goes right and the user achieves their goal without errors
- **Alternate Flows:** Different paths or optional behaviors that still lead to success (e.g., a customer pays with PayPal instead of a credit card)
- **Exception Flows:** Paths handling errors, invalid inputs, or system failures (e.g., a declined credit card or an out-of-stock item)
- **Post-Condition:** The expectation when the main success scenario completes.

<mark>IF Describing via EARS Function Requirements Format:</mark>

- Ubiquitous (Always Active): The <system name> shall <system response> (e.g., The mobile phone shall have a mass of less than 150 grams
- State-Driven (Active During a State): While <state>, the <system name> shall <system response> (e.g., While the vehicle is in reverse, the system shall display the rear camera feed)
- Event-Driven (Triggered by an Event): When <trigger>, the <system name> shall <system response> (e.g., When the user presses the power button, the device shall turn on)
- Optional Features: Where <feature is present>, the <system name> shall <system response> (e.g., Where the navigation package is installed, the system shall display the map)
- Unwanted Behavior: If <unwanted trigger>, then the <system name> shall <system response> (e.g., If the password is entered incorrectly three times, then the system shall lock the account)

# NOTES

<mark>Add any specific notes that will aid in the implementation and validation of the given feature request. This can include UML artifacts, examples, test demonstration, etc. to satisfy the full implementation of the feature request.</mark>
```

## Object-Oriented Analysis and Design (OOAD)

From the book *Managing Software Requirements (A Use Case Approach) 2nd Ed* it provides a fully fleshed out template for performing a full Object-Oriented Analysis and Design utilizing use cases. To that end, the template has been tweaked to break out *FUNCTIONAL ANALYSIS* still utilizing a use case model as the introduction, but identifies the different ways of deriving and fleshing out functional behavior of a system. From there the *NON-FUNCTIONAL ANALYSIS* allows for the breakdown of all the different non-functional areas of a system usually forgotten or ignored. Finally, the *DESIGN ANALYSIS* allows for designing out the rest of the software / hardware / system boundaries to fully flesh out the design.

This template can be all encompassing or broken up into different OOAD markdown files for larger more complex systems. It is really up the software engineer in managing how this is broken up to make sense. The key is if you build it, keep in sync and up to date with the software solution you are building.

```markdown
---
title: "My Document Title"
date: YYY-MMM-DD
author: "Jane Doe"
description: ""
tags: []
categories:
---
<center>
  <mark>Company Logo If Available</mark>
  <h1>ID: Title</h1>
</center>

**Table of Contents**

- [INTRODUCTION](#introduction)
  - [Purpose](#purpose)
  - [Scope](#scope)
  - [Terms](#terms)
  - [References](#references)
- [FUNCTIONAL ANALYSIS](#functional-analysis)
  - [UC-1: Function Feature](#uc-1-function-feature)
- [NON-FUNCTIONAL ANALYSIS](#non-functional-analysis)
  - [Usability](#useability)
  - [Reliability](#reliability)
  - [Performance](#performance)
  - [Supportability](#supportability)
  - [Design Constraints](#design-constraints)
  - [Documentation](#documentation)
  - [Purchased Components](#purchased-components)
  - [Licensing and Security](#licensing-and-security)
  - [Legal, Copyright and Other Notices](#legal-copyright-and-other-notices)
  - [Applicable Standards](#applicable-standards)
  - [Internationalization and Localization](#internationalization-and-localization)
  - [Physical Deliverables](#physical-deliverables)
  - [Installation and Deployment](#installation-and-deployment)
- [DESIGN ANALYSIS](#design-analysis)
  - [Communication Interfaces](#communication-interfaces)
  - [Hardware Interfaces](#hardware-interfaces)
  - [Software Interfaces](#software-interfaces)
  - [User Interfaces](#user-interfaces)

# INTRODUCTION

## Purpose

<mark>The purpose outlines the reason for creating the process. It answers the question “why is this being done?” and provides direction, motivation, and clarity for all stakeholders involved. A well-defined purpose sets the overarching goals and desired outcomes, ensuring that everyone understands the intent behind the document.</mark>

## Scope

<mark>The scope specifies the boundaries, extent, and limitations of the process. It answers “what is included and what is excluded?” and defines the deliverables, tasks, responsibilities, and areas covered. Scope ensures that the project remains focused and manageable, preventing unnecessary expansion or deviation from the original goals.</mark>

## Terms

<mark>Breakdown of acronyms and definitions</mark>

## References

<mark>Any outside references that inform this breakdown.</mark>

# FUNCTIONAL ANALYSIS

<mark>An introductory use case model or other architecture diagram that may aid in visualizing the different requirements categories below.</mark>

<mark>Add a new model for each complex Function Feature that may need further pictorial and feature breakdown until it is at its lowest testable functional description.</mark>

## UC-1: Function Feature

<mark>IF Describing via Behavioral Driven Development (BDD) User Story Format</mark>

- **Description:** As a [who], I want [what], so that [why].
- **Scenario 1:** Describe the scenario
    - *Given:* Sets up the initial context, state, or preconditions of the system before any action happens.
    - *When:* Describes the specific action, event, or trigger performed by the user or system.
    - *Then:* Specifies the expected observable outcome or response after the action.
    - *And:* Extends any of the previous statements to add positive or multiple conditions, actions, or results.
    - *But:* Adds a negative condition, exception, or contrasting limitation to the preceding steps
- **Scenario 2:** Describe the scenario
    - *Given:* Sets up the initial context, state, or preconditions of the system before any action happens.
    - *When:* Describes the specific action, event, or trigger performed by the user or system.
    - *Then:* Specifies the expected observable outcome or response after the action.
    - *And:* Extends any of the previous statements to add positive or multiple conditions, actions, or results.
    - *But:* Adds a negative condition, exception, or contrasting limitation to the preceding steps

<mark>IF Describing via Use Case Scenario Format:</mark>

- **Description:** A description of what this use case is all about.
- **Actors:** Who / what is triggering this use case.
- **Trigger:** The ideal setup necessary for the use case scenario to run.
- **Main Success Scenario:** The primary, ideal sequence of steps where everything goes right and the user achieves their goal without errors
- **Alternate Flows:** Different paths or optional behaviors that still lead to success (e.g., a customer pays with PayPal instead of a credit card)
- **Exception Flows:** Paths handling errors, invalid inputs, or system failures (e.g., a declined credit card or an out-of-stock item)
- **Post-Condition:** The expectation when the main success scenario completes.

<mark>IF Describing via EARS Function Requirements Format:</mark>

- Ubiquitous (Always Active): The <system name> shall <system response> (e.g., The mobile phone shall have a mass of less than 150 grams
- State-Driven (Active During a State): While <state>, the <system name> shall <system response> (e.g., While the vehicle is in reverse, the system shall display the rear camera feed)
- Event-Driven (Triggered by an Event): When <trigger>, the <system name> shall <system response> (e.g., When the user presses the power button, the device shall turn on)
- Optional Features: Where <feature is present>, the <system name> shall <system response> (e.g., Where the navigation package is installed, the system shall display the map)
- Unwanted Behavior: If <unwanted trigger>, then the <system name> shall <system response> (e.g., If the password is entered incorrectly three times, then the system shall lock the account)

# NON-FUNCTIONAL ANALYSIS

## Usability

<mark>State the requirements that affect usability.</mark>

## Reliability

<mark>State the requirements for reliability</mark>

## Performance

<mark>State the performance characteristics of the system, expressed quantitatively where possible and related to use cases where applicable.</mark>

## Supportability

<mark>State the requirements that enhance system supportability or maintainability</mark>

## Design Constraints

<mark>State the design or development constraints imposed on the system or development process.</mark>

## Documentation

<mark>State the requirements or user and/or administrator documentation.</mark>

## Purchased Components

<mark>List the purchased components used with the system, licensing or usage restrictions, and compatibility/interoperability requirements</mark>

## Licensing and Security

<mark>Describe the licensing and usage enforcement requirements or other restrictions for usage, security, and accessibility</mark>

## Legal, Copyright and Other Notices

<mark>Describe the licensing and usage enforcement requirements or other restrictions for usage, security, and accessibility.</mark>

## Applicable Standards

<mark>Reference any applicable standards and the specific sections of any such standards that apply.</mark>

## Internationalization and Localization

<mark>State any requirements for support and application of different user languages and dialects</mark>

## Physical Deliverables

<mark>Define any specific deliverable artifacts required by the user or customer</mark>

## Installation and Deployment

<mark>Describe any specific deliverable artifacts required by the user or customer</mark>

# DESIGN ANALYSIS

<mark>Define the interfaces that must be supported by the application. Utilize necessary UML and modeling definitions to reflect it.</mark>

## Communication Interfaces

## Hardware Interfaces

## Software Interfaces

## User Interfaces

```

## Process

> CMMI stands for Capability Maturity Model Integration. It is a global framework designed to help businesses improve their performance, build key capabilities, and measure work processes [CMMI Institute](https://cmmiinstitute.com/cmmi/intro)

Per the *CMMI: Guidelines for Process Integration and Product Improvement (2nd Ed)*, any repeating process an organization does should be documented. The CMMI provides a framework defining levels 1 through 5 for an organizations process maturity. To that end, the template below serves a starting point for documenting these processes. It also serves as a good starting point for an AI plan to scope what the AI is to perform and how to do it.

```markdown
---
title: "My Document Title"
date: YYY-MMM-DD
author: "Jane Doe"
description: ""
tags: []
categories:
---

<center>
  <mark>Company Logo If Available</mark>
  <h1>ID: Title</h1>
</center>

**Table of Contents**

- [INTRODUCTION](#introduction)
  - [Purpose](#purpose)
  - [Scope](#scope)
  - [Terms](#terms)
  - [References](#references)
- [PROCESS](#process)
  - [Role](#role)
  - [Trigger](#trigger)
  - [Inputs](#inputs)
  - [Deliverables](#deliverables)
  - [Procedure](#procedure)

# INTRODUCTION

## Purpose

<mark>The purpose outlines the reason for creating the process. It answers the question “why is this being done?” and provides direction, motivation, and clarity for all stakeholders involved. A well-defined purpose sets the overarching goals and desired outcomes, ensuring that everyone understands the intent behind the document.</mark>

## Scope

<mark>The scope specifies the boundaries, extent, and limitations of the process. It answers “what is included and what is excluded?” and defines the deliverables, tasks, responsibilities, and areas covered. Scope ensures that the project remains focused and manageable, preventing unnecessary expansion or deviation from the original goals.</mark>

## Terms

<mark>Breakdown of acronyms and definitions</mark>

## References

<mark>Any outside references that inform this breakdown.</mark>

# PROCESS

<mark>Mermaid diagram of the process flow</mark>

## Roles

<mark>Identify the participants within this process and what they perform</mark>

## Inputs

<mark>Identify the inputs to this process to allow it to function.</mark>

## Deliverables

<mark>Identify the deliverable artifacts when this process is completed.</mark>

## Procedure

1. The thing
2. The other thing
```

## README

When first making a software repository for a new software component, it is good to have a `README.md` file that introduces the project. It breaks into four sections. *FEATURES* introduces what is important aspects of the project and what makes it useful. The *GETTING STARTED* identifies how you utilize the repo to be successful. Finally, the *USAGE* begins the basic usage of the repo with larger SDK documentation giving the greater context of full usage of the repo software solution.

```markdown
---
title: "My Document Title"
date: YYY-MMM-DD
author: "Jane Doe"
description: ""
tags: []
categories:
---

<center>
  <mark>Project logo</mark>
  <h1>Project Title</h1>
</center>

<mark>Introduce the project and why it is important</mark>

**Table of Contents**

- [FEATURES](#features)
- [GETTING STARTED](#getting-started)
- [USAGE](#usage)
- [LICENSE](#license)

# FEATURES

<mark>Identify the important aspects of the project and what makes it cool.</mark>

# GETTING STARTED

<mark>Identify the steps necessary to be successful with the repo.</mark>

# USAGE

<mark>Identify how to use the repo once getting started is done.</mark>

# LICENSE

<mark>Identify the license that governs this repo.</mark>
```

## Test Case

A test case serves as a black-box technique for validating software systems. Usually breaking into Functional (test of system functional requirements) and Regression (non-degradation validation between releases) Test Cases. These can serve as a manual executed by human or with modern tooling, an automated test suite. In either event, this serves a good starting point for these types of tests. These also usually in larger software / system organizations, map to specific requirements in a larger traceability matrix.

```markdown
---
title: "My Document Title"
date: YYY-MMM-DD
author: "Jane Doe"
description: ""
tags: []
categories:
---

<center>
  <mark>Company Logo If Available</mark>
  <h1>ID: Title</h1>
</center>

**Table of Contents**

- [APPROACH](#approach)
  - [Objectives](#objectives)
  - [Limitations](#limitations)
- [SETUP](#setup)
  - [Pre-Conditions](#pre-conditions)
  - [Test Data](#test-data)
  - [Post-Conditions](#post-conditions)
- [PROCEDURE](#procedure)

# APPROACH

## Objectives

<mark>The specific objectives to be met during testing usually lining up to requirements.</mark>

## Limitations

<mark>Any limitations associated with executing this test case.</mark>

# SETUP

## Pre-Conditions

<mark>The required system state or setup before starting.</mark>

## Test Data

<mark>Specific inputs, usernames, or files needed.</mark>

## Post-Conditions

<mark>The final state of the system when PROCEDURE is completed</mark>

# PROCEDURE

<mark>Step: Clear, numbered actions to perform.</mark>
<mark>Action: The action to perform</mark>
<mark>Expected Result: How the system should behave.</mark>
<mark>Actual Result: What the system actually did (filled during testing).</mark>
<mark>Status: Pass, Fail, or Blocked</mark>

| Step | Action | Expected Result | Actual Result | Status |
| ---- | ------ | --------------- | ------------- | :----: |
```

<cm-page-footer></cm-page-footer>