const request = require('request')

const Geocode = (address,callback) =>{
    const GeocodeURL ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?limit=2&access_token=pk.eyJ1IjoicHJhc2FkY2hhdWRoYXJpIiwiYSI6ImNra2UwOTQ1bDBmMWUycXBnNGZjbHVvcGYifQ.uMdwLqJGi2WCFxNie6SRoA'
    request({url : GeocodeURL,json : true},(err,{body})=>{
        if(err){
            callback('Unable to connect to location service',undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to get co-ordinates.Check your URL',undefined)
        }
        else{
        
            callback(undefined,{
                Latitude :body.features[0].center[1],
                Longitude :body.features[0].center[0],
                location :body.features[0].place_name
            })
        } 
    })
}

module.exports= Geocode;