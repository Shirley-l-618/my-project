let now = new Date();

let p = document.querySelector("p#date");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
p.innerHTML = `${day} ${date} ${month} ${year}, ${hours}:${minutes}`;

function searchCity(city) {
  let apiKey = "470aa4dfed6e145bca75f0a10f3f646f";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchSubmit);

function showCurrentWeather(response) {
  console.log(response.data.main.temp);
  document.querySelector("h2").innerHTML = `${response.data.name}`;
  document.querySelector("h1").innerHTML =
    Math.round(response.data.main.temp) + `°C`;
  document.querySelector("h3").innerHTML = `${response.data.weather[0].main}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `<i class="fas fa-tint"></i> Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "#wind"
  ).innerHTML = `<i class="fas fa-wind"></i> Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
}

function getCurrentPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let apiKey = "470aa4dfed6e145bca75f0a10f3f646f";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCurrentWeather);
}

function searchCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", searchCurrentPosition);

searchCity("Jinan");
