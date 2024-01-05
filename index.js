let day = document.querySelector("#day");
let monthDay = document.querySelector("#monthday");
let zone = document.querySelector("#lcationname");
let temperature = document.querySelector("#temp-c");
let weatherCondition = document.querySelector("#weather-condition");

async function weather(val) {
  try {
    const weatherData = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=c1830b1a56ff4a03be8191253240301&q=${val}`
    );

    let data = await weatherData.json();

    let weakdayName = new Date(data.current.last_updated).toLocaleString(
      "en-us",
      { weekday: "long" }
    );
    let monthName = new Date(data.current.last_updated).toLocaleString(
      "en-us",
      { month: "long" }
    );
    let dayDigit = new Date(data.current.last_updated).getDay();

    zone.innerHTML = `${data.location.name}`;
    temperature.innerHTML = `${data.current.temp_c}c`;
    weatherCondition.innerHTML = `  ${data.current.condition.text}`;
    day.innerHTML = weakdayName;
    monthDay.innerHTML = dayDigit;
    monthDay.innerHTML += monthName;
  } catch (err) {
    console.log(err);
  }
}
weather("menya");

async function getweather(value) {
  try {
    const weatherData = await fetch(
      `http://api.weatherapi.com/v1/search.json?key=c1830b1a56ff4a03be8191253240301&q=${value}`
    );

    let data = await weatherData.json();
    if (data[0] != undefined) {
      let lang = data[0].lat;
      let lon = data[0].lon;
      weather(`${lang},${lon}`);
    } else {
      weather("menya");
    }
  } catch (err) {
    console.log(err);
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  weather(`${position.coords.latitude},${position.coords.longitude}`);
}
