const request = require('request');
const constants = require('../config');

const weatherData = (address,callback) => {

    const url = constants.openWEatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWEatherMap.SECRET_KEY;
    request({url, json:true}, (error,{body})=>{
        if(error){
            callback("can't fetch data at the moment(open weather app)",undefined )
        } else if( !body.main || !body.main.temp || !body.weather || !body.name){
            callback('invalid City Name, Try Another City Name',undefined);
        }else{
            callback(undefined,{
               temperature: body.main.temp,
               description: body.weather[0].description,
               cityName: body.name
            })
        }

    })
}

module.exports = weatherData;