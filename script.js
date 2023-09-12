let myLocation = 'seoul';
let degree = 'celcius'
const submitbtn = document.querySelector('.submit');
const searchbar = document.querySelector('#location');
const currentContainer = document.querySelector('.currentData');
const forecastDayContainer = document.querySelector('.forecastDay')
const hourContainer = document.querySelector('.forecastHour')
const header = document.querySelector('.title')
const celcius = document.querySelector('.celcius')
const farenheit = document.querySelector('.farenheit')


document.addEventListener('DOMContentLoaded', () => {
    header.textContent = `${capitalize(myLocation)}'s Weather`;
    getCurrentDataC();
    forecastDayC();
    forecastHourC();
});

submitbtn.addEventListener('click', async () => {
    try {
        myLocation = searchbar.value;
        header.textContent = capitalize(myLocation);
        currentContainer.innerHTML = '';
        forecastDayContainer.innerHTML = '';
        hourContainer.innerHTML = '';

        if (degree === 'celcius') {
            await getCurrentDataC();
            await forecastDayC();
            await forecastHourC();
        } else {
            await getCurrentDataF();
            await forecastDayF();
            await forecastHourF();
        }
    } catch (error) {
        alert('Invalid Location');
        console.log('Location Error:', error);
    }

    searchbar.value = '';
});

celcius.addEventListener('click', () => {
    degree = 'celcius'
    currentContainer.innerHTML='';
    forecastDayContainer.innerHTML='';
    hourContainer.innerHTML='';
    getCurrentDataC();
    forecastDayC();
    forecastHourC();
});

farenheit.addEventListener('click', () => {
    degree = 'farenheit'
    currentContainer.innerHTML='';
    forecastDayContainer.innerHTML='';
    hourContainer.innerHTML='';
    getCurrentDataF();
    forecastDayF();
    forecastHourF();
});


