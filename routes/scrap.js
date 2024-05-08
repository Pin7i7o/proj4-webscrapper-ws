const controller = require('../controllers/scrap');
const route = require('express').Router();

route.get('/last-10-cars', controller.getLatestCars); //10 most recently posted cars route
route.get('/get-id/:carid', controller.getById); //Scrap History for specific car
route.post('/create', controller.create); //Adds new scrap history line

module.exports = route;