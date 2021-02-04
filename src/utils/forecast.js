const request = require('request')

const forecast =(Latitude,Longitude,callback)=>{
    const WeatherStackURL ='http://api.weatherstack.com/current?access_key=197d93e3ae66812dc656d112464af97c&query='+Latitude+','+Longitude
    request({url:WeatherStackURL ,json : true},(err,{body})=>{
        if(err){
            callback('Unable to connect  to weather api',undefined)
        }
        else if(body.error){
            callback('Unable to find location.Check URL',undefined)
        }
        else{
            const temp = body.current.temperature
            const feelsLikeTemp =body.current.feelslike
            
            let weather='It is currently '+ temp+' degrees. It feels like '+ feelsLikeTemp+' degrees'
            callback(undefined,weather)
        }
    })
}

module.exports =forecast