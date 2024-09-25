// ==UserScript==
// @name         AMQ Sort Song Library
// @namespace    https://github.com/Hadarios
// @version      1.0.0
// @description  Sorts the game's song library by most songs in entry and exports it as a txt file
// @author       Hadarios
// @match        https://animemusicquiz.com/*
// @require      https://github.com/joske2865/AMQ-Scripts/raw/master/common/amqScriptInfo.js
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @downloadURL  https://github.com/Hadarios/AMQ-Scripts/raw/master/amqSortSongLibrary.user.js
// @updateURL    https://github.com/Hadarios/AMQ-Scripts/raw/master/amqSortSongLibrary.user.js
// ==/UserScript==

'use strict';

let version = "1.0.0";

const entries = [];
const songCounts = [];
const ids = [];

let tempIds;
let tempCounts;
let tempEntries;

let sortedCounts;
let sortedEntries;

let fillFinished = false;

// don't load on login page
if (document.getElementById('startPage')) return;

// Wait until the LOADING... screen is hidden and load script
let loadInterval = setInterval(() => {
    if (document.getElementById("loadingScreen").classList.contains("hidden")) {
        setup();
        clearInterval(loadInterval);
    }
}, 500);

function setup() {
    const h = ($("#elExpandButton").css("height"));
    let button = $('<div id="elExportSorted" class="topRightBackButton leftRightButtonTop clickAble"> <p>Export sorted</p> </div>').css("margin-top", h).css("width", "185px").css("padding-left", "5px").hover(function() {
        $(this).css("background-color","#6d6d6d")
    }, function() {
        $(this).css("background-color","#1b1b1b")
    });

    $("#elExpandButton").after(button);

    $("#elExportSorted").on("click", function(){
        sort();
    });
}

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}

function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++) {
        if (arr[i] === val)
            indexes.push(i);
    }
    return indexes;
}

function fillArrays()
{
    $("#libraryClusterId0").children(".elAnimeEntry").each(($i, $el) => {
        ids.push(Number($($el).attr("data-uniqueid")));

        entries.push($($el).find(".elAnimeEntryNameInner").first().text());

        let count = 0;
        $($el).find(".elAnimeEntrySongCount").each(($i, $count) => {
            count += Number($($count).text().split(' ')[1]);
        })
        songCounts.push(count);
    })

    if ($(".clusterize-extra-row.clusterize-bottom-space").length) {
        $("#libraryClusterId0").children(".elAnimeEntry").last()[0].scrollIntoView({ block: 'nearest', inline: 'start' });
        setTimeout(() => fillArrays(), 500);
    }
    else
        fillFinished = true;
}

function cleanArrays()
{
    const keys = Array.from(ids.keys()).sort((a, b) => ids[a] - ids[b]);

    tempCounts = keys.map(i => songCounts[i]);
    tempEntries = keys.map(i => entries[i]);
    tempIds = keys.map(i => ids[i]);

    for(let i = 0; i < tempIds.length - 1; i++)
    {
        if (tempIds[i] === tempIds[i + 1])
        {
            tempIds.splice(i, 1);
            tempEntries.splice(i, 1);
            tempCounts.splice(i, 1);
            i--;
        }
    }
}

function sort2()
{
    cleanArrays()

    for (let i = 0; i < tempEntries.length; i++) {
        const foundIndexes = getAllIndexes(tempEntries, tempEntries[i]);
        if (foundIndexes.length > 1) {
            for (let j = foundIndexes.length - 1; j > 0; j--) {
                let k = foundIndexes[j];
                tempCounts[i] += tempCounts[k];
                tempCounts.splice(k, 1);
                tempEntries.splice(k, 1);
            }
        }
    }
    const keys = Array.from(tempCounts.keys()).sort((a, b) => tempCounts[b] - tempCounts[a]);

    sortedCounts = keys.map(i => tempCounts[i]);
    sortedEntries = keys.map(i => tempEntries[i]);

    downloadSorted();
}

function sort()
{
    fillFinished = false
    fillArrays();

    let fillInterval = setInterval(() => {
        if (fillFinished) {
            clearInterval(fillInterval);
            sort2();
        }
    }, 500);
}

function downloadSorted() {
    let content = "";

    for (let i = 0; i < sortedEntries.length; i++) {
        content += `${sortedEntries[i]} : ${sortedCounts[i]}\n`;
    }

    uri = "data:application/octet-stream," + encodeURIComponent(content);

    downloadURI(uri, "Sorted entries.txt");
}

AMQ_addScriptData({
    name: "AMQ Sort Song Library",
    author: "Hadarios",
    version: version,
    link: "https://github.com/Hadarios/AMQ-Scripts/raw/master/amqSortSongLibrary.user.js",
    description: `<p>Sorts the game's song library by most songs in entry and exports it as a txt file</p>`
})
