'use strict'
const now = new Date();

const key = '7af2e31a483746ebb5631421250311'
const todayDate = document.querySelector('#todayDate');
const locationText = document.querySelector('#locationText');
const degreeText = document.querySelector('#degreeText');
const conditionText = document.querySelector('#conditionText')
const windText = document.querySelector('#windText');
const tomorrowDate = document.querySelector('#tomorrowDate');
const tomorrowDegreeText = document.querySelector('#tomorrowDegreeText');
const tomorrowConditionText = document.querySelector('#tomorrowConditionText');
const afterTomorrowDate = document.querySelector('#afterTomorrowDate');
const afterTomorrowDegreeText = document.querySelector('#afterTomorrowDegreeText');
const afterTomorrowConditionText = document.querySelector('#afterTomorrowConditionText');
const searchInput = document.querySelector('#searchInput');

const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

let currentCity = 'cairo';


let date='';
let tomorrow = '';
let afterTomorrow ='';
let month = '';

let today = {
  location:'',
  temp:'',
  condition:'',
  icon:'',
  windSpeed:'',
  windDirection:'',
  rain: ''
}

let tomorrowWeather = {
  icon:'',
  maxTemp:'',
  minTemp:'',
  condition:''
}

let afterTomorrowWeather = {
  icon:'',
  maxTemp:'',
  minTemp:'',
  condition:''
}

async function getUserLocation() {
    let response = await fetch('https://ipapi.co/json/');
    let myResp = await response.json();
    currentCity = myResp.city;

}

async function getWeather(city = currentCity) {
    let url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=3&aqi=no&alerts=no`;
    const response = await fetch(url);
    const myResp = await response.json();

    today.location = myResp.location.name;
    today.temp = myResp.current.temp_c;
    today.condition = myResp.current.condition.text;
    today.icon = myResp.current.condition.icon;
    today.windSpeed = myResp.current.wind_kph;
    today.windDirection = myResp.current.wind_dir;
    today.rain = myResp.forecast.forecastday[0].day.daily_will_it_rain;

    tomorrowWeather.icon = myResp.forecast.forecastday[1].day.condition.icon;
    tomorrowWeather.condition = myResp.forecast.forecastday[1].day.condition.text;
    tomorrowWeather.maxTemp = myResp.forecast.forecastday[1].day.maxtemp_c;
    tomorrowWeather.minTemp = myResp.forecast.forecastday[1].day.mintemp_c;

    afterTomorrowWeather.icon = myResp.forecast.forecastday[2].day.condition.icon;
    afterTomorrowWeather.condition = myResp.forecast.forecastday[2].day.condition.text;
    afterTomorrowWeather.maxTemp = myResp.forecast.forecastday[2].day.maxtemp_c;
    afterTomorrowWeather.minTemp = myResp.forecast.forecastday[2].day.mintemp_c;
    
    currentMonth();
    currentDay();
    display();
}



function currentDay() {

  switch(now.getDay()){
    case 0:
      date = weekDays[0];
      tomorrow = weekDays[1];
      afterTomorrow = weekDays[2];
      break;
    case 1:
      date = weekDays[1];
      tomorrow = weekDays[2];
      afterTomorrow = weekDays[3];
      break;
    case 2:
      date = weekDays[2];
      tomorrow = weekDays[3];
      afterTomorrow = weekDays[4];
      break;
    case 3:
      date = weekDays[3];
      tomorrow = weekDays[4];
      afterTomorrow = weekDays[5];
      break;
    case 4:
      date = weekDays[4];
      tomorrow = weekDays[5];
      afterTomorrow = weekDays[6];
      break;
    case 5:
      date = weekDays[5];
      tomorrow = weekDays[6];
      afterTomorrow = weekDays[0];
      break;
    case 6:
      date = weekDays[6];
      tomorrow = weekDays[0];
      afterTomorrow = weekDays[1];
      break;
  }
}
function currentMonth(){
  switch(now.getMonth()) {
    case 0:
      month = 'January';
      break;
    case 1:
      month = 'February';
      break;
    case 2:
      month = 'March';
      break;
    case 3:
      month = 'April';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'June';
      break;
    case 6:
      month = 'July';
    case 7:
      month = 'August';
      break;
    case 8:
      month = 'September';
      break;
    case 9:
      month = 'October';
      break;
    case 10:
      month = 'November';
      break;
    case 11:
      month = 'December';
      break;
  }
}

function display() {
  todayDate.innerHTML = `<p>${date}</p>
              <p>${now.getDate()} ${month}</p>`;
  locationText.innerHTML = today.location;
  degreeText.innerHTML = `<span>${today.temp}°C</span>
                <img
                  class="w-25"
                  src= "https://${today.icon}"
                  alt=""
                />`;
  conditionText.innerHTML = today.condition;
  windText.innerHTML = `<span><i class="fa-solid fa-umbrella"></i> ${today.rain}%</span>
                <span><i class="fa-solid fa-wind"></i> ${today.windSpeed}KM/h</span>
                <span><i class="fa-regular fa-compass"></i> ${today.windDirection}</span>`;
  tomorrowDate.innerHTML = tomorrow;
  tomorrowDegreeText.innerHTML = `<img
                  class="w-25"
                  src="https:${tomorrowWeather.icon}"
                  alt=""
                />
                <span class="text-white fs-2 fw-bold">${tomorrowWeather.maxTemp}</span>
                <span class="fw-bold">${tomorrowWeather.minTemp}</span>`;
  tomorrowConditionText.innerHTML = tomorrowWeather.condition;
  afterTomorrowDate.innerHTML = afterTomorrow;
  afterTomorrowDegreeText.innerHTML = `<img
                  class="w-25"
                  src="https:${afterTomorrowWeather.icon}"
                  alt=""
                />
                <span class="text-white fs-2 fw-bold">${afterTomorrowWeather.maxTemp}</span>
                <span class="fw-bold">${afterTomorrowWeather.minTemp}</span>`;
  afterTomorrowConditionText.innerHTML = afterTomorrowWeather.condition;
  
}



async function searchCity(term) {
  const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=${key}&q=${term}`);
  const myResp = await response.json();  
  currentCity = myResp[0].name;
  await getWeather(currentCity);
}
let typingTimer;

function handleInput(term) {
  clearTimeout(typingTimer);
  if (!term.trim()) return;
  typingTimer = setTimeout(() => {
    searchCity(term);
  }, 500);
}

(async () => {
  await getUserLocation(); 
  await getWeather(currentCity); 
})();


