// ==UserScript==
// @name         AMQ Download Playing Song Helper
// @namespace    https://github.com/Hadarios
// @version      0.0.1
// @description  Download directly from catbox because CORS
// @author       Hadarios
// @match        https://*.catbox.video/*?*
// @require      https://cdn.jsdelivr.net/npm/@mattbasta/browser-id3-writer@3.0.8/dist/browser-id3-writer.min.js
// @require      https://raw.githubusercontent.com/eligrey/FileSaver.js/master/dist/FileSaver.min.js
// @downloadURL  https://github.com/Hadarios/AMQ-Download-Playing-Song/raw/main/helper.js
// @updateURL    https://github.com/Hadarios/AMQ-Download-Playing-Song/raw/main/helper.js
// ==/UserScript==

//get current URL
let url = document.URL + '&';


// get all arguments from URL
let artist = decodeURI(url.match (/[\?\&]artist=([^\&\#]+)[\&\#]/i) [1].replace(/[\/\\\*\|:\?\"<>]+/g, ''));
let anime = decodeURI(url.match (/[\?\&]anime=([^\&\#]+)[\&\#]/i) [1].replace(/[\/\\\*\|:\?\"<>]+/g, ''));
let song = decodeURI(url.match (/[\?\&]song=([^\&\#]+)[\&\#]/i) [1].replace(/[\/\\\*\|:\?\"<>]+/g, ''));
let type = decodeURI(url.match (/[\?\&]type=([^\&\#]+)[\&\#]/i) [1].replace(/[\/\\\*\|:\?\"<>]+/g, ''));


// pause the player just in case
var v = document.querySelector("video").pause();


// fetch the file
const request = fetch(url)
.then( request => {
    if (!request.ok) {
        // handle error
        console.error("An error has occured while trying to fetch the song (" + request.status + ")");
        console.log(request);
        return;
    }
    // make an arraybuffer from the request for ID3Writer
    request.arrayBuffer().then(arrayBuffer => {
        // create writer
        const writer = new ID3Writer(arrayBuffer);

        // add ID3 tags
        writer
            .setFrame('TIT2', song + " (" + anime + " - " + type + ")")
            .setFrame('TPE1', [artist])
        writer.addTag();

        // save file
        saveAs(writer.getBlob(), anime + " - " + type + " (" + song + " by " + artist + ")");

        // wait a bit before closing tab for save to start
        setTimeout(function(){
            close();
        }, 100);
    });
});
