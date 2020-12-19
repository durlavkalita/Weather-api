const api = {
  key: 'f4b36deaaf4f9ca30155e7122fa856ad',
  base_url: 'http://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
  if(e.keyCode == 13){
    getResult(searchBox.value);
    console.log(searchBox.value);
    searchBox.value = '';
  }
}

function getResult(query) {
  fetch (`${api.base_url}weather?q=${query}&units=metric&appid=${api.key}`)
  .then(weather => {
    console.log(weather.status);
    return weather.json();
  }).then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  if(weather.cod == '404') {alert('City Not Found!'); return;}
  const city = document.querySelector('.city');
  city.textContent = `${weather.name}, ${weather.sys.country}`;
  
  let date = document.querySelector('.location .date');
  date.textContent = dateBuilder();
  
  const temp = document.querySelector('.temp');
  temp.innerHTML =`${Math.round(weather.main.temp)}<span>°C</span>`;

  const weather_el = document.querySelector('.current .weather');
  weather_el.textContent = weather.weather[0].main;

  const hilow = document.querySelector('.hi-low');
  hilow.innerHTML = `${Math.round(weather.main.temp_min)}°C/${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder() {
  let d = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}