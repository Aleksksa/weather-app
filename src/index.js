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

//creating a variable that will store the name of the city
let city;

//getting API key
const apiKey = 'da02e7bd1e86c2fd40c97607f3f77f84';

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
    let temp = Math.round(response.data.main.temp);
    searchedCity.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    weatherTemp.innerHTML = `${temp}°`
    weatherDesc.innerHTML = `${response.data.weather[0].main}`;
    maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}`;
    minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}`;

    //changing icon
    let apiIcon = response.data.weather[0].icon;
    mainIcon.setAttribute('src', `img/icons/${apiIcon}.png`);

    //more info block
    feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)}`;
    humidity.innerHTML = `${response.data.main.humidity}`;
    wind.innerHTML = `${Math.round(response.data.wind.speed)}`;
    visibility.innerHTML = `${response.data.visibility / 1000}`;
}

//working with search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = document.querySelector('.form-input');
    city = `${searchInput.value}`;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`).then(displayWeather);
})