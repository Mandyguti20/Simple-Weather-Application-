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

//display forecast

function displayForecast() {
    let forecastElement = document.querySelector("#forecast-row");
    
    let forecastHTML = '<div class="row">';
    let days = ["Mon", "Tues", "Wed", "Thur", "Fri"];
    days.forEach(function (day) {
        forecastHTML = forecastHTML +
        `
        <div class="col-2 weekday-cards">
            <p class="weekday-text">${day}</p>
                <img 
                    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png" 
                    alt="" 
                    width="40"
                    class="weekday-icon"
                />
                <div class="weekday-degrees">
                    <span class="forecast-max">77</span> 
                    <span class="forecast-min">24</span>
                </div>
        </div>
    `; 
    })
    

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    
}

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
  let apiKey = "20d80b7td8b0c38f3771b8a6ocff3143";
  let units = "imperial";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentTemp);
}

//Get Current Weather

function showCurrentTemp(response) {
  console.log(response);
  //call to update city name
  let city = response.data.city;
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = city;
  //call to update temperature
  let temperature = Math.round(response.data.temperature.current);
  let updateTemp = document.querySelector("#current-temp");
  updateTemp.innerHTML = temperature;
  // call to update weather description
  let description = response.data.condition.description;
  let updateDescription = document.querySelector("#weather-description");
  updateDescription.innerHTML = description;
  //call to update wind speed
  let wind = Math.round(response.data.wind.speed);
  let updateWind = document.querySelector("#wind");
  updateWind.innerHTML = wind;
  // call to update humidity %
  let humidity = response.data.temperature.humidity;
  let updateHumidity = document.querySelector("#humidity");
    updateHumidity.innerHTML = humidity;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute(
        "alt", response.data.condition.description);
    
    fahrenheitTemp = response.data.temperature.current;

}

function displayCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temp");
    celsius.classList.add("active");
    fahrenheit.classList.remove("active");
    let celsiusTemp = Math.round((fahrenheitTemp - 32) * 5 / 9);
    
    temperatureElement.innerHTML = celsiusTemp;
}

function displayFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#current-temp");
    celsius.classList.remove("active");
    fahrenheit.classList.add("active");
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;



let celsius = document.querySelector("#metric-unit");
celsius.addEventListener("click", displayCelsiusTemp);

let fahrenheit = document.querySelector("#imperial-unit");
fahrenheit.addEventListener("click", displayFahrenheitTemp);

searchCity("New York");


displayForecast();