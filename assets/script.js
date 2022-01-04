const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("searchInput");
const searchedCities = document.getElementById("searchedCities");

const currentWeatherContainer = document.getElementById("cityCondition");

var userInputArr = JSON.parse(localStorage.getItem("savedCities")) || [];
const apiKey = "247cadaeeb389932e726ca1f84c7875d";


displayRecentSearches();
getCurrentWeather("Melbourne");
// last value from the array 


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
    searchInput.value = " ";

});


clearBtn.addEventListener("click", function () {
    localStorage.removeItem("savedCities");
    searchedCities.innerText = " ";

});


function saveRecentSearches() {
    var userSearchInput = searchInput.value;
    userInputArr.unshift(userSearchInput);
    localStorage.setItem("savedCities", JSON.stringify(userInputArr));
    displayRecentSearches();
}

function displayRecentSearches() {
    searchedCities.innerHTML = " ";

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

    fetch(searchUrl).then(function (response) {
        return response.json();
    }).then(function (data) {
        currentWeatherContainer.innerHTML = " ";
        console.log(data);
        const cityNameEl = document.createElement("p");
        cityNameEl.textContent = cityName;
        currentWeatherContainer.appendChild(cityNameEl);

        const temperatureEl = document.createElement("h1");
        temperatureEl.textContent = `${Math.round(data.main.temp)}°C`;
        currentWeatherContainer.appendChild(temperatureEl);
    });
}
