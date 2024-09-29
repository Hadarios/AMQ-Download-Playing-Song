// ==UserScript==
// @name         AMQ No AFK Kick
// @namespace    https://github.com/Hadarios
// @version      1.0.2
// @description  Prevents the game from kicking you
// @author       Hadarios
// @match        https://*.animemusicquiz.com/*
// @require      https://github.com/joske2865/AMQ-Scripts/raw/master/common/amqScriptInfo.js
// @downloadURL  https://github.com/Hadarios/AMQ-Scripts/raw/master/amqNoAFKKick.user.js
// @updateURL    https://github.com/Hadarios/AMQ-Scripts/raw/master/amqNoAFKKick.user.js
// ==/UserScript==

let version = "1.0.2";

// don't load on login page
if (document.getElementById('startPage')) return;

// Wait until the LOADING... screen is hidden and load script
let loadInterval = setInterval(() => {
    if (document.getElementById("loadingScreen").classList.contains("hidden")) {
        setup();
        clearInterval(loadInterval);
    }
}, 500);

function setup()
{
    // reset timers every minute
    setInterval(() => {
        // call setup again to reset timers
        afkKicker.setup();

        // check if is host before clearing to avoid error
        if (afkKicker.hostAfkWarningTimeout != null)
        {
            afkKicker.clearHostTimeout();
        }
    }, 1 * 60 * 1000);
}

AMQ_addScriptData({
    name: "AMQ No AFK Kick",
    author: "Hadarios",
    version: version,
    link: "https://github.com/Hadarios/AMQ-Scripts/raw/master/amqNoAFKKick.user.js",
    description: `<p>Prevents the game from kicking you</p>`
})
