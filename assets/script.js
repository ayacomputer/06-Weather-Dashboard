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
    const recentFiveSearch = userInputArr.slice(-5);
    recentFiveSearch.forEach(function (item) {
        const cityBtn = document.createElement("button");
        cityBtn.textContent = item;
        cityBtn.style.textTransform = "capitalize";
        cityBtn.setAttribute("class", "btn");
        searchedCities.appendChild(cityBtn);

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
            pickedCity.style.textTransform = "capitalize";

            const lat = data.coord.lat
            const lon = data.coord.lon

            getFiveWeather(lat, lon);

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




            currentWeatherContainer.appendChild(otherInfoDiv);




        }).catch(error => console.log(error));

}





function getFiveWeather(lat, lon) {
    console.log(`lat: ${lat} lon: ${lon}`);
    let searchUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}`;
    fetch(searchUrl).then((response) => response.json())
        .then((data) => {
            console.log(data)
            getCurrentUV(data);



        })
}


function getCurrentUV(data) {
    console.log(data)
    const uvEl = document.createElement("p");
    const currentUV = data.current.uvi;
    uvEl.textContent = `UV: ${currentUV}`;
    currentWeatherContainer.appendChild(uvEl);
    if (currentUV < 3) {
        uvEl.classList.add("uv-low");
    } else if (currentUV >= 3 && currentUV < 6) {
        uvEl.classList.add("uv-moderate");
    } else if (currentUV >= 6 && currentUV < 8) {
        uvEl.classList.add("uv-high");
    }
    else if (currentUV >= 8 && currentUV < 11) {
        uvEl.classList.add("uv-veryHigh");
    } else {
        uvEl.classList.add("uv-extreme");
    }
}
