---
title: "Changed Log"
date: 2026-OCT-11
author: "Mark Shaffer"
description: "The codemelted.js Project Change Log with links to the releases."
tags: [Software Engineering, Developer, Programmer, ACM, IEEE]
image: "https://https://codemelted.com/assets/images/logo-codemelted-dev.png"
twitter_site: "@CodeMeltedDEV"
---
<cm-page-header title="Change Log"></cm-page-header>

The *codemelted.js Project Change Log* reflects updates to the `codemelted.js` / `codemelted.rs` along with update to the `js.codemelted.com` PWA.

# v26.0.0-alpha (2026-OCT-02)

[Download](https://github.com/CodeMeltedDEV/codemelted.js/releases#release-v26.0.0-alpha)

The project is just getting started. We are snapping a chalk line as we begin the engineering journey for this project. So for now, consider the `codemelted.js` module in an alpha state. If you look within the guts of it, you will see a lot of prototyping and thinking through problems. Time to apply real software engineering to it.

## codemelted Rust Module

- Tool chain for building a dynamic library in place.
- Basic layout for a Foreign Function Interface (FFI) defined.
- Will need to begin massive refactor to bring in old work for the use cases.

## codemelted JavaScript Module

- Developed series of custom HTML elements to begin utilizing on the PWA.
- Ensured testing passes.
- Removed all traces of Bun / Deno / Node. This will be a browser / worker only module.
- Ensure the SDK produces mostly usable documentation. It may have issues.

## Website (PWA)

- Got site documents fully organized.
- Identified the mission of the project.
- Applied a Material3 theme to the TypeDoc.
- Setup overall app structure to consume the newly built custom components.
- This included a page header, a bottom app toolbar, and a print button.

<cm-page-footer></cm-page-footer>