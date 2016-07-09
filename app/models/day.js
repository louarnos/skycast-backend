'use strict';

const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  apparentTemperatureMax: {
    type: Number,  
  },
  apparentTemperatureMaxTime: {
    type: Date,
  },
  apparentTemperatureMin: {
    type: Number,
  },
  apparentTemperatureMinTime: {
    type: Date,
  },
  cloudCover: {
    type: Number,
  },
  dewPoint: {
    type: Number,
  },
  humidity: {
    type: Number,
  },
  icon: {
    type: String,
  },
  moonPhase: {
    type: Number,
  },
  ozone: {
    type: Number,
  },
  precipIntensity: {
    type: Number,
  },
  precipIntensityMax: {
    type: Number,
  },
  precipIntensityMaxTime: {
    type: Date,
  },
  precipProbability: {
    type: Number,
  },
  precipType: {
    type: String,
  },
  pressure: {
    type: Number,
  },
  summary: {
    type: String,
  },
  sunriseTime: {
    type: Date,
  },
  sunsetTime: {
    type: Date,
  },
  temperatureMax: {
    type: Number,
  },
  temperatureMaxTime: {
    type: Date,
  },
  temperatureMin: {
    type: Number,
  },
  temperatureMinTime: {
    type: Date,
  },
  time: {
    type: Date,
  },
  visibility: {
    type: Number,
  },
  windBearing: {
    type: Number,
  },
  windSpeed: {
    type: Number,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});


const Day = mongoose.model('Day', daySchema);

module.exports = Day;
