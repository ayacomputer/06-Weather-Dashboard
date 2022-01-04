const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const searchInput = document.getElementById("searchInput");
const searchedCities = document.getElementById("searchedCities");



var searchUrl = "https://openweathermap.org/data/2.5/weather?q=";
const apiKey = "97f07c142393e325b412688726de1147";


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

})

function saveRecentSearches() {
    var userInputArr = JSON.parse(localStorage.getItem("savedCities")) || [];
    var userSearchInput = searchInput.value;
    userInputArr.push(userSearchInput);
    localStorage.setItem("savedCities", JSON.stringify(userInputArr));

    userInputArr.reverse();

    userInputArr.forEach(function (item, index) {
        if (index < 5) {
            const cityBtn = document.createElement("button");
            cityBtn.textContent = item;
            cityBtn.setAttribute("text-transform", "capitalize");
            cityBtn.setAttribute("class", "btn");
            searchedCities.appendChild(cityBtn);

        }
    })

}