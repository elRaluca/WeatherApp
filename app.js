const showWeatherBtn = document.getElementById("show-weather");
const cityInput = document.getElementById("city");
const weatherContainer = document.getElementById("weather-container");

showWeatherBtn.addEventListener("click", showWeather);

const URL_CURRENT_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";

async function showWeather() {
  const city = cityInput.value;
  const response = await fetch(`${URL_CURRENT_WEATHER}${city}`);
  const weather = await response.json();

  const iconCode = weather.weather[0].icon;
  const iconImageUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

  weatherContainer.innerHTML = `<div>
    <img src=${iconImageUrl} />
    <p>Description: ${weather.weather[0].description}</p>
    <p>Humidity: ${weather.main.humidity}</p>
    <p>Pressure: ${weather.main.pressure}</p>
    <p>Current Temperature: ${weather.main.temp}</p>
    <p>Maximum of the day: ${weather.main.temp_max}</p>
    <p>Minimum of the day: ${weather.main.temp_min}</p>
  </div>
  `;
}

const showForecastBtn = document.getElementById("show-forecast");
showForecastBtn.addEventListener("click", showForecast);
const weatherForecastContainer = document.getElementById("forecast-container");
const URL_FORECAST_WEATHER =
  "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";

async function showForecast() {
  const city = cityInput.value;
  const response = await fetch(`${URL_FORECAST_WEATHER}${city}`);
  const forecastData = await response.json();
  displayForecast(forecastData);
}

function displayForecast(data) {
  const now = new Date();
  now.setHours(now.getHours() - (now.getHours() % 3), 0, 0, 0);
  const startHour = now.getHours();
  const startDate = now.getDate();

  const start = data.list.findIndex((forecast) => {
    const forecastDate = new Date(forecast.dt * 1000);
    return (
      forecastDate.getDate() === startDate &&
      forecastDate.getHours() >= startHour
    );
  });

  const forecastPeriod = data.list.slice(start, start + 6 * 8);

  forecastPeriod.forEach((forecast) => {
    const dateTime = new Date(forecast.dt * 1000);
    const iconImageUrl = `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;

    weatherForecastContainer.innerHTML += `<div id="forecatsCard">
        <h3>${dateTime.toDateString()} hour ${dateTime.getHours()}:00</h3>
        <img src="${iconImageUrl}" alt="Weather icon">
        <p>Description: ${forecast.weather[0].description}</p>
        <p>Temperature: ${forecast.main.temp} °C</p>
      </div>
    `;
  });
}
