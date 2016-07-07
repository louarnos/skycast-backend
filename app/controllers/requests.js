'use strict';

const controller = require('lib/wiring/controller');
const googleKey = process.env.GOOGLE_GEO_KEY;
const weatherKey = process.env.WEATHER_KEY;
const request = require('request');
const authenticate = require('./concerns/authenticate');


const localCurrentForecast = (req, res, next) => {
  let coords = req.body.coords;
  let urlWeather = `https://api.forecast.io/forecast/${weatherKey}/${coords.latitude},${coords.longitude}`;
  request(urlWeather, function(error, response, body){
    if(error){
    console.log(error);
    next();
    }
    res.json(JSON.parse(response.body));
  });
};


const nonLocalCurrentForecast = (req, res, next) => {
  let googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.input}&key=${googleKey}`;
  request(googleUrl, function(error, response, body){
    if(error){
      console.log(error);
      next();
    }
    let data = JSON.parse(response.body);
    if(data.results.length > 1){
      res.json(JSON.parse(response.body));
    }else if(data.results.length === 1) {
      console.log(data.results);
      let coords = data.results[0].geometry.location;
      let urlWeather = `https://api.forecast.io/forecast/${weatherKey}/${coords.lat},${coords.lng}`;
      request(urlWeather, function(error, response, body){
        if(error){
          console.log(error);
          next();
        }
        res.json(JSON.parse(response.body));
      });
    }
  });
};

const historicalForecast = (req, res, next) => {
};


module.exports = controller({
  localCurrentForecast,
  nonLocalCurrentForecast,
  historicalForecast,
}, { before: [
  { method: authenticate},
], });
