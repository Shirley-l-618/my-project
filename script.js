let currentTime = new Date();

let longDate = document.querySelector("#current-date");
longDate.innerHTML = formatDate(currentTime);

function formatDate(date) {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = date.getDay();
  let currentDay = days[day - 1];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let formattedDate = `${currentDay} ${currentHours}:${currentMinutes} </br> ${currentDate} ${currentMonth}`;
  return formattedDate;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=470aa4dfed6e145bca75f0a10f3f646f&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function getTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celciusTemperature = Math.round(response.data.main.temp);

  getForecast(response.data.coord);
}

function showCity(event) {
  event.preventDefault();

  let input = document.querySelector("#city-input");
  let city = document.querySelector("#city");

  if (input.value) {
    city.innerHTML = `${input.value}`;
    searchCity(input.value);
  } else {
    city.innerHTML = null;
    alert(`Please type a city`);
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <div class = "weather-date">
             ${formatDay(forecastDay.dt)}  </div>
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
              />
               <div class = "weather-temperature">
                 <span class = "weather-temp-max">
              ${Math.round(forecastDay.temp.max)}°C </span>
            <span class = "weather-temp-min"> ${Math.round(
              forecastDay.temp.min
            )}°C </span>
            </div>
            </div>
         `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function searchCity(city) {
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=470aa4dfed6e145bca75f0a10f3f646f`;
  axios.get(apiUrl).then(getTemperature);
}

let cityForm = document.querySelector("#city-form");

cityForm.addEventListener("submit", showCity);

searchCity("Roseville");
