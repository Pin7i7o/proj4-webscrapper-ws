const controller = require('../controllers/scrap');
const route = require('express').Router();
const authMiddleware = require('../middlewares/auth');

route.use(authMiddleware);

route.get('/last-10-cars', controller.getLatestCars); //10 most recently posted cars route
route.get('/get-id/:carId', controller.getById); //Scrap History for specific car
route.post('/create', controller.create); //Adds new scrap history line
route.delete('/delete/:id', controller.delete); //Deletes scrap history by id

module.exports = route;