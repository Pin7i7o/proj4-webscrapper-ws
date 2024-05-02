const latestCarsRoute = require('express').Router();
const latestCarsController = require('../controllers/latest_cars');

router.get('/last-10-cars', latestCarsController.getLatestCars);

module.exports = latestCarsRoute;