const fetch = require("node-fetch");
require('dotenv').config();

const url = 'https://api.open-meteo.com/v1/forecast?latitude=41.0138&longitude=28.9497&hourly=temperature_2m&current_weather=true&forecast_days=1';
const opencageApiKey = process.env.OPENCAGE_API_KEY; // Use your OpenCage API key here

function getDayName(dayIndex) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[dayIndex];
}

async function getCityName(latitude, longitude) {
  const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${opencageApiKey}`;
  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].components.city || data.results[0].components.county || "Unknown City";
    } else {
      return "Unknown City";
    }
  } catch (error) {
    console.error("Error fetching city data:", error);
    return "Error";
  }
}

async function getData() {
  console.log("1");

  const response = await fetch(url);
  console.log("2");

  const data = await response.json();

  const latitude = data.latitude;
  const longitude = data.longitude;

  const timeArray = data.hourly.time;
  const temperatureArray = data.hourly.temperature_2m;

  const dayIndex = new Date(timeArray[0]).getDay();
  const dayName = getDayName(dayIndex);

  const cityName = await getCityName(latitude, longitude);

  const combinedData = timeArray.map((time, temp) => ({
    time: new Date(time).toLocaleTimeString(),
    temperature: temperatureArray[temp]
  }));

  combinedData.unshift({ day: dayName, city: cityName, latitude: latitude, longitude: longitude }); // Add day name, city, latitude, and longitude

  console.log(combinedData);
}

console.log("run", process.env.NODE_TLS_REJECT_UNAUTHORIZED);
process.env.NODE_TLS_REJECT_UNAUTHORIZED;
getData();
