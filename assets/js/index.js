let card1 = document.getElementById("card1");
let card2 = document.getElementById("card2");
let card3 = document.getElementById("card3");

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let monthNames = [
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

async function fetchProcess(location = "alexandria") {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=bdb8207a8b9c41beb24175721232812&q=${location}&days=3&aqi=no&alerts=no`
  );
  let data = await response.json();

  let now = new Date();
  let day = now.getDate();
  let month = now.getMonth();
  let weekDay = now.getDay();

  let today = weekDays[weekDay];
  let nextDay = weekDays[(weekDay + 1) % 7];
  let afterNextDay = weekDays[(weekDay + 2) % 7];
  let monthName = monthNames[month];

  renderCurrent(data, today, day, monthName);
  renderSecond(data, nextDay);
  renderThird(data, afterNextDay);
}

function renderCurrent(res, today, day, monthName) {
  let content = `
    <div class="header card-header d-flex justify-content-between">
      <div class="day">${today}</div>
      <div class="date">${day} ${monthName}</div>
    </div>
    <div class="body card-body">
      <h5 class="card-title">${res.location.name}</h5>
      <div class="card-text">
        <div class="firstCard d-flex justify-content-between">
          <h1 class="fw-bold text-white">${res.current.temp_c}<sup>o</sup>C</h1>
          <img src="${res.current.condition.icon}" alt="weather icon">
        </div>
        <p class="weatherText">${res.current.condition.text}</p>
        <span class="px-2"><img src="images/icon-umberella@2x.png" alt=""> ${res.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
        <span class="px-2"><img src="images/icon-wind@2x.png" alt=""> ${res.current.wind_kph}km/h</span>
        <span class="px-2"><img src="images/icon-compass@2x.png" alt=""> ${res.current.wind_dir}</span>
      </div>
    </div>
  `;
  card1.innerHTML = content;
}

function renderSecond(res, nextDay) {
  let content = `
    <div class="headerDark card-header d-flex justify-content-center">
      <div class="day">${nextDay}</div>
    </div>
    <div class="bodyDark card-body text-center">
      <div class="cardImg">
        <img src="${res.forecast.forecastday[1].day.condition.icon}" alt="">
      </div>
      <div class="secondCard">
        <h4 class="text-white fs-4 fw-bold lh-base">${res.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h4>
      </div>
      <span class="fs-6 fw-light lh-base text-light">${res.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></span>
      <p class="weatherText my-4">${res.forecast.forecastday[1].day.condition.text}</p>
    </div>
  `;
  card2.innerHTML = content;
}

function renderThird(res, afterNextDay) {
  let content = `
    <div class="header card-header d-flex justify-content-center">
      <div class="day">${afterNextDay}</div>
    </div>
    <div class="body2 card-body text-center">
      <div class="cardImg">
        <img src="${res.forecast.forecastday[2].day.condition.icon}" alt="">
      </div>
      <div class="secondCard">
        <h4 class="text-white fs-4 fw-bold lh-base">${res.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h4>
      </div>
      <span class="fs-6 fw-light lh-base text-light">${res.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></span>
      <p class="weatherText my-4">${res.forecast.forecastday[2].day.condition.text}</p>
    </div>
  `;
  card3.innerHTML = content;
}

let searchBtn = document.getElementById("searchBtn");
let input = document.getElementById("search");

searchBtn.addEventListener("click", () => {
  let country = input.value;
  fetchProcess(country);
});

input.addEventListener("input", () => {
  let country = input.value;
  fetchProcess(country);
});

fetchProcess();
