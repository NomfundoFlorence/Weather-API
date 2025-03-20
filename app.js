const express = require("express");
const { getWeather, getCoordinates } = require("./src/weather_app");
const e = require("express");

const app = express();

app.get("/", async (req, res) => {
  // const location = req.query.location;
  const location = "Johannesburg";

  try {
    const weatherData = await getWeather(location);
    res.json(weatherData);
  } catch (error) {
    throw error;
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000: http://localhost:3000");
});
