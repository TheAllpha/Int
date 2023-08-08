const fetch = require("node-fetch");
require('dotenv').config();

const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current_weather=true&forecast_days=1';
const opencageApiKey = 'YOUR_OPENCAGE_API_KEY';

function getDayName(dayIndex) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[dayIndex];
}

async function getCountryName(latitude, longitude) {
  const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${opencageApiKey}`;
  try {
    const response = await fetch(geocodeUrl);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].components.country;
    } else {
      return "Unknown Country";
    }
  } catch (error) {
    console.error("Error fetching country data:", error);
    return "Error";
  }
}

async function getData() {
  console.log("1");

  const response = await fetch(url);
  console.log("2");
//hi
  const data = await response.json();  

  const latitude = data.latitude;
  const longitude = data.longitude;

  const timeArray = data.hourly.time;
  const temperatureArray = data.hourly.temperature_2m;

  const dayIndex = new Date(timeArray[0]).getDay();
  const dayName = getDayName(dayIndex);

  const countryName = await getCountryName(latitude, longitude);

  const combinedData = timeArray.map((time, temp) => ({
    time: new Date(time).toLocaleTimeString(),
    temperature: temperatureArray[temp]
  }));

  combinedData.unshift({ day: dayName, country: countryName, latitude: latitude, longitude: longitude }); // Add day name, country, latitude, and longitude

  console.log(combinedData);
}

console.log("run", process.env.NODE_TLS_REJECT_UNAUTHORIZED);
process.env.NODE_TLS_REJECT_UNAUTHORIZED;
getData();
