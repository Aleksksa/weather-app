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
}

const searchData = (city) => {
    //getting API key
    const apiKey = 'da02e7bd1e86c2fd40c97607f3f77f84';
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`).then(displayWeather);
}

searchData('Sydney');

//working with search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = document.querySelector('.form-input');
    searchData(searchInput.value);
    fahrenheit.classList.remove('active');
    celsius.classList.add('active');
});

//unit conversion

const toFahrenheit = (value) => {
    let res = Math.round((value*9)/5 +32);
    return res;
}

const convertToFahr = () => {
    let fahrenheitValue = toFahrenheit(celsiusTemp);
    weatherTemp.innerHTML = `${fahrenheitValue}°`;
    maxTemp.innerHTML = `${toFahrenheit(maxCelsTemp)}`;
    minTemp.innerHTML = `${toFahrenheit(minCelsTemp)}`;
    feelsLike.innerHTML = `${toFahrenheit(feelsLikeTemp)}`
    fahrenheit.classList.add('active');
    celsius.classList.remove('active');
}

const convertToCelsius = () => {
    weatherTemp.innerHTML = `${celsiusTemp}°`;
    maxTemp.innerHTML = `${maxCelsTemp}`;
    minTemp.innerHTML = `${minCelsTemp}`;
    feelsLike.innerHTML = `${feelsLikeTemp}`;
    fahrenheit.classList.remove('active');
    celsius.classList.add('active');
}


fahrenheit.addEventListener('click', convertToFahr);
celsius.addEventListener('click', convertToCelsius);