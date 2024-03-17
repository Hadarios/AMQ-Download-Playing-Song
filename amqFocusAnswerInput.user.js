// ==UserScript==
// @name         AMQ Focus Answer Input
// @namespace    https://github.com/Hadarios
// @version      1.0.0
// @description  Focus answer input box on game start
// @author       Hadarios
// @match        https://animemusicquiz.com/*
// @require      https://github.com/joske2865/AMQ-Scripts/raw/master/common/amqScriptInfo.js
// @downloadURL  https://github.com/Hadarios/AMQ-Scripts/raw/master/amqFocusAnswerInput.user.js
// @updateURL    https://github.com/Hadarios/AMQ-Scripts/raw/master/amqFocusAnswerInput.user.js
// ==/UserScript==

let version = "1.0.0";

let start = false;

new Listener("quiz ready", (payload) => {
    setTimeout(function() {
        start = true;
    }, 200);
}).bindListener();

new Listener("play next song", (payload) => {
    setTimeout(function() {
        if (start) {
            $("#qpAnswerInput")[0].focus();
            start = false;
        }
    }, 200);
}).bindListener();

AMQ_addScriptData({
    name: "AMAMQ Focus Answer Input",
    author: "Hadarios",
    version: version,
    link: "https://github.com/Hadarios/AMQ-Scripts/raw/master/amqFocusAnswerInput.user.js",
    description: `<p>Focus answer input box on game start</p>`
})

