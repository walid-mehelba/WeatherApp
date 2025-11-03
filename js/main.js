let key = '7af2e31a483746ebb5631421250311'
let dataSet = document.getElementById('apiData');

let url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=alexandria&days=3&aqi=no&alerts=no`

async function getWeather() {
    let response = await fetch(url);
    let myResp = await response.json();
    let location = myResp.location.name;
    let currentTemp = myResp.current.temp_c;
    let conditionText = myResp.current.condition.text;
    let conditionIcon = myResp.current.condition.icon;
    let windSpeed = myResp.current.wind_kph;
    let windDirection = myResp.current.wind_dir;
    let rain = myResp.forecast.forecastday[0].day.daily_will_it_snow;
    const now = new Date()
    console.log(now.getDate(), now.getDay(),now.getMonth())
    console.log(location, currentTemp, conditionText,conditionIcon,windSpeed,windDirection,rain,typeof(myResp))
}

async function getUserLocation() {
    let response = await fetch('https://ipapi.co/json/');
    let myResp = await response.json();
    let currentCity = response.data.city;
    console.log(currentCity);
    
}

getWeather();
// getUserLocation();

navigator.geolocation.getCurrentPosition(
  async (position) => {
    const { latitude, longitude } = position.coords;
    console.log("Your coordinates:", latitude, longitude);

    // Reverse geocode to get city
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await response.json();
    const city = data.address.city || data.address.town || data.address.village;
    console.log("Your city is:", city);
  },
  (error) => {
    console.error("Error getting location:", error);
  }
);