async function getWeatherData() {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=da3579a2d883421889850848230409&q=${myLocation}&days=3&aqi=no&alerts=no`, { mode: 'cors' });
        const weatherData = await response.json();
        return weatherData;
    } catch (err) {
        alert('unable to access data');
    }
}

async function getCurrentDataC() {
    try {
        const weatherData = await getWeatherData();
        const currentUpdateTime = weatherData.current.last_updated;
        const currentConditionText = weatherData.current.condition.text;
        const currentConditionIconURL = weatherData.current.condition.icon;
        const currentTempC = weatherData.current.temp_c;
        const currentFeelsLikeC = weatherData.current.feelslike_c;
        const currentHumidityValue = weatherData.current.humidity;
        const currentUVValue = weatherData.current.uv;

        const currentDateElement = document.createElement('div');
        currentDateElement.classList.add('currentDate');
        currentDateElement.textContent = `${currentUpdateTime}`;
        currentContainer.appendChild(currentDateElement);

        const currentConditionElement = document.createElement('div');
        currentConditionElement.classList.add('currentCondition'); // Corrected class name
        currentConditionElement.textContent = `${currentConditionText}`;
        currentContainer.appendChild(currentConditionElement);

        const currentConditionIconElement = document.createElement('img');
        currentConditionIconElement.classList.add('currentConditionIcon');
        currentConditionIconElement.src = `https:${currentConditionIconURL}`;
        currentContainer.appendChild(currentConditionIconElement);

        const currentTempElement = document.createElement('div');
        currentTempElement.classList.add('currentTemp');
        currentTempElement.textContent = `Current Temp: ${currentTempC}°C`;
        currentContainer.appendChild(currentTempElement);

        const feelsLikeElement = document.createElement('div');
        feelsLikeElement.classList.add('feelsLike');
        feelsLikeElement.textContent = `Feels Like: ${currentFeelsLikeC}°C`;
        currentContainer.appendChild(feelsLikeElement);

        const currentHumidityElement = document.createElement('div');
        currentHumidityElement.classList.add('currentHumidity');
        currentHumidityElement.textContent = `Humidity: ${currentHumidityValue}`;
        currentContainer.appendChild(currentHumidityElement);

        const currentUVElement = document.createElement('div');
        currentUVElement.classList.add('currentUV');
        currentUVElement.textContent = `UV Index: ${currentUVValue}`;
        currentContainer.appendChild(currentUVElement);

    } catch (err) {
        alert('Invalid Location');
        console.log('Current C Error')
    }
}

async function getCurrentDataF() {
    try {
        const weatherData = await getWeatherData();
        const currentUpdateTime = weatherData.current.last_updated;
        const currentConditionText = weatherData.current.condition.text;
        const currentConditionIconURL = weatherData.current.condition.icon;
        const currentTempF = weatherData.current.temp_f;
        const currentFeelsLikeF = weatherData.current.feelslike_f;
        const currentHumidityValue = weatherData.current.humidity;
        const currentUVValue = weatherData.current.uv;

        const currentDateElement = document.createElement('div');
        currentDateElement.classList.add('currentDate');
        currentDateElement.textContent = `${currentUpdateTime}`;
        currentContainer.appendChild(currentDateElement);

        const currentConditionElement = document.createElement('div');
        currentConditionElement.classList.add('currentCondition'); // Corrected class name
        currentConditionElement.textContent = `${currentConditionText}`;
        currentContainer.appendChild(currentConditionElement);

        const currentConditionIconElement = document.createElement('img');
        currentConditionIconElement.classList.add('currentConditionIcon');
        currentConditionIconElement.src = `https:${currentConditionIconURL}`;
        currentContainer.appendChild(currentConditionIconElement);

        const currentTempElement = document.createElement('div');
        currentTempElement.classList.add('currentTemp');
        currentTempElement.textContent = `Current Temp: ${currentTempF}°F`;
        currentContainer.appendChild(currentTempElement);

        const feelsLikeElement = document.createElement('div');
        feelsLikeElement.classList.add('feelsLike');
        feelsLikeElement.textContent = `Feels Like: ${currentFeelsLikeF}°F`;
        currentContainer.appendChild(feelsLikeElement);

        const currentHumidityElement = document.createElement('div');
        currentHumidityElement.classList.add('currentHumidity');
        currentHumidityElement.textContent = `Humidity: ${currentHumidityValue}`;
        currentContainer.appendChild(currentHumidityElement);

        const currentUVElement = document.createElement('div');
        currentUVElement.classList.add('currentUV');
        currentUVElement.textContent = `UV Index: ${currentUVValue}`;
        currentContainer.appendChild(currentUVElement);

    } catch (err) {
        alert('Invalid Location');
        console.log('Current F Error')
    }
}


async function forecastDayC() {
    try{ 
        const weatherData = await getWeatherData();
        const forecastDays = weatherData.forecast.forecastday;

        forecastDays.forEach((forecastDay, dayIndex) => {
            const date = forecastDay.date;
            const conditionText = forecastDay.day.condition.text;
            const conditionIcon = forecastDay.day.condition.icon;
            const maxTempC = forecastDay.day.maxtemp_c;
            const minTempC = forecastDay.day.mintemp_c;
            const avgTempC = forecastDay.day.avgtemp_c;
            const dayUV = forecastDay.day.uv;      
            const avgHumidity = forecastDay.day.avghumidity;
            const dayRain = forecastDay.day.daily_chance_of_rain;
            const daySnow = forecastDay.day.daily_chance_of_snow;

            // Create a day container with a unique class
            const dayContainer = document.createElement('div');
            dayContainer.classList.add(`day${dayIndex}`); // Unique class
            dayContainer.classList.add('daycontainer'); // Common class

            // Create and append elements for day information
            const dateElement = document.createElement('div');
            dateElement.classList.add('date');
            dateElement.textContent = `${date}`;
            dayContainer.appendChild(dateElement);

            const conditionIconElement = document.createElement('img');
            conditionIconElement.classList.add('condition-icon');
            conditionIconElement.src = `https:${conditionIcon}`;
            dayContainer.appendChild(conditionIconElement);

            const conditionElement = document.createElement('div');
            conditionElement.classList.add('condition');
            conditionElement.textContent = `Condition: ${conditionText}`;
            dayContainer.appendChild(conditionElement);

            const maxTempElement = document.createElement('div');
            maxTempElement.classList.add('max-temp');
            maxTempElement.textContent = `Max Temp: ${maxTempC}°C`;
            dayContainer.appendChild(maxTempElement);

            const minTempElement = document.createElement('div');
            minTempElement.classList.add('min-temp');
            minTempElement.textContent = `Min Temp: ${minTempC}°C`;
            dayContainer.appendChild(minTempElement);

            const avgTempElement = document.createElement('div');
            avgTempElement.classList.add('avg-temp');
            avgTempElement.textContent = `Average Temp: ${avgTempC}°C`;
            dayContainer.appendChild(avgTempElement);

            const uvElement = document.createElement('div');
            uvElement.classList.add('uv');
            uvElement.textContent = `UV Index: ${dayUV}`;
            dayContainer.appendChild(uvElement);

            const avgHumidityElement = document.createElement('div');
            avgHumidityElement.classList.add('avg-humidity');
            avgHumidityElement.textContent = `Average Humidity: ${avgHumidity}`;
            dayContainer.appendChild(avgHumidityElement);

            const dayRainElement = document.createElement('div');
            dayRainElement.classList.add('day-rain');
            dayRainElement.textContent = `Chance of Rain: ${dayRain}`;
            dayContainer.appendChild(dayRainElement);

            const daySnowElement = document.createElement('div');
            daySnowElement.classList.add('day-snow');
            daySnowElement.textContent = `Chance of Snow: ${daySnow}`;
            dayContainer.appendChild(daySnowElement);

            forecastDayContainer.appendChild(dayContainer);
        });
    } catch (err) {
        console.log('Forecast Day C Error')
    }
}

async function forecastHourC() {
    try{ 
        const weatherData = await getWeatherData();
        const forecastDays = weatherData.forecast.forecastday;

        forecastDays.forEach((forecastDay, dayIndex) => {
            const dayctn = document.createElement('div');

            dayctn.classList.add(`hourDay${dayIndex}`);
            dayctn.textContent = `${forecastDay.date}`;
            hourContainer.appendChild(dayctn);

            const dayhourctn = document.createElement('div');
            dayhourctn.classList.add('dayhourctn'); 
            dayctn.appendChild(dayhourctn);

            const hourData = forecastDay.hour;
        
            hourData.forEach((hour, hourIndex) => {
                const time = hour.time;
                const tempC = hour.temp_c;
                const condition = hour.condition.text;
                const conditionIcon = hour.condition.icon;

                // Create and append elements for hour information
                const hourSection = document.createElement('div');
                dayhourctn.appendChild(hourSection);

                const hourElement = document.createElement('div');
                hourElement.classList.add('hour');
                hourElement.textContent = `${time.split(" ")[1]}`;
                hourSection.appendChild(hourElement);

                const conditionElement = document.createElement('div');
                conditionElement.classList.add('hour-condition');
                conditionElement.textContent = `${condition}`;
                hourSection.appendChild(conditionElement);

                const conditionIconElement = document.createElement('img');
                conditionIconElement.classList.add('hour-condition-icon');
                conditionIconElement.src = `https:${conditionIcon}`;
                hourSection.appendChild(conditionIconElement);

                const tempElement = document.createElement('div');
                tempElement.classList.add('hour-temp');
                tempElement.textContent = `Temp: ${tempC}°C`;
                hourSection.appendChild(tempElement);

                hourSection.classList.add('hourctn');
            });
        });
    } catch (err) {
        console.log('Forecast Hour C Error')
    }
}

async function forecastDayF() {
    try{ 
        const weatherData = await getWeatherData();
        const forecastDays = weatherData.forecast.forecastday;

        forecastDays.forEach((forecastDay, dayIndex) => {
            const date = forecastDay.date;
            const conditionText = forecastDay.day.condition.text;
            const conditionIcon = forecastDay.day.condition.icon;
            const maxTempF = forecastDay.day.maxtemp_f;
            const minTempF = forecastDay.day.mintemp_f;
            const avgTempF = forecastDay.day.avgtemp_f;
            const dayUV = forecastDay.day.uv;      
            const avgHumidity = forecastDay.day.avghumidity;
            const dayRain = forecastDay.day.daily_chance_of_rain;
            const daySnow = forecastDay.day.daily_chance_of_snow;

            // Create a day container with a unique class
            const dayContainer = document.createElement('div');
            dayContainer.classList.add(`day${dayIndex}`); // Unique class
            dayContainer.classList.add('daycontainer'); // Common class

            // Create and append elements for day information
            const dateElement = document.createElement('div');
            dateElement.classList.add('date');
            dateElement.textContent = `${date}`;
            dayContainer.appendChild(dateElement);

            const conditionIconElement = document.createElement('img');
            conditionIconElement.classList.add('condition-icon');
            conditionIconElement.src = `https:${conditionIcon}`;
            dayContainer.appendChild(conditionIconElement);

            const conditionElement = document.createElement('div');
            conditionElement.classList.add('condition');
            conditionElement.textContent = `Condition: ${conditionText}`;
            dayContainer.appendChild(conditionElement);

            const maxTempElement = document.createElement('div');
            maxTempElement.classList.add('max-temp');
            maxTempElement.textContent = `Max Temp: ${maxTempF}°F`;
            dayContainer.appendChild(maxTempElement);

            const minTempElement = document.createElement('div');
            minTempElement.classList.add('min-temp');
            minTempElement.textContent = `Min Temp: ${minTempF}°F`;
            dayContainer.appendChild(minTempElement);

            const avgTempElement = document.createElement('div');
            avgTempElement.classList.add('avg-temp');
            avgTempElement.textContent = `Average Temp: ${avgTempF}°F`;
            dayContainer.appendChild(avgTempElement);

            const uvElement = document.createElement('div');
            uvElement.classList.add('uv');
            uvElement.textContent = `UV Index: ${dayUV}`;
            dayContainer.appendChild(uvElement);

            const avgHumidityElement = document.createElement('div');
            avgHumidityElement.classList.add('avg-humidity');
            avgHumidityElement.textContent = `Average Humidity: ${avgHumidity}`;
            dayContainer.appendChild(avgHumidityElement);

            const dayRainElement = document.createElement('div');
            dayRainElement.classList.add('day-rain');
            dayRainElement.textContent = `Chance of Rain: ${dayRain}`;
            dayContainer.appendChild(dayRainElement);

            const daySnowElement = document.createElement('div');
            daySnowElement.classList.add('day-snow');
            daySnowElement.textContent = `Chance of Snow: ${daySnow}`;
            dayContainer.appendChild(daySnowElement);

            forecastDayContainer.appendChild(dayContainer);
        });
    } catch (err) {
        console.log('Forecast Day F Error')
    }
}

async function forecastHourF() {
    try{ 
        const weatherData = await getWeatherData();
        const forecastDays = weatherData.forecast.forecastday;

        forecastDays.forEach((forecastDay, dayIndex) => {
            const dayctn = document.createElement('div');

            dayctn.classList.add(`hourDay${dayIndex}`);
            dayctn.textContent = `${forecastDay.date}`;
            hourContainer.appendChild(dayctn);

            const dayhourctn = document.createElement('div');
            dayhourctn.classList.add('dayhourctn'); 
            dayctn.appendChild(dayhourctn);

            const hourData = forecastDay.hour;
        
            hourData.forEach((hour, hourIndex) => {
                const time = hour.time;
                const tempF = hour.temp_f;
                const condition = hour.condition.text;
                const conditionIcon = hour.condition.icon;

                // Create and append elements for hour information
                const hourSection = document.createElement('div');
                dayhourctn.appendChild(hourSection);

                const hourElement = document.createElement('div');
                hourElement.classList.add('hour');
                hourElement.textContent = `${time.split(" ")[1]}`;
                hourSection.appendChild(hourElement);

                const conditionElement = document.createElement('div');
                conditionElement.classList.add('hour-condition');
                conditionElement.textContent = `${condition}`;
                hourSection.appendChild(conditionElement);

                const conditionIconElement = document.createElement('img');
                conditionIconElement.classList.add('hour-condition-icon');
                conditionIconElement.src = `https:${conditionIcon}`;
                hourSection.appendChild(conditionIconElement);

                const tempElement = document.createElement('div');
                tempElement.classList.add('hour-temp');
                tempElement.textContent = `Temp: ${tempF}°F`;
                hourSection.appendChild(tempElement);

                hourSection.classList.add('hourctn');
            });
        });
    } catch (err) {
        console.log('Forecast Hour F Error');
    }
}

function capitalize(location) {
    if (!location) {
        return location;
    }
    return location.charAt(0).toUpperCase() + location.slice(1);
}








