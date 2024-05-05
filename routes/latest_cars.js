const controller = require('../controllers/latest_cars');
const latestCarsRoute = require('express').Router();

latestCarsRoute.get('/last-10-cars', controller.getLatestCars);

module.exports = latestCarsRoute;