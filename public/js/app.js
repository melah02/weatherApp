var fetchWeather = '/weather';

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date');

const monthNames = ['january','febuary','march','april','may','june','july','August','september','november','decemeber'];

dateElement.textContent = new Date().getDate() + ', ' + monthNames[new Date().getMonth()].substring(0,3);

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    locationElement.textContent = 'LOADING...';
    tempElement.textContent='';
    weatherCondition.textContent='';
    const locationApi = fetchWeather + '?address=' + search.value;
    fetch(locationApi).then(response => {
       response.json().then(data =>{
        if(data.error){
            locationElement.textContent = data.error;
            tempElement.textContent='';
            weatherCondition.textContent='';
        }else{
            if(data.description === 'fog' || data.description === 'rain' || data.description === 'smoke'){
                weatherIcon.className = 'wi wi-day-' + data.description;
            }else{
                weatherIcon.className = 'wi wi-day-cloudy';
            }
            locationElement.textContent = data.cityName;
            tempElement.textContent=(data.temperature - 273.5).toFixed(2) + '\u00B0';
            weatherCondition.textContent=data.description.toUpperCase();
        }
       }) 
    }) 
})