const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("searchInput");
const searchedCities = document.getElementById("searchedCities");

const currentWeatherContainer = document.getElementById("cityCondition");

var userInputArr = JSON.parse(localStorage.getItem("savedCities")) || [];





searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(searchInput.value);

    if (searchInput.value === '') {
        alert('Please Enter a City.');
        return;
    } else if (searchInput.value) {
        saveRecentSearches();
        getCurrentWeather();
    }

});


clearBtn.addEventListener("click", function () {
    localStorage.removeItem("savedCities");
    searchedCities.innerText = ' ';

});


function saveRecentSearches() {
    var userSearchInput = searchInput.value;
    userInputArr.push(userSearchInput);
    localStorage.setItem("savedCities", JSON.stringify(userInputArr));
    userInputArr.reverse();
    displayRecentSearches();
}

function displayRecentSearches() {

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

const cityName = searchInput.textContent;
const apiKey = "97f07c142393e325b412688726de1147";



function getCurrentWeather() {
    let searchUrl = `https://openweathermap.org/data/2.5/weather?q="${cityName}&units=metric&appid=${apiKey}`;
    fetch(searchUrl, {
        cache: "reload",
    }).then(function (response) {
        response.json();

        const temperatureEl = document.createElement("h1");
        temperatureEl.textContent = `${Math.round(data.current.temp)}°C`;

        currentWeatherContainer.appendChild(temperatureEl);

    })
}
