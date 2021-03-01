var searchBtn = document.querySelector("#searchBtn");
var searchText = document.querySelector("#searchText");
var cityHistory = document.querySelector("#cityHistory");
var weatherDisplay = document.querySelector("#weatherDisplay");
var recentCities = document.querySelector("#recentCities");
var cities = [];

function displayCities() {
    cityHistory.innerHTML = "";

    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        var li = document.createElement("li");
        li.textContent = city;
        li.setAttribute("data-index", i);

        recentCities.appendChild(li);
    }
}

function init() {
    var savedCities = JSON.parse(localStorage.getItem("city"));
    console.log(savedCities);

    if (savedCities !== null) {
        cities = savedCities
    }

    displayCities();
}

function storeCities() {
    localStorage.setItem("city", JSON.stringify(cities));
}

$("#searchBtn").click(function () {
    var cityEntry = searchText.value.trim();

   
    cities.push(cityEntry)
    searchText.value = "";

    storeCities();
    displayCities();
})

init();