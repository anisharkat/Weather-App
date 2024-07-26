const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const Err404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide')



search.addEventListener('click',()=>{
    const apiKey = 'c2936374135a2dc33e38e298e3a47717';
    const cityName = document.querySelector('.search-box input').value;

    if (cityName == ''){
        return;
    }

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`)
    .then(function (response) {


    const image = document.querySelector('.weather-box img');
    const tompurature = document.querySelector('.weather-box .tompurature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    if (cityHide.textContent == cityName){
        return;
    } else {
        cityHide.textContent = cityName;
        container.style.height = '555px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        Err404.classList.remove('active');

        setTimeout(() => {
            container.classList.remove('active');
        }, 2500);
        switch (response.data.weather[0].main) {
            case 'Clear':
                image.src = '/assets/images/clear.png';
                break;
            case 'Rain':
                image.src = '/assets/images/rain.png';
                break;
            case 'Clouds':
            image.src = '/assets/images/cloud.png';
            break;
            case 'Haze':
                image.src = '/assets/images/mist.png';
                break;
            case 'Snow':
            image.src = '/assets/images/snow.png';
            break;
        
            default:
                image.src = '';
        }
    
        tompurature.innerHTML = `${response.data.main.temp}<span>°C</span>`;
        description.innerHTML = `${response.data.weather[0].description}`
        humidity.innerHTML = `${response.data.main.humidity}%`
        wind.innerHTML = `${response.data.wind.speed}km/h`

        const infoWeather = document.querySelector('.info-weather');
        const infoHumidity = document.querySelector('.info-humidity');
        const infoWind = document.querySelector('.info-wind');

        const elCloneinfoWeather = infoWeather.cloneNode(true);
        const elCloneinfoHumidity = infoHumidity.cloneNode(true);
        const elCloneinfoWind = infoWind.cloneNode(true);

        elCloneinfoWeather.id = 'clone-info-weather';
        elCloneinfoWeather.classList.add('active-clone');


        elCloneinfoHumidity.id = 'clone-info-humidity';
        elCloneinfoHumidity.classList.add('active-clone');


        elCloneinfoWind.id = 'clone-info-wind';
        elCloneinfoWind.classList.add('active-clone');


        setTimeout(() => {
            infoWeather.insertAdjacentElement("afterend",elCloneinfoWeather);
            infoWind.insertAdjacentElement("afterend",elCloneinfoWind);
            infoHumidity.insertAdjacentElement("afterend",elCloneinfoHumidity);
        }, 2200);

        const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
        const totalcloneInfoWeather = cloneInfoWeather.length;
        const cloneInfoWeatherFirst = cloneInfoWeather[0];



        const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
        const totalcloneInfoHumidity = cloneInfoHumidity.length;
        const cloneInfoHumidityFirst = cloneInfoHumidity[0];




        const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
        const totalcloneInfoWind = cloneInfoWind.length;
        const cloneInfoWindFirst = cloneInfoWind[0];

        if (totalcloneInfoWeather > 0){
            cloneInfoWeatherFirst.classList.remove('active-clone');
            cloneInfoHumidityFirst.classList.remove('active-clone');
            cloneInfoWindFirst.classList.remove('active-clone');

            setTimeout(() => {
                cloneInfoWeatherFirst.remove();
                cloneInfoHumidityFirst.remove();
                cloneInfoWindFirst.remove();
            }, 500);
        }
    
    }

    })
    .catch(function (error) {
        if (error.response.data.cod == '404') {
            cityHide.textContent = cityName;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            Err404.classList.add('active');
            return;
        }
    })
})