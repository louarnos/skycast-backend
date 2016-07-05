'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const googleKey = process.env.GOOGLE_GEO_KEY;
const weatherKey = process.env.WEATHER_KEY;
const request = require('request');
const queryController = require('./query.js');
const authenticate = require('./concerns/authenticate');


const geolocation = (req, res, next) => {
  let urlGoogle = `https://www.googleapis.com/geolocation/v1/geolocate?key=${googleKey}`


  let requestData = {
     "homeMobileCountryCode": 310,
     "homeMobileNetworkCode": 260,
     "radioType": "gsm",
     "carrier": "T-Mobile",
     "cellTowers": [
      {
       "cellId": 39627456,
       "locationAreaCode": 40495,
       "mobileCountryCode": 310,
       "mobileNetworkCode": 260,
       "age": 0,
       "signalStrength": -95
      }
     ],
     "wifiAccessPoints": [
      {
       "macAddress": "01:23:45:67:89:AB",
       "signalStrength": 8,
       "age": 0,
       "signalToNoiseRatio": -65,
       "channel": 8
      },
      {
       "macAddress": "01:23:45:67:89:AC",
       "signalStrength": 4,
       "age": 0
      }
     ]
   };

  request.post(urlGoogle, requestData, function(error, response, body){
    if(error){
      console.log(error);
    }
    console.log(response);
    let data = JSON.parse(response.body);
    let coords = {
      "lon":  data.location.lng,
      "lat": data.location.lat,
    };

    let urlWeather = `https://api.forecast.io/forecast/${weatherKey}/${coords.lat},${coords.lon}`;

    request(urlWeather, function(error, response, body){
      if(error){
        console.log(error);
      }
      res.json(JSON.parse(response.body));
    });
  });
}



module.exports = controller({
  geolocation,
}, { before: [
  { method: authenticate},
], });
