// ==UserScript==
// @name         AMQ Disable Artist Hover
// @namespace    https://github.com/Hadarios
// @version      1.0.0
// @description  Disables the floating window that appears when you hover over an artist
// @author       Hadarios
// @match        https://animemusicquiz.com/*
// @require      https://github.com/joske2865/AMQ-Scripts/raw/master/common/amqScriptInfo.js
// @downloadURL  https://github.com/Hadarios/AMQ-Scripts/raw/master/amqDisableArtistHover.user.js
// @updateURL    https://github.com/Hadarios/AMQ-Scripts/raw/master/amqDisableArtistHover.user.js
// ==/UserScript==

let version = "1.0.0";

function createArtistHoverFromHoverDescription(artistHoverInformation, $trigger, delay, $container, searchCallback) {
    return;
}

// Source of the function overwrite method : https://stackoverflow.com/questions/21271997/how-to-overwrite-a-function-using-a-userscript

function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
    var D                                   = document;
    var scriptNode                          = D.createElement ('script');
    if (runOnLoad) {
        scriptNode.addEventListener ("load", runOnLoad, false);
    }
    scriptNode.type                         = "text/javascript";
    if (text)       scriptNode.textContent  = text;
    if (s_URL)      scriptNode.src          = s_URL;
    if (funcToRun)  scriptNode.textContent  = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}


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
    addJS_Node (createArtistHoverFromHoverDescription);
}

AMQ_addScriptData({
    name: "AMQ Disable Artist Hover",
    author: "Hadarios",
    version: version,
    link: "https://github.com/Hadarios/AMQ-Scripts/raw/master/amqDisableArtistHover.user.js",
    description: `<p>Disables the floating window that appears when you hover over an artist</p>`
})
