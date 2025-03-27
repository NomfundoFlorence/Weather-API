const fetchWeather = async (location) => {
  const response = await fetch(
    `http://localhost:3000/weather?location=${location}`
  );
  const weatherData = await response.json();

  const icon = document.createElement("img");
  const ICON_CODE = weatherData.weather[0].icon;
  icon.src = `http://openweathermap.org/img/wn/${ICON_CODE}.png`;
  icon.alt = weatherData.weather[0].description;

  const weatherContainer = document.getElementById("weather-container");
  if (weatherContainer.childElementCount > 0) {
    weatherContainer.removeChild(weatherContainer.firstChild);
  }
  weatherContainer.prepend(icon);

  const city = document.getElementById("city-name");
  city.textContent = `${weatherData.name}, ${weatherData.sys.country}`;

  const temperature = document.getElementById("temperature");
  temperature.textContent = weatherData.main.temp;

  const feelsLike = document.getElementById("feels-like");
  feelsLike.textContent = `Feels like: ${weatherData.main.feels_like}`;

  const humidity = document.getElementById("humidity");
  humidity.textContent = `Humidity: ${weatherData.main.humidity}`;

  const minTemp = document.getElementById("min-temperature");
  minTemp.textContent = `Min temp: ${weatherData.main.temp_min}`;

  const maxTemp = document.getElementById("max-temperature");
  maxTemp.textContent = `Max temp: ${weatherData.main.temp_max}`;
};

const getWeatherBtn = document.getElementById("get-weather-btn");
getWeatherBtn.addEventListener("click", () => {
  const location = document.getElementById("location").value.trim();

  if (!location) {
    const location = document.getElementById("location");
    location.classList.add("focus");
    location.style.borderColor = "rgb(178, 245, 78)"

    const locationError = document.createElement("p");
    const searchContainer = document.getElementById("search-container");

    locationError.textContent = "Please provide a city name";
    locationError.style.color = "red";
    locationError.style.fontSize = "1rem";
    searchContainer.prepend(locationError);

    setTimeout(() => {
      location.classList.remove("focus");
      location.style.borderColor = "#000";
      searchContainer.removeChild(locationError);
    }, 1500);

    return;
  }

  fetchWeather(location);
});
