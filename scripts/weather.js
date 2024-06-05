"use strict"


window.onload = ()=>{


    fetchWeather
}

async function fetchWeather (){

    try {

        let response = await fetch("https://api.weather.gov/")
        let location = await response.json();
        console.log()
    }
}