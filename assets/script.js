const apiKey = "247cadaeeb389932e726ca1f84c7875d";

const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("searchInput");
const searchedCities = document.getElementById("searchedCities");

const currentWeatherContainer = document.getElementById("cityCondition");
const pickedCity = document.getElementById("pickedCity");
const weatherIcon = document.getElementById("weatherIcon");

const today = document.getElementById("today");
var now = moment();
today.textContent = now.format("dddd, Do MMM, YYYY");


var userInputArr = JSON.parse(localStorage.getItem("savedCities")) || [];
var storageCities = JSON.parse(localStorage.getItem("savedCities") || "[]");
var lastSearchedCity = storageCities.at(-1) || "Melbourne";
console.log("storageCities", storageCities);
console.log("lastSearchedCity", lastSearchedCity);






displayRecentSearches();
getCurrentWeather(lastSearchedCity);



searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(searchInput.value);

    if (searchInput.value === '') {
        alert('Please Enter a City.');
        return;
    } else if (searchInput.value) {
        saveRecentSearches();
        getCurrentWeather(searchInput.value);
    }
    searchInput.value = "";

});


clearBtn.addEventListener("click", function () {
    userInputArr = [];
    localStorage.removeItem("savedCities");
    searchedCities.innerText = "";

});


function saveRecentSearches() {
    var userSearchInput = searchInput.value;
    userInputArr.push(userSearchInput);
    localStorage.setItem("savedCities", JSON.stringify(userInputArr));
    displayRecentSearches();
}

function displayRecentSearches() {
    searchedCities.innerHTML = "";

    userInputArr.forEach(function (item, index) {
        if (index < 5) {
            const cityBtn = document.createElement("button");
            cityBtn.textContent = item;
            cityBtn.style.textTransform = "capitalize";
            cityBtn.setAttribute("class", "btn");
            searchedCities.appendChild(cityBtn);

        }
    })
}




function getCurrentWeather(cityName) {
    console.log(cityName);
    let searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

    fetch(searchUrl).then((response) => response.json())
        .then((data) => {
            currentWeatherContainer.innerHTML = " ";
            console.log(data);
            pickedCity.textContent = cityName;

            const iconId = data.weather[0].icon
            weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${iconId}@2x.png`)


            const temperatureEl = document.createElement("h2");
            temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
            currentWeatherContainer.appendChild(temperatureEl);

            const otherInfoDiv = document.createElement("div");
            otherInfoDiv.setAttribute("display", "flex")
            otherInfoDiv.setAttribute("flex-direction", "row")
            otherInfoDiv.setAttribute("flex-wrap", "wrap")

            const windEl = document.createElement("span");
            windEl.textContent = `Wind: ${Math.round(data.wind.deg)}MPH`;
            otherInfoDiv.appendChild(windEl);

            const humidityEl = document.createElement("span");
            humidityEl.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
            otherInfoDiv.appendChild(humidityEl);

            const uvEl = document.createElement("span");
            uvEl.textContent = `UV: ${Math.round(data.main.temp)}`;
            otherInfoDiv.appendChild(uvEl);


            currentWeatherContainer.appendChild(otherInfoDiv);







        }).catch(error => console.log(error));

}
