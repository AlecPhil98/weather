"use strict"

let cities = [
    { name: "Benbrook, TX", latitude: 32.6732, longitude: -97.4606 },
    { name: "Denver, CO", latitude: 39.712179, longitude: -104.973050 },
    { name: "Portland, OR", latitude: 45.520117, longitude: -122.676683 },
    { name: "Portland, ME", latitude: 43.662093, longitude: -70.260251 }
];


window.onload = () => {



    let theDropDown = document.getElementById("citesDropDown");

    makeCitiesDropdown(theDropDown, cities);

    theDropDown.addEventListener("change", displayWeatherData)




}


function makeCitiesDropdown(dropDownToPoppulate, data) {

    data.forEach((optionData) => {

        let newOption = document.createElement("option")
        newOption.textContent = optionData.name;
        newOption.value = optionData.name;

        dropDownToPoppulate.appendChild(newOption);
    })



}

async function displayWeatherData() {
    let selectedCity = cities.find((city) => {

        return city.name === event.target.value;
    })
    let latLongString = `${selectedCity.latitude},${selectedCity.longitude}`;

    let weatherData = await fetchWeather(latLongString);
    console.log(weatherData)
    console.log(weatherData.properties.forecast)
    let forecast = await getForcastDetails(weatherData.properties.forecast)

    populateTable(forecast.properties.periods)
}


function populateTable(data) {
    let tbody = document.querySelector("#weatherTBody")

    for (let i = 0; i< data.length; i++) {
        makeTableRows(tbody, data[i])
    }

}


async function fetchWeather(latLongString) {
    console.log(latLongString)
    try {

        let response = await fetch(`https://api.weather.gov/points/${latLongString}`)

        if (!response.ok) {
            throw new Error("not working")
        }
        let weatherData = await response.json();
        console.log(weatherData)

        return weatherData
    } catch (error) {
        console.log(error)
    }
}



async function getForcastDetails(forecastURl) {
    let response = await fetch(forecastURl);
    let data = await response.json()
    return data;
}




function makeTableRows(tbody, data) {
    console.log(data)

        let row = tbody.insertRow();

        let nameCell = row.insertCell();
        nameCell.innerHTML= data.name

        let latitudeCell = row.insertCell();
        latitudeCell.innerHTML = data.temperature

        let longitudeCell = row.insertCell();
        longitudeCell.innerHTML = data.temperatureUnit


    

}

