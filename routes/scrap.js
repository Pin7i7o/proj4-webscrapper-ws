const controller = require('../controllers/scrap');
const route = require('express').Router();

route.get('/last-10-cars', controller.getLatestCars); //10 most recently posted cars route
route.post('/add-history', controller.postScrapHistory); //Adds new scrap history line


module.exports = route;