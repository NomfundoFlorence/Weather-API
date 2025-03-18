const axios = require("axios");
require("dotenv").config();

const getCoordinates = async (location) => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${process.env.WEATHER_API_KEY}`
  );

  const latitude = response.data[0].lat;
  const longitude = response.data[0].lon;

  return [latitude, longitude];
};

const getWeather = async (location) => {
  const [latitude, longitude] = await getCoordinates(location);

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}`
  );

  return response.data;
};

getCoordinates("Duduza").then((data) => console.log(data));
getWeather("Duduza").then((data) => console.log(data));
