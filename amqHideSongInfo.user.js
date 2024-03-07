// ==UserScript==
// @name         AMQ Hide Song Info
// @namespace    https://github.com/Hadarios
// @version      1.0.0
// @description  Hides Song Info during guess phase
// @author       Hadarios
// @match        https://animemusicquiz.com/*
// @require      https://github.com/joske2865/AMQ-Scripts/raw/master/common/amqScriptInfo.js
// @downloadURL  https://github.com/Hadarios/AMQ-Scripts/raw/master/amqHideSongInfo.user.js
// @updateURL    https://github.com/Hadarios/AMQ-Scripts/raw/master/amqHideSongInfo.user.js
// ==/UserScript==

let version = "1.0.0";

new Listener("play next song", (payload) => {
    setTimeout(function() {
        console.log("foo");
        $("#qpSongInfoContainer").addClass("hide");
    }, 200);
}).bindListener();

new Listener("answer results", (payload) => {
    setTimeout(function() {
        console.log("bar");
        $("#qpSongInfoContainer").removeClass("hide");
    }, 200);
}).bindListener();

AMQ_addScriptData({
    name: "AMQ Hide Song Info",
    author: "Hadarios",
    version: version,
    link: "https://github.com/Hadarios/AMQ-Scripts/raw/master/amqNoAFKKick.user.js",
    description: `<p>Hides Song Info during guess phase</p>`
})
