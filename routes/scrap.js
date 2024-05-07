const controller = require('../controllers/scrap');
const latestCarsRoute = require('express').Router();

latestCarsRoute.get('/last-10-cars', controller.getLatestCars); //10 most recently posted cars route

module.exports = latestCarsRoute;