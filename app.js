const express = require("express");
const { getWeather } = require("./src/weather_app");
const e = require("express");

const app = express();

app.use(express.static("public"));

app.get("/weather", async (req, res) => {
  let location = req.query.location;
  location = location.trim();

  if (!location) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const weatherData = await getWeather(location);

    if (!weatherData || weatherData.cod !== 200) {
      return res.status(404).json({ error: "Location not found" });
    }

    res.json(weatherData);
  } catch (error) {
    throw error;
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000: http://localhost:3000");
});
