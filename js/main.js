

// =============================
// ========== LEAFLET ==========
// =============================

var osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
osm = L.tileLayer(osmUrl, {
    maxZoom: 18,
    attribution: osmAttrib
});

// initialize the map on the "map" div with a given center and zoom
var map = L.map('map').setView([19.04469, 72.9258], 12).addLayer(osm);

// Script for adding marker on map click
/*function onMapClick(e) {

var marker = L.marker(e.latlng, {
    draggable: true,
    title: "Resource location",
    alt: "Resource Location",
    riseOnHover: true
}).addTo(map)
    .bindPopup(e.latlng.toString()).openPopup();

// Update marker on changing it's position
marker.on("dragend", function (ev) {

    var chagedPos = ev.target.getLatLng();
    this.bindPopup(chagedPos.toString()).openPopup();

});
}

map.on('click', onMapClick);*/

// =============================
// ========== CAROUSEL ==========
// =============================

// Initialize carousel
console.log("hello")
$('.weather-carousel').slick({
    infinite: false,
    variableWidth: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: true
});

$('.add-card-location-button').click(function() {

    console.log('button pushed')
    var city = $('.inputCity').val();
    var countryCode = $('.inputCountryCode').val();
    var numDays = $('.inputNumDaysForLocation').val();
    var apiKey = '66caf7904e4bf65c8754dc23dd947e5d';

    var weatherRequest = new XMLHttpRequest();

    var requestString = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='
                        + city + ',' + countryCode + '&cnt=' + numDays + '&APPID=' + apiKey;

    weatherRequest.open("GET", requestString, true);

    weatherRequest.onload = function (e) {
        if (weatherRequest.readyState === 4) {
            if (weatherRequest.status === 200) {
                var weatherJSON = JSON.parse(weatherRequest.responseText);
                console.log(weatherJSON);
                var cityName = weatherJSON.city.name;
                var avgTemperature = Math.round(weatherJSON.list[numDays-1].temp.day-273.15);
                var minTemperature = Math.round(weatherJSON.list[numDays-1].temp.min-273.15);
                var maxTemperature = Math.round(weatherJSON.list[numDays-1].temp.max-273.15);
                var conditionText = weatherJSON.list[numDays-1].weather[0].main;
                var iconCode = weatherJSON.list[numDays-1].weather[0].icon;

                var weatherCard = '<div class="weather-card card-narrow"><h3 class="weather-card-city-name"><b>'
                    + cityName +
                    '</b></h3><h5 class="weather-card-city-date">'
                    + (numDays-1) +
                    '</h5><img src="http://openweathermap.org/img/w/'
                    + iconCode +
                    '.png" class="weather-card-conditions-img"><h6 class="weather-card-conditions-text">'
                    + conditionText +
                    '</h6><button class="weather-card-remove-button">Remove</button><table class="weather-card-temperature-table"><tr class="weather-card-temperature-row"><td class="weather-card-temperature-col"><h6 class="weather-card-temperature-min-text">Min: '
                    + minTemperature +
                    '°</h6></td class="weather-card-temperature-col"><td class="weather-card-temperature-col"><h6 class="weather-card-temperature-avg-text">Avg: '
                    + avgTemperature +
                    '°</h6></td><td><h6 class="weather-card-temperature-max-text">Max: '
                    + maxTemperature +
                    '°</h6></td></tr></table></div></div>'

                $('.weather-carousel').slick('slickAdd', weatherCard);
            }
        }
    };

    weatherRequest.send(null);

})

//Remove card
$(document).on('click', '.weather-card-remove-button', function() {

    var weatherCardIndex = $(this).parent().attr('data-slick-index');
    $('.weather-carousel').slick('slickRemove', weatherCardIndex)
    $('.weather-carousel').slick('refresh');

})