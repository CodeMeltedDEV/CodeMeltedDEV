---
title: "Module Validation"
date: 2026-OCT-11
author: "Mark Shaffer"
description: "Represents the cmocha / chai tests validate the codemelted.js module from within the Browser runtime."
tags: [JavaScript, web, mocha, chai, test runner]
image: "https://codemelted.com/assets/images/logo-codemelted-dev.png"
twitter_site: "@CodeMeltedDEV"
---

<cm-page-header title="Module Validation"></cm-page-header>

<center>
  <button style="cursor: pointer;" onclick="open_test('/tests/browser-tester.html');">codemelted.js Browser Tester</button>
  <br><br>
</center>

<div style="height: 0px; overflow: hidden; padding-bottom: 1024px; position: relative;">
  <iframe id="frm_test" allowfullscreen="" src="" style="border: 0; height: 100%; left: 0; position: absolute; top: 0; width: 100%;"></iframe>
</div>

<script>
  function open_test(url) {
    document.getElementById("frm_test").src = url;
  }
  open_test("/tests/browser-tester.html");
</script>

<cm-page-footer></cm-page-footer>