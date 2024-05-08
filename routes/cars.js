const route = require('express').Router();
const controller = require('../controllers/cars')

route.get('/get-all-cars', controller.getAll); //Retreives all cars
route.post('/add-cars', controller.postCars); //Create new car

module.exports = route;