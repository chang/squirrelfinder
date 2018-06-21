"use strict";
mapboxgl.accessToken = "pk.eyJ1IjoiZXJpY2NoYW5nMDAiLCJhIjoiY2ppbXViZHNxMDgzODN2cGxhNjIza2d1ayJ9.j7pxXt3AOOUk_E-GkLNHEg";
const EVANSTON_COORDS = [-87.677569, 42.056808];
const DEFAULT_ZOOM = 12;
const LANDMARKS = {
    "Trader Joe's": [-87.679842, 42.040642],
    "Mustard's Last Stand": [-87.694845, 42.065197],
    "Norris": [-87.672932, 42.053397],
    "Squirrel": [39.16683333333334, -86.52072222222222]
};


/* Mapbox stuff */
var map = new mapboxgl.Map({
    center: EVANSTON_COORDS,
    zoom: DEFAULT_ZOOM,
    container: "map",
    style: "mapbox://styles/mapbox/streets-v9"
});

function addMarkers(landmarks) {
    for (var lm in landmarks) {
        var popup = new mapboxgl.Popup({});
        popup.setHTML("<p>" + lm + "</p>");
        var marker = new mapboxgl.Marker()
          .setLngLat(landmarks[lm])
          .setPopup(popup)
          .addTo(map);
    }
}
addMarkers(LANDMARKS);



/* Interactions */
function changeFooterMessage(msg) {
    let footer = document.getElementById("pagetitle");
    footer.textContent = msg;
}


let countingButton = (function() {
    var count = 0;
    function inner() {
        count++;
        changeFooterMessage("Clicked button: " + count);
    }
    return inner;
})();



let button = document.querySelector("#button0");
button.addEventListener("click", countingButton);
button.addEventListener("click", function() {
    let searchField = document.querySelector("#squirrel-search");
    console.log(searchField.value);
});


let searchField = document.querySelector("#squirrel-search");
searchField.addEventListener("change", function() {
    let search = searchField.value;
    if (LANDMARKS.hasOwnProperty(search)) {
        map.flyTo({
            center: LANDMARKS[search],
            zoom: DEFAULT_ZOOM + 2,
        });
    } else {
        console.log("NO");
    }
});


document.addEventListener("DOMContentLoaded", function() {
    function initAutocomplete() {
        var elems = document.querySelectorAll(".autocomplete");
        var markerCompletions = {};
        for (var lm in LANDMARKS) {
            markerCompletions[lm] = null;
        }
        let options = {
            "data": markerCompletions
        };
        var instances = M.Autocomplete.init(elems, options);
    }

    initAutocomplete();
});
