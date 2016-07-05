'use strict';

const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  response: {
    type: String,
    required: true,
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
