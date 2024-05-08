const route = require('express').Router();
const controller = require('../controllers/cars')


route.post('/add-cars', controller.postCars); //Create new car

module.exports = route;