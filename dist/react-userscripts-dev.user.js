// ==UserScript==
// @name     React Userscripts dev
// @version  1.1
// @description Development mode for React Userscripts.
// @include https://*baidu.com/*
// @grant    none
// ==/UserScript==


"use strict";

function log(...args) {
    console.log("Userscript:", ...args);
}

log("Dev mode started")

async function main() {
  log("Got Dev script")
  const script = document.createElement('script');
  script.src = 'http://localhost:8124/static/js/main.js'
  document.body.append(script)
  log("Dev script evaled")
  
}

// Make sure we run once at the start
main.bind({})().catch(e => {
    log("ERROR", e);
});
