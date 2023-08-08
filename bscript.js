const fetch = require("node-fetch");
require('dotenv').config();

const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current_weather=true&forecast_days=1';

// Function to get the day name based on the day index (0 - Sunday, 1 - Monday, etc.)
function getDayName(dayIndex) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[dayIndex];
}

async function getData() {
  console.log("1");

  const response = await fetch(url);
  console.log("2");

  const data = await response.json();
  console.log(data);

  const timeArray = data.hourly.time;
  const temperatureArray = data.hourly.temperature_2m;

  const dayIndex = new Date(timeArray[0]).getDay();
  const dayName = getDayName(dayIndex);

  const combinedData = timeArray.map((time, temp) => ({
    time: new Date(time).toLocaleTimeString(),
    temperature: temperatureArray[temp]
  }));

  combinedData.unshift({ day: dayName }); // Add day name to the beginning

  console.log(combinedData);
}

console.log("run", process.env.NODE_TLS_REJECT_UNAUTHORIZED);
process.env.NODE_TLS_REJECT_UNAUTHORIZED;
getData();

