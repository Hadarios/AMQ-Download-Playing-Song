// ==UserScript==
// @name         Download Buttons for AnisongDB
// @namespace    https://github.com/Hadarios
// @version      0.0.1
// @description  Adds download buttons to AnisongDB, MUST BE USED WITH ITS HELPER : https://github.com/Hadarios/AMQ-Scripts/raw/main/catboxDownloadHelper.user.js
// @author       Hadarios
// @match        https://anisongdb.com
// @icon         https://www.google.com/s2/favicons?sz=64&domain=anisongdb.com
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @downloadURL  https://github.com/Hadarios/AMQ-Scripts/raw/main/downloadSongAnisongdb.user.js
// @updateURL    https://github.com/Hadarios/AMQ-Scripts/raw/main/downloadSongAnisongdb.user.js
// ==/UserScript==

XMLHttpRequest.prototype.nativeOpen = XMLHttpRequest.prototype.open;

XMLHttpRequest.prototype.customOpen = function(...args) {

    setTimeout(() => {
        addDownloadButton();
    }, 1500);

    return this.nativeOpen(...args);
}

XMLHttpRequest.prototype.open = XMLHttpRequest.prototype.customOpen;

setTimeout(() => {
    addDownloadButton();
}, 500);

function addDownloadButton() {
    $('.fa-plus').click(function() {
        if ($("#qpDownloadSong").length != 0) {
            return;
        }

        var songInfo = $("span[title=\"Copy song infos to clipboard\"]").text();
        var song = songInfo.match(/\"(.*)\" by/i)[1]
        var artist = songInfo.match(/\" by (.*)/i)[1]
        var animeInfo = $("#modal-header").text();
        var anime = animeInfo.match(/(.*) \(.*\)/i)[1]
        var url = $("#modal-mp3-link").text();

        let type;

        $("td").each(function() {
            if ($(this).text() === song) {
                $(this).parent().children().each(function () {
                    if ($(this).text() === anime) {
                        $(this).parent().children().each(function () {
                            var text = $(this).text();
                            if (text.includes("Insert Song") || /Opening [0-9]+/.test(text) || /Ending [0-9]+/.test(text)) {
                                type = text;
                            }
                        })
                    }
                })
            }
        })

        $("p[title=\"Copy mp3 link to clipboard\"]")
            .parent()
            .prepend($("<a>Download</a>")
                     .attr('id', 'qpDownloadSong')
                     .attr('target', '_blank')
                     .attr('href', url + "?anime=" + anime + "&song=" + song + "&artist=" + artist + "&type=" + type)
                     .addClass("textLink")
                    );
    });
}
