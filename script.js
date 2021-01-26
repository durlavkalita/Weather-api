const api = {
  key: 'f4b36deaaf4f9ca30155e7122fa856ad',
  base_url: 'http://api.openweathermap.org/data/2.5/'
}

const unsplash = 'https://source.unsplash.com/1600x900/?';
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(e) {
  if(e.keyCode == 13){
    getResult(searchBox.value);
    searchBox.value = '';
  }
}

async function getResult(query) {
  const res = await fetch (`${api.base_url}weather?q=${query}&units=metric&appid=${api.key}`, {mode: 'cors'});
  const weather = await res.json();
  displayResults(weather);
}

function changeBG(type) {
  switch(type){
    case 'Clouds':;
      document.body.style.background=`url('${unsplash}nature,clouds')`;
      break;
        
    case 'Clear':
      document.body.style.background=`url('${unsplash}nature,clear')`;
      break;

    case 'Rain':
      document.body.style.background=`url('${unsplash}nature,rain')`;
      break;
          
    case 'Snow':
      document.body.style.background=`url('${unsplash}nature,snow')`;
      break;
          
    case 'Drizzle':
      document.body.style.background=`url('${unsplash}nature,drizzle')`;
      break;
        
    case 'Thunderstorm':
      document.body.style.background=`url('${unsplash}nature,thunderstorm')`;
      break;
    
    case 'Mist':
      document.body.style.background=`url('${unsplash}nature,mist')`;
      break;

    case 'Haze':
      document.body.style.background=`url('${unsplash}nature,haze')`;
      break;

    case 'Fog':
      document.body.style.background=`url('${unsplash}nature,fog')`;
      break;
    
    default:
      document.body.style.background=`url("bg.jpg")`;
      break;
  }
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
  changeBG(weather.weather[0].main);

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