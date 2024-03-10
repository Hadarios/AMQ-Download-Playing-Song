// ==UserScript==
// @name         AMQ Update Vintages
// @namespace    https://github.com/Hadarios
// @version      1.0.0
// @description  Script to automatically update all saved settings' vintage from yearMin-(yearMax - 1) to yearMin-yearMax
// @author       Hadarios
// @match        https://animemusicquiz.com/*
// @require      https://github.com/joske2865/AMQ-Scripts/raw/master/common/amqScriptInfo.js
// @downloadURL  https://github.com/Hadarios/AMQ-Scripts/raw/master/amqUpdateVintages.user.js
// @updateURL    https://github.com/Hadarios/AMQ-Scripts/raw/master/amqUpdateVintages.user.js
// ==/UserScript==

let version = "1.0.0";

// don't load on login page
if (document.getElementById('startPage')) return;

// Wait until the LOADING... screen is hidden and load script
let loadInterval = setInterval(() => {
    if (document.getElementById("loadingScreen").classList.contains("hidden")) {
        setup();
        clearInterval(loadInterval);
    }
}, 500);

let x = 0;
let k = 0;
let running = false;

let loopInterval = setInterval(() => {
    if (running && !x)
        {
            messageDisplayer.displayMessage("Updated " + k.toString() + " vintages. Reloading the game is recommended.");
            running = false;
            k = 0;
        }
}, 500);

function setup() {
    // add button to load menu
    $("#mhLoadHeader").after('<div id="mhUpdateVintage" class="clickAble"> <h5>Update Vintages</h5> </div>');

    // get current height of load menu
    let h = Number(($("#mhLoadContainer").css("height")).replace(/(^\d+)(.+$)/i,'$1'));

    // increase height of load menu by 42px (height of the new button)
    $("#mhLoadContainer").css("height", (h + 42).toString() + "px");

    // add on click event to button
    $("#mhUpdateVintage").on("click", function(){
        updateVintage();
    });
}

const delay = n => new Promise(r => setTimeout(r, n));

new Listener('save quiz settings', (payload) => {
    if (payload.success) {
        setTimeout(function() {$(".swal2-confirm").click(); x -= 1;}, 500);
    }
}).bindListener();

async function updateVintage() {
    running = true;
    var advanced = $("#mhAdvancedTab");
    if (!advanced.hasClass("selected"))
        advanced.click();

    var l = $(".mhLoadListEntry");
    x = l.length;
    k = 0

    for (let i = 0; i < l.length; i++) {
        l.eq(i).find(".mhLoadEntryName").click();

        await delay(500);

        let max = Number($("#mhVintageMax").val());
        let min = Number($("#mhVintageMin").val());
        let name = l.eq(i).find(".mhLoadEntryName")[0].textContent;

        if (max === hostModal.vintageRangeSliderCombo.max - 1 && min === hostModal.vintageRangeSliderCombo.min)
        {
            $("#mhVintageMax").val(max + 1).change();

            $("#mhSaveSettingButton").click();
            $(".swal2-input").val(name);
            $(".swal2-confirm").click();

            l.eq(i).find(".mhLoadDelete").click();
            $(".swal2-confirm").click();
            k+=1;
        }
        else
        {
            x -= 1;
        }
    }
}

AMQ_addScriptData({
    name: "AMQ Update Vintages",
    author: "Hadarios",
    version: version,
    link: "https://github.com/Hadarios/AMQ-Scripts/raw/master/amqUpdateVintages.user.js",
    description: `<p>Script to automatically update all saved settings' vintage from yearMin-(yearMax - 1) to yearMin-yearMax</p>`
})
