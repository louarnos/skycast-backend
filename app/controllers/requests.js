'use strict';

const controller = require('lib/wiring/controller');
const googleKey = process.env.GOOGLE_GEO_KEY;
const weatherKey = process.env.WEATHER_KEY;
const request = require('request');
const authenticate = require('./concerns/authenticate');

// ACTION FOR REQUEST WITH KNOWN COORDS
const localCurrentForecast = (req, res, next) => {
  let coords = req.body.coords;
  let urlWeather = `https://api.forecast.io/forecast/${weatherKey}/${coords.latitude},${coords.longitude}`;
  request(urlWeather, function(error, response, body){
    if(error){
    next(error);
    }
    let stuff = JSON.parse(response.body);
    console.log(stuff.currently);
    res.json(JSON.parse(response.body));
  });
};

//ACTION FOR REQUEST WITH UNKNOWN COORDS
const nonLocalCurrentForecast = (req, res, next) => {
  let googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.input}&key=${googleKey}`;
  request(googleUrl, function(error, response, body){
    if(error){
      next(error);
    }
    let data = JSON.parse(response.body);

    //IF MORE THAN ONE RESULT FROM GEOLOCATION QUERY
    //SEND LIST OF LOCATIONS BACK SO USER CAN CHOOSE
    if(data.results.length > 1){
      res.json(JSON.parse(response.body));

    //IF ONLY ONE RESULT, GET FORECAST
    }else if(data.results.length === 1) {
      let coords = data.results[0].geometry.location;
      let urlWeather = `https://api.forecast.io/forecast/${weatherKey}/${coords.lat},${coords.lng}`;
      request(urlWeather, function(error, response, body){
        if(error){
          next(error);
        }
        res.json(JSON.parse(response.body));
      });
    }
  });
};

const historicalForecast = (req, res, next) => {
  let googleUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.input}&key=${googleKey}`;
  request(googleUrl, function(error, response, body){
    if(error){
      next(error);
    }
    let data = JSON.parse(response.body);
    //IF MORE THAN ONE RESULT FROM GEOLOCATION QUERY
    //ADD DATES REQUESTED INTO RESPONSE AND
    //SEND LIST OF LOCATIONS BACK SO USER CAN CHOOSE
    if(data.results.length > 1){
      let results = {};
      results.startDate = req.body.startDate;
      results.endDate = req.body.endDate;
      results.locations = JSON.parse(response.body);
      res.json(results);

    //IF ONE RESULT, GET DATA IN BATCHES
    }else if(data.results.length === 1) {
      let coords = data.results[0].geometry.location;
      const OneDay = 86400;
      let timeFrame = Math.abs(req.body.startDate - req.body.endDate);
      let numberOfDays = timeFrame/OneDay;


      const makeMultipleQueries = (url) => {
        return new Promise(function(resolve, reject) {
          request(url, function(error, response, body){
            if(error){
              reject(error);
            }
            resolve(response.body);
          });
        });
      };

      let promises = [];
      for (let i = 0; i < numberOfDays; i++) {
        let currentDay = Number(req.body.startDate) + (i*OneDay);
        let url = `https://api.forecast.io/forecast/${weatherKey}/${coords.lat},${coords.lng},${currentDay}`;
        promises.push(makeMultipleQueries(url));
      }
      Promise.all(promises).then(function(results) {
          res.json({results});
      }, function(err) {
          next(err);
      });
    }
  });
};


module.exports = controller({
  localCurrentForecast,
  nonLocalCurrentForecast,
  historicalForecast,
}, { before: [
  { method: authenticate},
], });
