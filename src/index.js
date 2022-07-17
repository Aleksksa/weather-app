//getting elements
const dateHeading = document.querySelector('#current-date');

const searchForm = document.querySelector('#search-forecast');
const searchedCity = document.querySelector('#searched-city');

const weatherTemp = document.querySelector('#current-display-temp');
const weatherDesc = document.querySelector('#current-display-desc');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const feelsLike = document.querySelector('#feels-like');
const visibility = document.querySelector('#visibility');
const minTemp = document.querySelector('#temp-low');
const maxTemp = document.querySelector('#temp-high');

let mainIcon = document.querySelector('#main-icon');

const celsius = document.querySelector('#celsius');
const fahrenheit = document.querySelector('#fahrenheit');

//API key
const apiKey = 'da02e7bd1e86c2fd40c97607f3f77f84';

//creating global variables that will store the celsius Temp
let celsiusTemp = null;
let maxCelsTemp = null;
let minCelsTemp = null;
let feelsLikeTemp = null;

//setting current date
const setDate = () => {
    let date = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    dateHeading.innerHTML = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;
}

setDate();

//function for converting date value from the api to normal state
const formatDate = (timestamp) => {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();//we are getting value from 0 to 6
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[day];
};

//function for displaying weather for week
const displayWeekWeather = (response) => {
    let dailyForecast = response.data.daily;
    const forecast = document.querySelector('#week-forecast');
    let forecastHTML = "";
    for(let i = 1; i < 7; i++){
         forecastHTML += `
        <div class="col-2">
             <div class="weather-card">
                 <div class="card-date" id="card-date">${formatDate(dailyForecast[i].dt)}</div>
                 <div class="card-image">
                    <img src="img/icons/${dailyForecast[i].weather[0].icon}.png" alt="Sun, clouds and rain" width="50px" height="50px" />
                 </div>
                 <div class="card-temp">
                     <span id="card-temp-high">${Math.round(dailyForecast[i].temp.max)}</span>°/ <span id="card-temp-low">${Math.round(dailyForecast[i].temp.min)}</span>°
                 </div>
             </div>
         </div>
        `
    }

    forecast.innerHTML = forecastHTML;
}


const showWeekWeather = (coords) => { 
    console.log(coords);
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`).then(displayWeekWeather);
}

//weather API integration
const displayWeather = (response) => {
    celsiusTemp = Math.round(response.data.main.temp);
    searchedCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    weatherTemp.innerHTML = `${celsiusTemp}°`
    weatherDesc.innerHTML = `${response.data.weather[0].main}`;

    maxCelsTemp = Math.round(response.data.main.temp_max);
    minCelsTemp = Math.round(response.data.main.temp_min)
    maxTemp.innerHTML = `${maxCelsTemp}`;
    minTemp.innerHTML = `${minCelsTemp}`;

    //changing icon
    let apiIcon = response.data.weather[0].icon;
    mainIcon.setAttribute('src', `img/icons/${apiIcon}.png`);

    //more info block
    feelsLikeTemp = Math.round(response.data.main.feels_like);
    feelsLike.innerHTML = `${feelsLikeTemp}`;
    humidity.innerHTML = `${response.data.main.humidity}`;
    wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
    visibility.innerHTML = `${response.data.visibility / 1000}`;

    showWeekWeather(response.data.coord);
}

const searchData = (city) => {
    //getting API key
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`).then(displayWeather);
}

searchData('Chicago');

//unit conversion
const toFahrenheit = (value) => {
    let res = Math.round((value*9)/5 +32);
    return res;
}

const toCelsius = (value) => {
    let res = Math.round((value - 32)*5/9);
    return res;
}

const convertToFahr = () => {
    let fahrenheitValue = toFahrenheit(celsiusTemp);
    weatherTemp.innerHTML = `${fahrenheitValue}°`;
    maxTemp.innerHTML = `${toFahrenheit(maxCelsTemp)}`;
    minTemp.innerHTML = `${toFahrenheit(minCelsTemp)}`;
    feelsLike.innerHTML = `${toFahrenheit(feelsLikeTemp)}`


    //calculations for weekly forecast values
    let weeklyMin = document.querySelectorAll('#card-temp-low');
    weeklyMin.forEach((item) => {
        //grabbing a value to convert
        let minValue = item.innerHTML;
        item.innerHTML = `${toFahrenheit(minValue)}`;
    })

    let weeklyMax = document.querySelectorAll('#card-temp-high');
    weeklyMax.forEach((item) => {
        //grabbing a value to convert
        let minValue = item.innerHTML;
        item.innerHTML = `${toFahrenheit(minValue)}`;
    })

    //removing and adding classes for buttons
    fahrenheit.classList.add('active');
    celsius.classList.remove('active');

    //removing eventListener for fahrenehit to prevent multiple calculations and adding for celsius
    celsius.addEventListener('click', convertToCelsius);
    fahrenheit.removeEventListener('click', convertToFahr);
}

const convertToCelsius = () => {
    weatherTemp.innerHTML = `${celsiusTemp}°`;
    maxTemp.innerHTML = `${maxCelsTemp}`;
    minTemp.innerHTML = `${minCelsTemp}`;
    feelsLike.innerHTML = `${feelsLikeTemp}`;

    //calculations for weekly forecast values
    let weeklyMin = document.querySelectorAll('#card-temp-low');
    weeklyMin.forEach((item) => {
        //grabbing a value to convert
        let minValue = item.innerHTML;
        item.innerHTML = `${toCelsius(minValue)}`;
    })

    let weeklyMax = document.querySelectorAll('#card-temp-high');
    weeklyMax.forEach((item) => {
        //grabbing a value to convert
        let minValue = item.innerHTML;
        item.innerHTML = `${toCelsius(minValue)}`;
    })

    //removing and adding classes for buttons
    fahrenheit.classList.remove('active');
    celsius.classList.add('active');

    //removing eventListener for celsius to prevent multiple calculations and adding for fahrenheit
    fahrenheit.addEventListener('click', convertToFahr);
    celsius.removeEventListener('click', convertToCelsius);
}

//adding listeners for units' buttons
fahrenheit.addEventListener('click', convertToFahr);
celsius.addEventListener('click', convertToCelsius);

//working with search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = document.querySelector('.form-input');
    searchData(searchInput.value);
    fahrenheit.classList.remove('active');
    celsius.classList.add('active');
    fahrenheit.addEventListener('click', convertToFahr);
});