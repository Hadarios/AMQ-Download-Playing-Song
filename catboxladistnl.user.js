// ==UserScript==
// @name         Catbox ladist to nl
// @namespace    https://github.com/Hadarios
// @version      0.0.1
// @description  Use nl instead of ladist on catbox
// @author       Hadarios
// @match        https://ladist1.catbox.video/*
// @exclude      https://ladist1.catbox.video/*?*
// @downloadURL  https://github.com/Hadarios/AMQ-Scripts/raw/master/catboxladistnl.user.js
// @updateURL    https://github.com/Hadarios/AMQ-Scripts/raw/master/catboxladistnl.user.js
// ==/UserScript==

'use strict';

//get current URL
let url = document.URL;

window.location.href = url.replace("ladist1", "nl");
