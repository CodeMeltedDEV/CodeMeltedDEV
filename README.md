<center>
  <img style="width: px; "src="https://codemelted.com/assets/favicon/codemelted-js/android-chrome-192x192.png" />
  <h1>About the codemelted.js Project</h1>
</center>

"Write once, run anywhere (WORA)" was the famous slogan made by Sun Microsystems in 1995. At the time, this technology allowed for easy full stack engineering allowing you to target dedicated workstations and on premise servers. So long as a Java Runtime Environment existed, you could run your code. Java was unable to keep to their slogan as web browsers became more advanced, mobile devices became ubiquitous, and companies no longer required dedicated servers.

The **codemelted.js Project** aims to deliver on this full stack engineering premise allowing software engineers to easily build fullstack software solutions. Utilizing the `codemelted.js` ES6 module, a software engineer can target Browser / Deno / Worker JavaScript runtimes to build these fullstack solutions. Software Engineers have their choice of JavaScript or TypeScript for these solutions. A software engineer can also utilize the `codemelted.js` module within Bun / Node runtimes and get a subset of the functionality within those projects.

This fullstack solution is accomplished by the `codemelted.js` module implementing 14 domain specific use cases. These represent the most common software engineers face. The `codemelted.js` module implements Browser / Deno API wrappers to facilitate these use cases. When a use case cannot be directly fulfilled via Browser / Deno API wrappers, the Rust `codemelted_lib` static library serves as a binding to the `codemelted.js` module and native command.

**Table of Contents**

- [ES6 Consumable Module](#es6-consumable-module)
- [Command Line Interface (CLI)](#command-line-interface-cli)
- [Support](#support)

# ES6 Consumable Module

<center><img src="https://js.codemelted.com/models/use-case-model.drawio.png" /></center>

**Application Development**

The table belows explains the types of apps you can build when consuming the `codemelted.js` module.

Target        | Description
------------- | -----------
CLI / SERVICE | With access to multiple Deno / native bindings, you can utilize the Deno runtime to compile or script your own custom CLI solution with TypeScript
CLOUD   | Download the `codemelted.js` module and include it within your own Deno / Node project to take advantage of the domain use cases in your next cloud solution. <br>*NOTE: Certain use cases won't be available in a V8 runtimes. See codemelted.js Project SDK documentation for details.*
DESKTOP / WEB | Include the module into your next Single Page App (SPA) / Multi-Page App (MPA) / Progressive Web App (PWA) solution. The ultimate way to get your app to your clients without needing an app store. And with the new `deno --desktop` option, you can bundle that site as an embedded WebView for Mac / Linux / Windows operating systems.

# Command Line Interface (CLI)

<center><img src="https://js.codemelted.com/models/cli-model.drawio.png" /></center>

**NOTES:**

- The `codemelted` command provides a native CLI available on any BSD / Mac / Linux / Windows operating system.
- This facilitates DevOps bash / PowerShell scripting by providing actions that work the same regardless of operating system.
- It also provides commands specific to developer actions when building desktop apps / dedicated compiled services.

# Support

This project does not want to utilize ads. To that end, any support for this project is appreciated. We are just getting started so follow the links below to track / support this project.

- <a href="https://www.buymeacoffee.com/codemelteddev"><img src="https://codemelted.com/assets/images/icon-buy-me-a-coffee.png" height="35px" /> Buy Me A Coffee</a>: Direct support for the CodeMeltedDEV content and services offered via the **codemelted.js Project**.
- <a href="https://github.com/sponsors/CodeMeltedDEV"><img src="https://codemelted.com/assets/images/icon-github.png" height="35px" /> GitHub Sponsorship</a>: Direct support for the **codemelted.js Project** either through a one time donation or a monthly subscription.
- <a href="https://dev.codemelted.com"><img src="https://codemelted.com/assets/favicon/apple-touch-icon.png" height="35px" /> CodeMeltedDEV Website</a>: Main website where I will blog about this project along with other interest and utilize this project to build out the with features and you can find me for other socials.
