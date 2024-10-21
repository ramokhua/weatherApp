import React from "react";
import React, { useState, useEffect } from "react";

export default function App() {
    const [city, setCity] = useState("San Francisco");
    const [weatherData, setWeatherData] = useState({});

    const apiKey = "eac360db5fc86ft86450f3693e73o43f";


    useEffect(() => {
        fetchWeather(city);
    }, [city]);

    async function fetchWeather(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            alert('City not found!');
        }
    }

    return (
        <div className="App">
            <div className="weather-app">
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Enter a city..." 
                        onChange={(e) => setCity(e.target.value)} 
                    />
                    <button onClick={() => fetchWeather(city)}>Search</button>
                </div>
                <div className="city">{weatherData.name}</div>
                <div className="temperature">{Math.round(weatherData.main?.temp)}°C</div>
                <div className="weather-condition">
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather?.[0].icon}@2x.png`} alt="Weather Icon" />
                    <div>{weatherData.weather?.[0].description}</div>
                </div>
                <div className="humidity">Humidity: {weatherData.main?.humidity}%</div>
                <div className="wind">Wind: {weatherData.wind?.speed} km/h</div>
            </div>
        </div>
    );
}
export default function App() {
    return (
        <div className="App">
        <div className="container">
            <Weather defaultCity="San Francisco" />
        </div>
        </div>
    );
}

export default function WeatherForecastPreview(props) {
    function day() {
        let date = new Date(props.data.time * 1000);
        let day = date.getDay();
        let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        return days[day];
    }

    function maxTemperature() {
        let temperature = Math.round(props.data.temperature.maximum);

        return `${temperature}°`;
    }

    function minTemperature() {
        let temperature = Math.round(props.data.temperature.minimum);

        return `${temperature}°`;
    }

    return (
        <div className="WeatherForecastPreview">
        <div className="forecast-time">{day()}</div>
        <WeatherIcon code={props.data.condition.icon} size={38} />
        <div className="forecast-temperature">
            <span className="forecast-temperature-max">{maxTemperature()}</span>
            <span className="forecast-temperature-min">{minTemperature()}</span>
        </div>
        </div>
    );
}

export default function FormattedDate(props) {
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[props.date.getDay()];
    let hours = props.date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = props.date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return (
        <span>
        {day} {hours}:{minutes}
        </span>
    );
}   

function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const options = { weekday: 'long', hour: '2-digit', minute: '2-digit' };
    timeElement.innerText = now.toLocaleDateString('en-US', options);
}

setInterval(updateTime, 1000);

const apiKey = 'YOUR_OPENWEATHER_API_KEY';

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const weatherData = await response.json();

        document.getElementById('city-name').innerText = weatherData.name;
        document.getElementById('temperature').innerText = `${Math.round(weatherData.main.temp)}°C`;
        document.getElementById('weather-condition').innerText = weatherData.weather[0].description;
        document.getElementById('humidity').innerText = `Humidity: ${weatherData.main.humidity}%`;
        document.getElementById('wind').innerText = `Wind: ${weatherData.wind.speed}km/h`;
    } catch (error) {
        alert('City not found!');
    }
}

document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeather(city);
    }
});

window.onload = function() {
    fetchWeather('San Francisco');
};
