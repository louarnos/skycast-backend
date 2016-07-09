'use strict';

const mongoose = require('mongoose');
const Day = require('./day.js');
const daySchema = Day.schema;

const querySchema = new mongoose.Schema({
  response: {
    currently: {
      apparentTemperature: {
        type: Number,
        required: true,
      },
      cloudCover: {
        type: Number,
        required: true,
      },
      dewPoint: {
        type: Number,
        required: true,
      },
      humidity: {
        type: Number,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
      nearestStormBearing: {
        type: Number,
        required: true,
      },
      nearestStormDistance: {
        type: Number,
        required: true,
      },
      ozone: {
        type: Number,
        required: true,
      },
      precipIntensity: {
        type: Number,
        required: true,
      },
      precipProbability: {
        type: Number,
        required: true,
      },
      pressure: {
        type: Number,
        required: true,
      },
      summary: {
        type: String,
        required: true,
      },
      temperature: {
        type: Number,
        required: true,
      },
      time: {
        type: Date,
        required: true,
      },
      visibility: {
        type: Number,
        required: true,
      },
      windBearing: {
        type: Number,
        required: true,
      },
      windSpeed: {
        type: Number,
        required: true,
      }
    },
    daily: {
      summary: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
      data: [daySchema],
    },
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
