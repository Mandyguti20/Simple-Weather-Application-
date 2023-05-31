//Date and time

let dateTime = document.querySelector("#dateTime");

let now = new Date();

let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Match",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

dateTime.innerHTML = `${day}, ${month} ${date}, ${hours}:${minutes}`;

//Change City Name

function lookUpCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input").value;
  searchCity(cityInput);
  }

//Change city name by tapping enter
let form = document.querySelector("#search-form");
form.addEventListener("submit", lookUpCity);

//Change city name by submit button
let submitButton = document.querySelector("#search-submit-button");
submitButton.addEventListener("click", lookUpCity);

function searchCity(city) {
  let apiKey = "001bc651977f4b024af4d84282b0f02a";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentTemp);
}

//Get Weather

function showCurrentTemp(response) {
  console.log(response);
  //call to update city name
  let city = response.data.name;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = city;
  //call to update temperature
  let temperature = Math.round(response.data.main.temp);
  let updateTemp = document.querySelector("#current-temp");
  updateTemp.innerHTML = temperature;
  // call to update weather description
  let description = response.data.weather[0].description;
  let updateDescription = document.querySelector("#weather-description");
  updateDescription.innerHTML = description;
  //call to update wind speed
  let wind = Math.round(response.data.wind.speed);
  let updateWind = document.querySelector("#wind");
  updateWind.innerHTML = wind;
  // call to update humidity %
  let humidity = response.data.main.humidity;
  let updateHumidity = document.querySelector("#humidity");
  updateHumidity.innerHTML = humidity;
}
searchCity("New York");
