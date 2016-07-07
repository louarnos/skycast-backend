'use strict';

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })
.post('/local-current-forecast', 'requests#localCurrentForecast')
.post('/non-local-current-forecast', 'requests#nonLocalCurrentForecast')
.post('/historical-forecast', 'requests#historicalForecast')
.post('/query', 'query#create');

// all routes created
