var searchBtn = document.querySelector("#searchBtn");
var cityEntry = document.querySelector('#searchText');
var cityHistory = document.querySelector("#cityHistory"); //location for history
var weatherDisplay = document.querySelector("#weatherDisplay");
var recentCities = document.querySelector("#recentCities"); //ul for city history to add onto
var cities = [];
var cityName = document.querySelector("#cityName");
var todayDate = moment().format('M/D/YYYY')


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
    // displayCities();
    // fetchWeatherData();
    fetchLatLon(cityEntry);
    getFiveDayForcast(cityEntry);
    cityName.textContent = cityEntry.toUpperCase();

    
    var date = document.querySelector("#date");
    date.textContent = todayDate;

})



function fetchLatLon(cityEntry) {
    console.log(cityEntry);

    fetch ("https://api.openweathermap.org/data/2.5/weather?q=" + cityEntry + "&units=imperial&appid=8145ecb6e9f22712784b4a7964038388")
    .then(function(response) {
        // console.log(response);
 //console.log(response.coord.lon);
 //console.log(response.coord.lat);
        return response.json();
    }) .then(function(results) {
        console.log(results);
        console.log(results.coord.lon);
        console.log(results.coord.lat);
        console.log(results.main.temp);
        var lat = results.coord.lon;
        var lon = results.coord.lat;
        var tempEl = Math.round(results.main.temp);
        var humidityEl = results.main.humidity;
        var windEl = results.wind.speed;


        var tempDisplay = document.querySelector("#tempDisplay");
        tempDisplay.textContent = 'Temperature: ' + tempEl + 'F';

        var humidityDisplay = document.querySelector("#humidityDisplay");
        humidityDisplay.textContent = 'Humidity: ' + humidityEl + '%';

        var windDisplay = document.querySelector('#windDisplay');
        windDisplay.textContent = 'Wind Speed: ' + windEl + 'mph';
        return fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&exclude=hourly&appid=8145ecb6e9f22712784b4a7964038388");

        
        
 }) .then(function(response){
     return response.json();
 }) .then(function(results) {
     console.log(results)

     var uvEl = results.current.uvi

     var uvDisplay = document.querySelector("#uvResult");
     uvDisplay.textContent = uvEl;

     if(uvEl <= 3) {
         document.getElementById("uvResult").style.backgroundColor = "green";
     } else if(uvEl >= 4 && uvEl <= 7) {
        document.getElementById("uvResult").style.backgroundColor = "yellow";
     } else if(uvEl >= 8) {
        document.getElementById("uvResult").style.backgroundColor = "red";
     }


 });    
}


function getFiveDayForcast(searchVal) {

    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${searchVal}&units=imperial&appid=8145ecb6e9f22712784b4a7964038388`)
        .then(function(response) {
            return response.json()
        }).then(function(data) {
            console.log("data", data)
            for(var i = 0; i < 5; i++){
               var icon = data.list[i].weather[0].icon
                var image = $('<img />').attr({
                    "src": "https://openweathermap.org/img/wn/"+ icon + ".png"
                });
                var divEl = `
                <div class = "col-2 forecastBox">
                    <p> ${moment().add(i, 'days').format('M/D/YYYY')}</p>
                    <p>Temp: ${data.list[i].main.temp}F</p>
                    <p>Humidity: ${data.list[i].main.humidity}%</p>
                    <img> ${"src", image}</img>
                </div>
                `
                // var dateValue =moment().add(i, 'days').format('M/D/YYYY');
                // // <div class = "col-2 forecastBox">
                // var tempValue = data.list[i].main.temp;
                // var humidityValue = data.list[i].main.humidity;
                    
                                
                // <p> $.attr("src", "https://openweathermap.org/img/wn/"+ icon + ".png")</p>
                // var icon = data.list[i].weather[0].icon
                
                $("#five-day").append($(divEl))
                // $("#five-day").append($(image))
                // $("#weather-icons").append($(image))
                // $(divEl).append($(image))
            }
        })


}


//   function displayWeather(results){
//     var weatherData = document.createElement('p');
//         weatherData.classList.add('bg-light', 'text-dark', 'my-2')

//         var tempData = document.createElement('p');
//        tempData.classList.add('bg-ligh', 'text-dark', 'my-2');
//        tempData.innerHTML = "Temperature: " + results.current.temp;
//        weatherDisplay.append(tempdata)
//        console.log(results.current.temp)
//   }

//   function to display history of cities on left side
function displayCities() {
    cityHistory.innerHTML = "";

    for (var i = 0; i < 5; i++) {
        var city = cities[i];
        var list = document.createElement("p");
        list.textContent = city;
        list.setAttribute("data-index", i);

        recentCities.append(list);
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