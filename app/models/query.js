'use strict';

const mongoose = require('mongoose');
const Day = require('./day.js');
const daySchema = Day.schema;

const hourSchema = new mongoose.Schema({
  apparentTemperature: {
    type: Number,
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
  ozone: {
    type: Number,
  },
  precipIntensity: {
    type: Number,
  },
  precipProbability: {
    type: Number,
  },
  pressure: {
    type: Number,
  },
  summary: {
    type: String,
  },
  temperature: {
    type: Number,
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

const minuteSchema = new mongoose.Schema({
  precipIntensity: {
    type: Number,
  },
  precipProbability: {
    type: Number,
  },
  time: {
    type: Date,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
});


const querySchema = new mongoose.Schema({
  response: {
    currently: {
      apparentTemperature: {
        type: Number,
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
      nearestStormBearing: {
        type: Number,
      },
      nearestStormDistance: {
        type: Number,
      },
      ozone: {
        type: Number,
      },
      precipIntensity: {
        type: Number,
      },
      precipProbability: {
        type: Number,
      },
      pressure: {
        type: Number,
      },
      summary: {
        type: String,
      },
      temperature: {
        type: Number,
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
      }
    },
    daily: {
      summary: {
        type: String,
      },
      icon: {
        type: String,
      },
      data: [daySchema],
    },
    flags: {
      'darksky-stations': [String],
      'isd-stations': [String],
      'lamp-stations': [String],
      'madis-stations': [String],
      'sources': [String],
      units: {
        type: String,
      },
    },
    hourly: {
      summary: {
        type: String,
      },
      icon: {
        type: String,
      },
      data: [hourSchema],
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
    minutely: {
      data: [minuteSchema],
      icon: {
        type: String,
      },
      summary: {
        type: String,
      },
    },
    offset: {
      type: Number,
    },
    timezone: {
      type: String,
    },
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',

  },
}, {
  timestamps: true,
});

const Query = mongoose.model('Query', querySchema);

module.exports = Query;
