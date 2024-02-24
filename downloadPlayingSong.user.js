// ==UserScript==
// @name         AMQ Download Playing Song
// @namespace    https://github.com/Hadarios
// @version      0.0.2
// @description  Downloads the currently playing song during a quiz on AMQ, MUST BE USED WITH ITS HELPER : https://github.com/Hadarios/AMQ-Scripts/raw/main/catboxDownloadHelper.user.js
// @author       Hadarios
// @match        https://animemusicquiz.com/*
// @require      https://cdn.jsdelivr.net/npm/@mattbasta/browser-id3-writer@3.0.8/dist/browser-id3-writer.min.js
// @require      https://raw.githubusercontent.com/eligrey/FileSaver.js/master/dist/FileSaver.min.js
// @require      https://github.com/joske2865/AMQ-Scripts/raw/master/common/amqScriptInfo.js
// @downloadURL  https://github.com/Hadarios/AMQ-Scripts/raw/main/downloadPlayingSong.user.js
// @updateURL    https://github.com/Hadarios/AMQ-Scripts/raw/main/downloadPlayingSong.user.js
// ==/UserScript==

const version = "0.0.2"

// don't load on login page
if (document.getElementById("startPage")) return;

// Wait until the LOADING... screen is hidden and load script
let loadInterval = setInterval(() => {
    if (document.getElementById("loadingScreen").classList.contains("hidden")) {
        setup();
        clearInterval(loadInterval);
    }
}, 500);

function setup() {
    // Add download button to Song Info
    $("#qpSongInfoLinkRow")
        .prepend($("<i></i>")
                 .attr('id', 'qpDownloadSong')
                 .addClass("fa fa-download")
                );

    // add on click event to download button
    $("#qpDownloadSong").on("click", function(){
        downloadSong();
    });
}

// Declare variables
let artist;
let anime;
let song;
let type;
let urls;

// When answer is revealed, set variables
new Listener("answer results", (result) => {
    setTimeout(function() {
        // Get song info from payload
        artist = result.songInfo.artist;
        anime = result.songInfo.animeNames.romaji;
        song = result.songInfo.songName;
        type = result.songInfo.type === 3 ? "Insert" : (result.songInfo.type === 2 ? "Ending " + result.songInfo.typeNumber : "Opening " + result.songInfo.typeNumber);
        urls = result.songInfo.videoTargetMap;

    }, 200);
}).bindListener();

function downloadSong() {
    let url;
    // if there is an MP3 upload, use this url
    if (urls["catbox"].hasOwnProperty("0")) {
        console.log("in if");
        url = "https://ladist1.catbox.video/" + urls["catbox"]["0"];
    }
    // else, display message and return
    else {
        console.log("in else");
        gameChat.systemMessage("No MP3 upload is available for this song.")
        return;
    }

    // open
    window.open(url + "?anime=" + anime + "&song=" + song + "&artist=" + artist + "&type=" + type);
}

AMQ_addScriptData({
    name: "AMQ Download Playing Song",
    author: "Hadarios",
    version: version,
    link: "https://github.com/Hadarios/AMQ-Scripts/raw/main/downloadPlayingSong.user.js",
    description: `<p>Downloads the currently playing song during a quiz on AMQ</p><p>MUST BE USED WITH ITS HELPER : <a target="_blank" href="https://github.com/Hadarios/AMQ-Scripts/raw/main/catboxDownloadHelper.user.js">https://github.com/Hadarios/AMQ-Scripts/raw/main/catboxDownloadHelper.user.js</a></p>`
})
