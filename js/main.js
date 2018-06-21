"use strict";

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiZXJpY2NoYW5nMDAiLCJhIjoiY2ppbXViZHNxMDgzODN2cGxhNjIza2d1ayJ9.j7pxXt3AOOUk_E-GkLNHEg";
const MAP_DEFAULT_CENTER = [-86.51975, 39.165138];
const DEFAULT_ZOOM = 14;
var SQUIRRELS;

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
loadSquirrelData("data/squirrels.json");  // functions are lifted in JS


/**
 * Load squirrel data into the globally-scoped variable SQUIRRELS.
 *
 * @param {string} path - Path to the squirrel data file.
 */
function loadSquirrelData(path) {
    $.ajax({
        url: path,
        async: false,
        dataType: "json",
        success: function(data) {
            SQUIRRELS = data;
        },
        attributionControl: false
    });
}


/* Mapbox stuff */
class SquirrelMap extends mapboxgl.Map {
    /**
     * Given a squirrel's name, center the map on its marker.
     * @param {string} name
     */
    flyToSquirrel(name) {
        this.flyTo({
            center: SQUIRRELS[name]["favorite_spot"],
            zoom: DEFAULT_ZOOM + 2,
        });
    }

    addMarkers(squirrels) {
        for (var name in squirrels) {
            let icon = squirrels[name]["icon"];
            var el = document.createElement("div");
            el.className = "marker";
            el.style.backgroundImage = "url('" + icon + "')";
            el.style.width = "50px";
            el.style.height= "50px";
            el.style.borderRadius = "50%";

            var popup = new mapboxgl.Popup({});
            popup.setHTML(`<p>${name}</p> <img src="${icon}" alt="" class="circle responsive-img" style="width: 50px; height: auto;">`);

            var marker = new mapboxgl.Marker(el)
              .setLngLat(squirrels[name]["favorite_spot"])
              .setPopup(popup)
              .addTo(map);
        }
    }
}

var map = new SquirrelMap({
    center: MAP_DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    container: "map",
    style: "mapbox://styles/mapbox/streets-v10",
});



/**
 * Create an object for autocompletions, with key:value nameOfSquirrel:pathToThumbnail.
 * @param {obj} squirrels
 */
function getAutocompletions(squirrels) {
    var completions = {};
    for (var name in squirrels) {
        completions[name] = null;
    }
    return completions;
}


/* Card manipulation */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function transitionCard() {
    $("#squirrel_card").addClass("scale-out");
    await sleep(150);
    $("#squirrel_card").removeClass("scale-out");
}

$("#btn_test").click(function(){
    console.log("clicked.");
});

$("#squirrel_select_field").change(function(){
    let selection = this.M_FormSelect.input.value;
    map.flyToSquirrel(selection);
});


/**
 * This function should:
 * - Transition the card and load new squirrel data.
 * - Fly the map to the squirrel in question.
 * @param {string} name: Name of the squirrel.
 */
function switchSquirrel(name) {
    console.log("Switched to: " + name);
}


$(document).ready(function() {
    $('input.autocomplete').autocomplete({
      data: getAutocompletions(SQUIRRELS)
    });
    M.AutoInit();
    $("select").formSelect();

    map.addMarkers(SQUIRRELS);
});
