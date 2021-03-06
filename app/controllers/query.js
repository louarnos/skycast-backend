'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const Query = models.query;
const authenticate = require('./concerns/authenticate');



const index = (req, res, next) => {
  let search = { _owner: req.currentUser._id };
  console.log(req.currentUser);
  Query.find(search)
    .then(querys => res.json({ querys }))
    .catch(err => console.log(err));
};

const show = (req, res, next) => {
  Query.findById(req.params.id)
    .then(query => query ? res.json({ query }) : next())
    .catch(err => next(err));
};

const create = (req, res, next) => {
  console.log('create fired');
  let query = Object.assign(req.body, {
    _owner: req.currentUser._id,
  });
  console.log(query);
  Query.create(query)
    .then(query => res.json({ query }))
    .catch(err => console.log(err.stack));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Query.findOne(search)
    .then(query => {
      if (!query) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      return query.update(req.body.query)
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  Query.findOne(search)
    .then(query => {
      if (!query) {
        return next();
      }

      return query.remove()
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy,
}, { before: [
  { method: authenticate, except: ['show',] },
], });
