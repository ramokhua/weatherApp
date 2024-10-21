document.getElementById('getWeather').addEventListener('click', function() {
    const city = document.getElementById('city').value;
    const apiKey = "eac360db5fc86ft86450f3693e73o43f";
    const url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const weatherResult = document.getElementById('weatherResult');
            const temperature = data.main.temp;
            const weatherDescription = data.weather[0].description;
            weatherResult.innerHTML = `
                <h2>${data.name}</h2>
                <p>Temperature: ${temperature} °C</p>
                <p>Condition: ${weatherDescription}</p>
            `;
        })
        .catch(error => {
            document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
        });
});
