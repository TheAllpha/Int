const fetch = require("node-fetch");
require('dotenv').config()

const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current_weather=true&forecast_days=1'

async function getData(){
  console.log("1")

  const response = await fetch(url)
  console.log("2")

  const data = await response.json();

  const timeArray = data.hourly.time; 
  const temperatureArray = data.hourly.temperature_2m; 

  const combinedData = timeArray.map((time, temp) => ({
    time: time,
    temperature: temperatureArray[temp]
  }));

  console.log(combinedData);
}

console.log("run", process.env.NODE_TLS_REJECT_UNAUTHORIZED);
process.env.NODE_TLS_REJECT_UNAUTHORIZED;
getData();


