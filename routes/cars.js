const carsRoute = require('express').Router();
const controller = require('../controllers/cars')


carsRoute.post('/add-cars', controller.createCars); //Create new car

module.exports = carsRoute;