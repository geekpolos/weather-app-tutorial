const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6ca13ff0140ec41ef08826c663dd21f2&query=' + lat + ',' + long + '&units=f';    

    request({ url, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to service.', undefined)            
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {            
            callback(undefined, "It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out. The wind speed is " + body.current.wind_speed + "mph. The observation time from WeatherStack is " + body.current.observation_time + ".");
        }
    });
}

module.exports = forecast