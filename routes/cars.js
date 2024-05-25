const route = require('express').Router();
const controller = require('../controllers/cars');

route.get('/get-all', controller.getAll); //Gets all cars
route.post('/create', controller.create); //Create new car
route.put('/update', controller.update); //Update car

module.exports = route;