const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("searchInput");
const searchedCities = document.getElementById("searchedCities");

var userInputArr = JSON.parse(localStorage.getItem("savedCities")) || [];





searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    console.log(searchInput.value);

    if (searchInput.value === '') {
        alert('Please Enter a City.');
        return;
    } else if (searchInput.value) {
        saveRecentSearches();
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

var searchUrl = `https://openweathermap.org/data/2.5/weather?q=${location}97f07c142393e325b412688726de1147`;


function getWeather(searchUrl) {
    fetch(searchUrl)
        .then(function (response) {

        }.catch(function (error) {
            alert("Please enter a city name again.");
        }) 