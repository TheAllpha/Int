const fetch = require("node-fetch");

const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current_weather=true&forecast_days=1'

require('dotenv').config()

async function getData(){
  console.log("1")

  const response = await fetch(url)
  console.log("2")

  const data = await response.json()
  console.log(data)
}

console.log("run", process.env.NODE_TLS_REJECT_UNAUTHORIZED)
process.env.NODE_TLS_REJECT_UNAUTHORIZED;
getData()

