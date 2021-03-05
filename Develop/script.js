var searchBtn = document.querySelector("#searchBtn");
var cityEntry = document.querySelector('#searchText');
var cityHistory = document.querySelector("#cityHistory"); //location for history
var weatherDisplay = document.querySelector("#weatherDisplay");
var recentCities = document.querySelector("#recentCities"); //ul for city history to add onto
var cities = [];



$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    var searchText = document.querySelector("#searchText"); //input field
    cityEntry = searchText.value.trim();


    if (!cityEntry) {
        window.alert("Please enter a city");
        return;//alert if nothing is entered
    }

//    //add city input to my array 
    cities.push(cityEntry)
    searchText.value = "";
 
    storeCities();
    displayCities();
    // fetchWeatherData();

})

// fetchLatLon();




// function fetch1(cityEntry) {fetch stuff
//fetch2(data.coord.lat, data.coord.lon)}
function fetchLatLon(cityEntry) {
    console.log(cityEntry);
//    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityEntry}&appid=8145ecb6e9f22712784b4a7964038388`)
   fetch ('https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=8145ecb6e9f22712784b4a7964038388')
    // fetch ("https://api.openweathermap.org/data/2.5/weather?q=" + cityEntry + "&appid=8145ecb6e9f22712784b4a7964038388")
    .then(function(response) {
        console.log(response);
        return response.json();
    }) .then(function(results) {
        console.log(results)
    })
        .catch(function(error) {
            console.error(error);
        }) 
        
    //    fetchWeatherData(data.coord.lat, data.coord.lon);
    //    fetchWeatherData(resuts);

}

//function fetch2(lat,lon) {fetch stuff}
// function fetchWeatherData (results) {
//     // var data = document.location.search;
//     // fetch(`https://api.openweathermap.org/data/2.5/onecall?lat${lat}=&lon=${lon}&exclude=hourly,daily&appid=8145ecb6e9f22712784b4a7964038388`)
//    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=41.85&lon=-87.65&exclude=hourly,daily&appid=8145ecb6e9f22712784b4a7964038388`)
//     .then(function(response) {
//         console.log(response);
//         return response.json();
//     }) .then(function(results) {
//         console.log(results);
//     })
//         .catch(function(error) {
//             console.error(error);
//         })
    
//        var tempData = document.createElement('p');
//        tempData.classList.add('bg-ligh', 'text-dark', 'my-2');
//        tempData.innerHTML = "Temperature: " + results.current.temp;
//        weatherDisplay.append(tempdata)
// }

// data.current.temp
// fetch by city name to get lat and lon values

    //then run the api call to get all of the weather data neededd 
//   .then(fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,daily&appid=8145ecb6e9f22712784b4a7964038388",))

  function displayWeather(){
    var weatherData = document.createElement('p');
        weatherData.classList.add('bg-light', 'text-dark', 'my-2')
  }

//   function to display history of cities on left side
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
// local storage get function to pull back recent cities
function init() {
    var savedCities = JSON.parse(localStorage.getItem("city"));
    // console.log(savedCities);

    if (savedCities !== null) {
        cities = savedCities
    }

    displayCities();
}
// function to add city input to local storage
function storeCities() {
    localStorage.setItem("city", JSON.stringify(cities));
}


init();