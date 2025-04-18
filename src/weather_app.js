const axios = require("axios");
require("dotenv").config();

const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const getCoordinates = async (location) => {
  const response = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${WEATHER_API_KEY}`
  );

  if (response.data.length === 0) {
    throw new Error("Location not found");
  }

  const coordinates = {
    latitude: response.data[0].lat,
    longitude: response.data[0].lon,
  };

  return coordinates;
};

const getWeather = async (location) => {
  const { latitude, longitude } = await getCoordinates(location);

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`
  );

  return response.data;
};

module.exports = { getWeather };
